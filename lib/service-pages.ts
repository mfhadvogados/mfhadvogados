// Duas intenções distintas documentadas nos PDFs; nenhuma página por palavra-chave.
export const servicePages = {
  business: {
    path: "/assessoria-juridica-empresarial",
    name: "Assessoria jurídica empresarial",
    title: "Assessoria empresarial em Florianópolis | MFH Advogados",
    description:
      "Assessoria jurídica empresarial em Florianópolis, Santa Catarina. Direito Trabalhista Empresarial, Direito Societário, Contratos Empresariais e Consultoria Preventiva.",
  },
  litigation: {
    path: "/contencioso-estrategico-de-massa",
    name: "Contencioso estratégico e de massa",
    title: "Contencioso em Florianópolis e Santa Catarina | MFH Advogados",
    description:
      "Contencioso estratégico e de massa em Florianópolis, Santa Catarina. Gestão de elevado volume processual, audiências, recursos e correspondência jurídica.",
  },
} as const;

export type ServicePageKey = keyof typeof servicePages;
