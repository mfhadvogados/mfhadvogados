// Fontes oficiais: apresentação empresarial e portfólio de contencioso MFH.
// Inscrições profissionais: página 3; contatos: página 6 de ambos os PDFs.
export const site = {
  name: "MFH Advogados",
  fullName: "Melara, Fuhrmann & Huinka Advogados Associados",
  description:
    "Assessoria jurídica empresarial e contencioso estratégico e de massa. Desde 2006, em Florianópolis, Santa Catarina.",
  location: "Florianópolis, Santa Catarina",
  address: "Av. Prefeito Osmar Cunha, 183, Bloco B, sala 806",
  postalCode: "88015-900",
  phone: "(48) 99942-4925",
  phoneHref: "tel:+5548999424925",
  whatsappHref: "https://wa.me/5548999424925",
  instagramHref: "https://www.instagram.com/mfhadvempresa/",
  instagramHandle: "@mfhadvempresa",
  // Links do Google e Maps fornecidos pelo responsável pelo site.
  googleHref:
    "https://www.google.com/search?q=Melara%2C+Fuhrmann+e+Huinka+Advogados&rlz=1C1ONGR_pt-PTBR1161BR1161&oq=Melara%2C+Fuhrmann+e+Huinka+Advogados&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQABjvBTIHCAIQABjvBTIKCAMQABiABBiiBDIHCAQQABjvBTIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPNIBBzUxOGowajeoAgCwAgA&sourceid=chrome&source=chrome.ob&ie=UTF-8",
  mapsHref:
    "https://www.google.com/maps/place/Melara,+Fuhrmann+e+Huinka+Advogados/@-27.5939189,-48.553936,17z/data=!3m1!4b1!4m6!3m5!1s0x95273823a98fe5cd:0x42632a285ba31c94!8m2!3d-27.5939237!4d-48.5513557!16s%2Fg%2F11sczx1tlq?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
} as const;

export const navigation = [
  { label: "O Escritório", href: "#escritorio" },
  { label: "Atuação", href: "#atuacao" },
  { label: "Contencioso", href: "#contencioso" },
  { label: "Profissionais", href: "#profissionais" },
] as const;

export const contacts = {
  whatsapp: {
    label: "WhatsApp",
    href: site.whatsappHref,
    action: "Conversar com o escritório",
  },
  phone: { label: "Telefone", href: site.phoneHref, action: site.phone },
  instagram: {
    label: "Instagram",
    href: site.instagramHref,
    action: site.instagramHandle,
  },
  google: {
    label: "Google",
    href: site.googleHref,
    action: "Ver no Google",
  },
  maps: {
    label: "Localização",
    href: site.mapsHref,
    action: "Ver localização",
  },
} as const;
export type ContactChannel = keyof typeof contacts;

// Organização editorial dos serviços das páginas 2, 4 e 6 da apresentação.
export const practiceAreas = [
  {
    id: "trabalhista",
    title: "Direito Trabalhista Empresarial",
    description:
      "Orientação próxima a gestores e RH, da contratação ao desligamento. Suporte à rotina da empresa com atenção à prevenção de passivos trabalhistas.",
    details: [
      "Contratações, desligamentos, penalidades, férias e jornadas",
      "Remuneração, benefícios e atualização à norma coletiva vigente",
      "Políticas internas, regimentos, códigos de conduta e acordos individuais",
      "Treinamentos de funcionários e lideranças e compliance trabalhista",
    ],
  },
  {
    id: "societario",
    title: "Direito Societário",
    description:
      "Estruturação de relações societárias alinhada à realidade do negócio. Orientação para organizar responsabilidades, acompanhar mudanças e prevenir conflitos entre sócios.",
    details: [
      "Contratos sociais e acordos entre sócios",
      "Entrada e saída de parceiros",
      "Reorganizações societárias e prevenção de conflitos",
    ],
  },
  {
    id: "contratos",
    title: "Contratos Empresariais",
    description:
      "Elaboração, análise e revisão de contratos que fazem parte do dia a dia empresarial, com avaliação das obrigações e dos riscos de cada relação.",
    details: [
      "Contratos com clientes, fornecedores, prestadores e parceiros comerciais",
      "Suporte jurídico em contratos e negociações",
      "Auditoria contratual e gestão de riscos",
    ],
  },
  {
    id: "preventiva",
    title: "Consultoria Preventiva",
    description:
      "Análise de riscos e orientação antes de decisões estratégicas. Uma assessoria permanente que acompanha a operação, a equipe e as necessidades da empresa.",
    details: [
      "Suporte jurídico contínuo nas decisões da empresa",
      "Orientação para gestores e lideranças",
      "Análise de riscos trabalhistas, contratuais, societários e consumeristas",
    ],
  },
  {
    id: "defesa",
    title: "Contencioso Cível e Consumerista",
    description:
      "Defesa dos interesses da empresa em demandas cíveis, consumeristas e empresariais, com análise técnica e visão estratégica sobre o negócio.",
    details: [
      "Defesa cível e consumerista",
      "Condução estratégica de demandas empresariais",
      "Integração com a gestão do contencioso da empresa",
    ],
  },
  {
    id: "patrimonial",
    title: "Proteção Patrimonial",
    description:
      "Orientação jurídica voltada à proteção do patrimônio e dos interesses empresariais, integrada à análise dos riscos e das decisões do negócio.",
    details: [
      "Proteção de patrimônio",
      "Avaliação jurídica de riscos empresariais",
      "Soluções alinhadas à realidade da empresa",
    ],
  },
  {
    id: "cobrancas",
    title: "Cobranças e Notificações",
    description:
      "Acompanhamento jurídico de cobranças e notificações extrajudiciais, com suporte à condução de negociações e às relações comerciais da empresa.",
    details: [
      "Cobranças empresariais",
      "Notificações extrajudiciais",
      "Orientação em negociações",
    ],
  },
] as const;

