import { IconLibrary } from "@/components/Icon";

export type ContentItemLeaf = {
  label: string;
  content: string;
};

type CardOptions = {
  icon?: IconLibrary;
};

export type ContentItemData = {
  label: string;
  content: string | Array<ContentItemLeaf>;
  card?: CardOptions;
};

export interface LibraryItem {
  id: string;
  title: string;
  homeIconLibrary?: IconLibrary;
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
    homeIconLibrary: "searchData",
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
          card: { icon: "checkCircle" },
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
    homeIconLibrary: "info",
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
  {
    id: "explicacao-riscos-e-protecao",
    title: "Explicação de riscos e proteções no teleatendimento",
    homeIconLibrary: "protectQuestion",
    elements: {
      descriptionCurt:
        "O paciente precisa receber explicação simples sobre riscos do ambiente digital e medidas de proteção adotadas. Quando essa explicação é suficiente, o caso tende a Uso aceitável; quando é ausente ou genérica, tende a Risco regulatório.",
      items: [
        {
          label: "Mapeamento de Riscos",
          content:
            "Em saúde digital, a decisão ética depende de o paciente compreender riscos como vazamento, acesso indevido e uso inadequado de dados, além de conhecer as medidas de mitigação adotadas. Quando riscos e salvaguardas são apresentados com suficiência, o uso tende a Uso aceitável. Quando essa camada informativa é fraca, o caso tende a Risco regulatório. Se houver proteção razoável, mas comunicação insuficiente, pode ser Uso aceitável, mas com cuidados extras.",
        },
        {
          label: "O que fazer na prática",
          content:
            "Mapear e explicar os principais riscos e as medidas de proteção de forma compreensível; alinhar o conteúdo entre interface, política e atendimento; atualizar sempre que o fluxo mudar. Se os riscos e proteções estiverem claros, classificar como Uso aceitável. Se a proteção existir, mas a explicação precisar melhorar, classificar como Uso aceitável, mas com cuidados extras. Se não houver explicação suficiente, classificar como Risco regulatório.",
          card: { icon: "alert" },
        },
      ],
    },
    font: {
      fontLabel:
        "LGPD - Lei n° 13.709/2018, especialmente art. 6°; referências sobre segurança, prevenção e proteção de dados em teleatendimento e saúde digital.",
      fontHref:
        "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
    },
  },
  {
    id: "consentimento-sem-coação-atendimento",
    title: "Consentimento sem coação no atendimento remoto",
    homeIconLibrary: "checkBadge",
    elements: {
      descriptionCurt:
        "O consentimento deve ser livre, informado e sem pressão indevida. Quando a escolha e real e compreensível, o caso tende a Uso aceitável; quando ha indução, confusão ou aceite forcado, tende a Risco regulatório.",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_HcOcXYdwXhzgISRFXlrCId95g45ocTaj8yXHiqlEc9W3vUDcoT0MNGDhRuay2XHQVFl3YNxxaDD1itWVqOX0UB1VXnUijZq0DOmdxGdp_SGszlQlGEIZ2ufPmQ7OQjv087lnP8fJRnknNYFB0HRQAc8ypRsLvE89MmZe2Cz_mrex5HCBsaeRpjP0LWV1LRX1HrKO6Ks943DX64vtG-5lZQ_fUgGg5ZqGRaV9a9I773PXz_lTcqXXET4G5nux6lAZbv5GH0ueDXZ4",
      items: [
        {
          label: "O que define o consentimento livre",
          content:
            "No teleatendimento, o consentimento pode ser fragilizado quando o paciente aceita termos sem real compreensão, sob urgência, confusão informacional ou falta de alternativa razoável. Quando o consentimento é livre e informado, o uso tende a Uso aceitável. Quando existe coação ou ausência de escolha real, tende a Risco regulatório. Se o consentimento existir, mas exigir reforço de explicação e registro, pode ser Uso aceitável, mas com cuidados extras.",
        },
        {
          label: "O que fazer na prática",
          content:
            "Revisar o fluxo de aceite para eliminar pressão, bloqueios desnecessários e indução; garantir escolha livre, registro adequado e linguagem simples. Se o aceite for livre e informado, classificar como Uso aceitável. Se o consentimento existir, mas precisar de reforço operacional, classificar como Uso aceitável, mas com cuidados extras. Se houver coação, confusão ou aceite forçado, classificar como Risco regulatório.",
          card: { icon: "checkCircle" },
        },
      ],
    },
    font: {
      fontLabel:
        "LGPD - Lei n° 13.709/2018, especialmente arts. 8° e 11; referências sobre consentimento informado em saúde e tratamento de dados sensíveis.",
      fontHref:
        "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
    },
  },
];
