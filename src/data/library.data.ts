interface ContentItemLeaf {
  label: string;
  content: string;
}

interface ContentItemData {
  label: string;
  content: string | Array<ContentItemLeaf>;
  useCard?: boolean;
}

export interface LibraryItem {
  id: string;
  title: string;
  elements: {
    descriptionCurt: string;
    items: Array<ContentItemData>;
  };
  font: {
    citation?: string;
    fontLabel: string;
    fontHref: string;
  };
}

export const libraryData: Array<LibraryItem> = [
  {
    id: "dados-sensiveis-atendimento",
    title: "Dados Sensíveis no atendimento online em saúde",
    elements: {
      descriptionCurt:
        "No atendimento online, dados de saúde do paciente são sensíveis e exigem proteção reforçada. Quando tratados com necessidade, clareza e proteção, o caso tende a Uso aceitável; quando ha excesso, indefinição de finalidade ou fragilidade de proteção, tende a Risco regulatório.",
      items: [
        {
          label: "O que são dados sensíveis",
          content:
            "Dados clínicos, sintomas, exames, biometria e histórico medico podem gerar impactos relevantes à privacidade e dignidade do paciente, por isso exigem base legal adequada, necessidade real de uso e proteção técnica e administrativa. Em cenários mais controlados e proporcionais, a analise indica Uso aceitável. Quando o uso e excessivo ou mal protegido, pode haver Risco regulatório. Em situações intermediarias, o caso pode ser Uso aceitável, mas com cuidados extras.",
        },
        {
          label: "O que fazer na prática",
          content:
            "Verificar se apenas os dados necessários estão sendo coletados, com acesso restrito e segurança adequada; documentar finalidade e retenção; revisar periodicamente a proporcionalidade da coleta. Se os critérios forem atendidos, classificar como Uso aceitável. Se houver pontos sensíveis ainda controláveis, classificar como Uso aceitável, mas com cuidados extras. Se houver coleta excessiva ou proteção insuficiente, classificar como Risco regulatório.",
          useCard: true,
        },
      ],
    },
    font: {
      citation:
        "O tratamento de dados pessoais sensíveis somente poderá ocorrer quando o titular ou seu responsável legal consentir, de forma especifica e destacada, para finalidades específicas.",
      fontLabel:
        "LGPD - Lei n° 13.709/2018, especialmente arts. 5°, 6 e 11; materiais institucionais sobre dados sensíveis e proteção de dados em saúde digital.",
      fontHref: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
    },
  },
];