export const preventionSteps = [
  {
    title: "Prevenção",
    description:
      "Conhecer a operação, a equipe e os riscos da empresa para antecipar questões trabalhistas, contratuais, societárias e consumeristas.",
  },
  {
    title: "Orientação",
    description:
      "Um canal direto com o advogado para apoiar gestores, RH e lideranças nas decisões da rotina empresarial.",
  },
  {
    title: "Estratégia",
    description:
      "Analisar o cenário jurídico e de negócios de forma integrada, com orientação alinhada à realidade de cada empresa.",
  },
  {
    title: "Segurança",
    description:
      "Dar suporte jurídico à tomada de decisão, com informação especializada e atenção à prevenção de passivos.",
  },
] as const;

export const litigationSteps = [
  {
    title: "Entrada",
    description:
      "Atendimento dedicado e comunicação direta com departamentos jurídicos para organizar as demandas da operação.",
  },
  {
    title: "Gestão",
    description:
      "Controle rigoroso de prazos, gestão de elevado volume processual e elaboração e padronização de peças.",
  },
  {
    title: "Estratégia",
    description:
      "Condução técnica do contencioso, com audiências presenciais e virtuais, recursos e sustentações orais.",
  },
  {
    title: "Resultado",
    description:
      "Relatórios gerenciais e executivos, acompanhamento por indicadores e comunicação transparente com o parceiro.",
  },
] as const;

export const litigationServices = [
  "Carteiras de contencioso de massa",
  "Contencioso trabalhista empresarial",
  "Contencioso cível e consumerista",
  "Correspondência jurídica",
  "Audiências presenciais e virtuais",
  "Recursos e sustentações orais",
  "Relatórios gerenciais e executivos",
  "Elaboração e revisão de contratos",
] as const;

export const differentials = [
  {
    title: "Visão empresarial",
    description:
      "Entendimento do impacto jurídico nas decisões estratégicas das empresas, com análise integrada do negócio.",
  },
  {
    title: "Eficiência operacional",
    description:
      "Fluxos internos orientados à previsibilidade, à organização e à agilidade na condução das demandas.",
  },
  {
    title: "Tecnologia e gestão",
    description:
      "Ferramentas digitais na gestão processual e acompanhamento das operações por indicadores.",
  },
  {
    title: "Presença em Santa Catarina",
    description:
      "Atuação regional com experiência perante a Justiça Estadual, a Justiça do Trabalho e os Tribunais.",
  },
  {
    title: "Proximidade com o cliente",
    description:
      "Atendimento personalizado e comunicação transparente, com soluções alinhadas às necessidades de cada parceiro.",
  },
] as const;

export const professionals = [
  {
    id: "flavio",
    name: "Dr. Flavio Augusto Boreggio Melara",
    registration: "OAB/SC 15526B",
    role: "Sócio",
    areas: "Advocacia empresarial e assessoramento estratégico",
    introduction:
      "Experiência na condução estratégica de demandas jurídicas complexas e no desenvolvimento institucional de escritórios.",
    biography: [
      "Advogado com 25 anos de experiência na advocacia empresarial, formado em Direito em São Paulo, com pós-graduações em São Paulo e na Universidade Federal de Santa Catarina (UFSC).",
      "Há 20 anos, atua em parceria com grandes empresas e escritórios de advocacia, prestando serviços de correspondente jurídico e assessoramento estratégico em Florianópolis e Santa Catarina.",
    ],
  },
  {
    id: "rafaela",
    name: "Dra. Rafaela Fernandes Fuhrmann",
    registration: "OAB/SC 38603 · OAB/SP 503494",
    role: "Sócia e CEO",
    areas: "Gestão de contencioso e consultoria preventiva",
    introduction:
      "Atua no relacionamento com clientes, na gestão de contencioso estratégico e na estruturação de operações jurídicas.",
    biography: [
      "CEO do escritório, atua em consultoria preventiva e assessoramento permanente a empresas de diversos segmentos econômicos. É especialista em negociações e acordos, com visão estratégica e foco em resultados para o cliente.",
      "Possui atuação voltada à padronização de processos, gestão de risco trabalhista, desenvolvimento de soluções jurídicas corporativas e fortalecimento do relacionamento com o cliente.",
    ],
  },
  {
    id: "franciele",
    name: "Dra. Franciele Karine Huinka",
    registration: "OAB/SC 45692",
    role: "Sócia",
    areas: "Direito Empresarial, Societário e Trabalhista Empresarial",
    introduction:
      "Desenvolve estratégias voltadas à prevenção de riscos, à estruturação de negócios e à governança corporativa.",
    biography: [
      "Sócia com atuação nas áreas de Direito Empresarial, Societário e Trabalhista Empresarial, desenvolvendo estratégias jurídicas voltadas à defesa dos interesses das empresas nas esferas consultiva, administrativa e judicial.",
      "Com expertise em advocacia corporativa, possui visão estratégica e multidisciplinar, oferecendo soluções jurídicas personalizadas que promovem segurança, conformidade legal e crescimento sustentável dos negócios, com foco na mitigação de passivos e na geração de valor para o cliente.",
    ],
  },
] as const;
