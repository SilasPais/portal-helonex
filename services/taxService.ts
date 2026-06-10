
import { TaxDocument, TaxDocType } from '../types';
import { guardianEngine } from './guardianSystem';

const API_DELAY = 2000; 

export interface AuditResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  scope: 'MUNICIPAL' | 'INTERMUNICIPAL' | 'INTERESTADUAL' | 'INTERNACIONAL';
  taxSimulation: {
    currentSystem: string; 
    reformSystem: string;
    details: string;
  };
}

export const taxService = {
  
  // 1. MOTOR DE AUDITORIA FISCAL (BLINDAGEM TRIBUTÁRIA)
  auditDocument: (type: TaxDocType, data: any): AuditResult => {
    const errors: string[] = [];
    const warnings: string[] = [];
    let scope: AuditResult['scope'] = 'INTERESTADUAL'; // Default

    // --- A. DEFINIÇÃO DE ESCOPO GEOGRÁFICO (Competência Tributária) ---
    if (data.originUF && data.destUF) {
        if (data.originCountry !== 'BR' || data.destCountry !== 'BR') {
            scope = 'INTERNACIONAL';
        } else if (data.originUF !== data.destUF) {
            scope = 'INTERESTADUAL';
        } else if (data.originCity !== data.destCity) {
            scope = 'INTERMUNICIPAL';
        } else {
            scope = 'MUNICIPAL';
        }
    }
    
    if (data.isInternational) scope = 'INTERNACIONAL';

    // --- B. VALIDAÇÕES POR ESCOPO ---
    
    // MUNICIPAL (ISS)
    if (scope === 'MUNICIPAL') {
        if (type === 'CT-e' || type === 'MDF-e') {
            warnings.push(`ATENÇÃO: Transporte Municipal geralmente exige NFS-e (ISSQN), não ${type}. Verifique a legislação da prefeitura de origem.`);
        }
    }

    // INTERESTADUAL/INTERMUNICIPAL (ICMS)
    if (scope === 'INTERESTADUAL' || scope === 'INTERMUNICIPAL') {
        if (!data.recipientCnpj) errors.push('CRÍTICO: CNPJ do Tomador obrigatório para recolhimento de ICMS.');
    }

    // INTERNACIONAL (Isenção ICMS / Permissões)
    if (scope === 'INTERNACIONAL') {
        if (!data.micDta) warnings.push('ATENÇÃO: Operações internacionais exigem MIC/DTA além do CT-e.');
        warnings.push('LEMBRETE: ICMS geralmente isento na exportação de serviço (Art. 3º, II LC 87/96). Confirme com contador.');
    }

    // --- C. LEI DO VALE-PEDÁGIO (Lei 10.209/2001) ---
    // Obrigatório para Carga Lotação ou quando não fracionada
    if ((type === 'CT-e' || type === 'MDF-e') && scope !== 'MUNICIPAL' && scope !== 'INTERNACIONAL') {
        // Se houver valor de pedágio, exige pagador. Se não houver, exige justificativa (Isento/Fracionada)
        if (data.value > 0 && !data.tollAmount && !data.tollExempt) {
            warnings.push('RISCO ALTO: Vale-Pedágio não informado. Multa de R$ 550,00 por veículo se houver praça de pedágio.');
        }
        if (data.tollAmount > 0 && !data.tollPayerCnpj) {
            errors.push('CRÍTICO: Para informar Vale-Pedágio, o CNPJ do Responsável (Embarcador/Equiparado) é obrigatório.');
        }
    }

    // --- D. LEI DA BALANÇA (Verificação Lógica) ---
    if (data.cargoWeight > 0 && data.vehicleCapacity > 0) {
        if (data.cargoWeight > data.vehicleCapacity) {
            errors.push(`CRÍTICO LEI DA BALANÇA: Peso da carga (${data.cargoWeight}kg) excede a capacidade técnica do veículo (${data.vehicleCapacity}kg). Risco de apreensão.`);
        }
    }

    // --- E. VALIDAÇÕES GERAIS ---
    if (!data.recipientName || data.recipientName.length < 3) errors.push('CRÍTICO: Nome do Destinatário inválido.');
    if (!data.value || data.value <= 0) errors.push('CRÍTICO: Valor do serviço não pode ser zero.');
    
    if (type === 'MDF-e') {
        if (!data.driverId) errors.push('MDF-e exige motorista vinculado.');
        if (!data.vehiclePlate) errors.push('MDF-e exige placa do veículo de tração.');
    }

    if (type === 'CIOT') {
        if (data.value < 10) errors.push('Valor inválido para geração de CIOT.');
        if (!data.rntrc) errors.push('RNTRC é obrigatório para CIOT.');
    }

    const cert = guardianEngine.getCertificate();
    if (!cert || cert.status !== 'VALID') {
        errors.push('FATAL: Certificado Digital A1 não encontrado ou vencido no cofre.');
    }

    // --- F. SIMULAÇÃO REFORMA TRIBUTÁRIA (IBS/CBS) ---
    let simDetails = '';
    let currentSys = '';
    let reformSys = '';

    if (scope === 'MUNICIPAL') {
        currentSys = 'ISS (2% a 5%)';
        reformSys = 'IBS (Municipal/Estadual) + CBS (Federal)';
        simDetails = 'Unificação da tributação. Fim do conflito de competência ISS vs ICMS.';
    } else if (scope === 'INTERNACIONAL') {
        currentSys = 'ICMS Isento (LC 87/96)';
        reformSys = 'Desoneração Completa (Destino)';
        simDetails = 'Manutenção da competitividade exportadora.';
    } else {
        currentSys = scope === 'INTERESTADUAL' ? 'ICMS (7% ou 12%) + PIS/COFINS' : 'ICMS (17% a 19%) + PIS/COFINS';
        reformSys = 'IVA Dual (~26.5%) - Crédito Integral';
        simDetails = 'Creditamento total sobre insumos (Diesel, Pneus, Peças). Fim do efeito cascata.';
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings,
        scope,
        taxSimulation: {
            currentSystem: currentSys,
            reformSystem: reformSys,
            details: simDetails
        }
    };
  },

  // 2. Transmissão
  transmitDocument: async (docData: Partial<TaxDocument>): Promise<TaxDocument> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isAuthorized = Math.random() > 0.05; 

        if (isAuthorized) {
          const newDoc: TaxDocument = {
            id: `DOC-${Date.now()}`,
            type: docData.type || 'CT-e',
            number: Math.floor(Math.random() * 10000).toString(),
            series: '1',
            issueDate: new Date().toISOString(),
            value: docData.value || 0,
            recipientName: docData.recipientName || 'Destinatário Padrão',
            status: 'AUTHORIZED',
            accessKey: '35230912345678000190570010000012341000123456', 
            xmlUrl: '#', 
            pdfUrl: '#', 
            ciotProtocol: docData.type === 'CIOT' ? `CIOT-${Math.floor(Math.random() * 999999)}` : undefined
          };
          guardianEngine.saveTaxDocument(newDoc);
          resolve(newDoc);
        } else {
          const rejectedDoc: TaxDocument = {
            ...docData as TaxDocument,
            id: `REJ-${Date.now()}`,
            status: 'REJECTED',
            rejectionReason: 'Rejeição 203: Emissor não habilitado para emissão na UF.'
          };
          resolve(rejectedDoc);
        }
      }, API_DELAY);
    });
  },

  // 3. Upload Certificado
  uploadCertificate: async (file: File, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Certificado ${file.name} enviado.`);
        guardianEngine.saveCertificate({
            id: 'cert-001',
            fileName: file.name,
            expiryDate: '2026-12-31', 
            status: 'VALID'
        });
        resolve(true);
      }, 1500);
    });
  }
};
