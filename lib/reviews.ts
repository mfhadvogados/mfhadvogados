import ricardo from "@/feedbacks/imgFeedback/ricardoKaram.png";
import rodrigo from "@/feedbacks/imgFeedback/rodrigoMelendez.png";
import ana from "@/feedbacks/imgFeedback/anaCarolineNascimento.png";
import tayano from "@/feedbacks/imgFeedback/tayanoLima.png";
import floeli from "@/feedbacks/imgFeedback/floeliDoPradoSantos.png";

// Textos e fotos: feedbacks/. As cinco notas de 5 estrelas foram informadas pelo cliente.
export const reviews = [
  {
    id: "ricardo-karam",
    name: "Ricardo Karam",
    avatar: ricardo,
    text: "Excelente experiência com a Melara, Fuhrmann e Huinka Advogados. Posso destacar a dedicação, o profissionalismo e a atenção da Dra. Rafaela Fuhrmann e da Dra. Franciele Huinka.\n\nMuito atenciosas, claras nas orientações e extremamente comprometidas, transmitindo segurança e confiança em cada etapa.\n\nSem dúvida, recomendo o escritório pela seriedade e pelo atendimento humano e eficiente.",
  },
  {
    id: "rodrigo-melendez",
    name: "Rodrigo Melendez",
    avatar: rodrigo,
    text: "Excelente atendimento do início ao fim! A Dra. Rafaela foi extremamente clara em todas as etapas, explicando exatamente o que iria acontecer e me deixando muito tranquilo durante todo o processo. O mais impressionante é que tudo aconteceu exatamente como ela havia previsto — o que demonstra muita competência e experiência.\n\nParabéns à Dra. Rafaela e a toda a equipe pelo excelente trabalho. Recomendo muito!",
  },
  {
    id: "ana-caroline-nascimento",
    name: "Ana Caroline Nascimento",
    avatar: ana,
    text: "Gostaria de destacar e agradecer pelo excelente suporte prestado. Vocês sempre se mostram disponíveis, oferecendo orientações claras e seguras em todos os momentos. São profissionais atenciosas, inteligentes e extremamente competentes.\nÉ muito gratificante poder contar com um trabalho tão dedicado e de alta qualidade.",
  },
  {
    id: "tayano-lima",
    name: "Tayano Lima",
    avatar: tayano,
    text: "Excelente atendimento! A equipe do Melara, Fuhrmann e Huinka Advogados é extremamente profissional, atenciosa e competente. Fui muito bem orientado durante todo o processo, com explicações claras e transparência em cada etapa. Demonstram grande conhecimento jurídico e comprometimento com os clientes. Recomendo com confiança! ⭐⭐⭐⭐⭐",
  },
  {
    id: "floeli-do-prado-santos",
    name: "Floeli Do Prado Santos",
    avatar: floeli,
    text: "Excelente atendimento e profissionalismo. As doutoras demonstram domínio técnico, clareza nas orientações e comprometimento com o cliente. Recomendo com segurança. Estou muito satisfeita .",
  },
] as const;

export type Review = (typeof reviews)[number];
