export type ContentItemLeaf = {
  label: string;
  content: string;
};

type CardOptions = {
  icon?: "check" | "info" | "alert" | "book";
};

export type ContentItemData = {
  label: string;
  content: string | Array<ContentItemLeaf>;
  card?: CardOptions;
};

export interface LibraryItem {
  id: string;
  title: string;
  elements: {
    descriptionCurt: string;
    imageUrl?: string;
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
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDLMmzoYVXt4u1M3MPi1_hZWjkRSPBJAEb3bvAwwlFmTBizZOkQfUrRXYljKs8ERX9oqQCoSrn-yvT3RBYxsVrxUm_emY3mhFq86dDiFFpXCyAO7rQV2Sk8TxiqkuBVdzt3t4ZXsruIXJzhA4KoU3kTUaXDkbJdhzjDeCnjC5rPd6Itle7mQVBlfKrFLrAaxIg_iEbXm3bzT7KWw8lummOCn5pS43LKiMVDYHDs7hi8FnNr8lNKVIAhlAmmmza4jFLQNA8we4niOKqY",
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
          card: { icon: "check" },
        },
      ],
    },
    font: {
      citation:
        "O tratamento de dados pessoais sensíveis somente poderá ocorrer quando o titular ou seu responsável legal consentir, de forma especifica e destacada, para finalidades específicas.",
      fontLabel:
        "LGPD - Lei n° 13.709/2018, especialmente arts. 5°, 6 e 11; materiais institucionais sobre dados sensíveis e proteção de dados em saúde digital.",
      fontHref:
        "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
    },
  },
  {
    id: "transparencia-dados-paciente",
    title: "Transparência no uso dos dados do paciente",
    elements: {
      descriptionCurt:
        "O paciente deve entender claramente como seus dados serão usados no atendimento remoto. Quando a informação e clara e compreensível, o caso tende a Uso aceitável; quando e vaga ou confusa, tende a Risco regulatório.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAwkrghQhlRC4f_eh5mbHpnyP3cyLyRIFXXMozRduC5wT_IVLCfNrUpWp90Sz8xNcjLBWnsoLPkPJqO4n_WSZJcF6CQftGNXwJFB0nor92RQ-6NsR7PekSB1ijq6qmj6eo_Kuv2hnrXzVLABuIrYtk5r9aTEa88PVmtkX9hNNKvBZs_JAjttC2n0-y0iQ4Vp-HO1_3L8S32C5CwuJhdrk3WEok9NN2hYwpAYk19FRQlSDrKaHwS6DVr8vwBk_lY6gqrarthUbDw82Cf",
      items: [
        {
          label: "Finalidade do Tratamento",
          card: { icon: "info" },
          content:
            "Transparência significa informar de forma clara a finalidade do tratamento, quem acessa os dados, por quanto tempo eles ficam armazenados e quais direitos o paciente pode exercer. Quando o paciente compreende efetivamente o fluxo de dados, a analise se aproxima de Uso aceitável. Quando ha opacidade ou informação incompleta, ha Risco regulatório. Se houver clareza parcial, o resultado pode ser Uso aceitável, mas com cuidados extras.",
        },
        {
          label: "O que fazer na prática",
          content: [
            {
              label: "Revisão de Interface",
              content:
                "Revisar telas, formulários e avisos para garantir linguagem simples, finalidade clara e informação sobre compartilhamento e retenção; testar se o paciente compreende a mensagem sem mediação técnica.",
            },
            {
              label: "Classificação de Uso",
              content:
                "Se a compreensão for efetiva, classificar como Uso aceitável. Se houver necessidade de reforçar a comunicação, classificar como Uso aceitável, mas com cuidados extras. Se a comunicação for vaga ou insuficiente, classificar como Risco regulatório.",
            },
          ],
        },
      ],
    },
    font: {
      citation:
        "O princípio da transparência garante aos titulares informações claras, precisas e facilmente acessíveis sobre a realização do tratamento e os respectivos agentes de tratamento.",
      fontLabel:
        "LGPD - Lei n° 13.709/2018, especialmente arts. 6° e 9°; princípios de transparência e livre acesso em materiais públicos sobre proteção de dados.",
      fontHref:
        "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
    },
  },
];
