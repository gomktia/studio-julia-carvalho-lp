import { Course, Testimonial, FAQItem } from './Course';

export const courses: Course[] = [
  {
    id: 'limpeza-pele',
    title: 'Limpeza de Pele',
    description: 'Curso completo de Limpeza de Pele Profunda com Remoção de Milium, unindo teoria e prática supervisionada em modelo real.',
    price: 750,
    duration: '1 dia intensivo',
    category: 'Estética Facial',
    image: '/assets/limpeza-pele-profunda.webp',
    features: [
      'Protocolo limpeza profunda',
      'Remoção de milium',
      'Análise de pele',
      'Kit personalizado + Apostila Física',
      'Certificado + Coffee Break/Champanhe',
      'Suporte pós-curso ilimitado com a Ju'
    ],
    checkoutUrl: 'https://alunos.studiojuliacarvalho.com.br/checkout/G2LJVQ'
  },
  {
    id: 'microagulhamento',
    title: 'Microagulhamento',
    description: 'Aprenda protocolos para tratamentos faciais, capilares e corporais com foco em resultados reais.',
    price: 880,
    duration: '1 dia intensivo',
    category: 'Estética Avançada',
    image: '/assets/microagulhamento.webp',
    features: [
      'Facial, Capilar e Corporal',
      'Indicações e contraindicações',
      'Protocolos de aplicação',
      'Kit personalizado + Apostila Física',
      'Certificado + Coffee Break/Champanhe',
      'Suporte pós-curso ilimitado com a Ju'
    ],
    checkoutUrl: 'https://alunos.studiojuliacarvalho.com.br/checkout/xNMdwG'
  },
  {
    id: 'design-sobrancelha',
    title: 'Design de Sobrancelha',
    description: 'A base fundamental para qualquer profissional do olhar. Aprenda a arquitetura perfeita para cada rosto.',
    price: 320,
    duration: '1 dia',
    category: 'Sobrancelhas',
    image: '/assets/design-sobrancelha.webp', // Using generic brow image if specific not available
    features: [
      'Visagismo e medidas',
      'Design com pinça e linha',
      'Aplicação de Henna',
      'Kit personalizado + Apostila Física',
      'Certificado + Coffee Break/Champanhe',
      'Suporte pós-curso ilimitado com a Ju'
    ],
    checkoutUrl: 'https://alunos.studiojuliacarvalho.com.br/checkout/QrnDKQ'
  },
  {
    id: 'brow-lamination',
    title: 'Brow Lamination',
    description: 'Técnica tendência que alinha e dá volume aos fios da sobrancelha, criando um visual moderno e natural.',
    price: 290,
    duration: '1 dia',
    category: 'Sobrancelhas',
    image: '/assets/foto-capa-brow.webp',
    features: [
      'Técnica de alinhamento',
      'Nutrição dos fios',
      'Coloração correta',
      'Kit personalizado + Apostila Física',
      'Certificado + Coffee Break/Champanhe',
      'Suporte pós-curso ilimitado com a Ju'
    ],
    checkoutUrl: 'https://alunos.studiojuliacarvalho.com.br/checkout/GWXLpx'
  },
  {
    id: 'lash-lifting',
    title: 'Lash Lifting',
    description: 'Curvatura e coloração natural dos cílios. Uma técnica indispensável no seu portfólio.',
    price: 650,
    duration: '1 dia',
    category: 'Cílios',
    image: '/assets/lash-lifting.webp', // Placeholder name, assuming exists or fallback
    features: [
      'Curvatura e coloração',
      'Lash Botox (nutrição)',
      'Biossegurança',
      'Kit personalizado + Apostila Física',
      'Certificado + Coffee Break/Champanhe',
      'Suporte pós-curso ilimitado com a Ju'
    ],
    checkoutUrl: 'https://alunos.studiojuliacarvalho.com.br/checkout/bqEDob'
  },
  {
    id: 'micropigmentacao-labial',
    title: 'Micropigmentação Labial',
    description: 'Colorização labial, efeito batom, neutralização e revitalização para lábios perfeitos.',
    price: 980,
    duration: '2 dias',
    category: 'Micropigmentação',
    image: '/assets/micropigmentacao-labial.webp',
    features: [
      'Neutralização e Revitalização',
      'Efeito Batom e Aquarela',
      'Colorimetria aplicada',
      'Kit personalizado + Apostila Física',
      'Certificado + Coffee Break/Champanhe',
      'Suporte pós-curso ilimitado com a Ju'
    ],
    checkoutUrl: 'https://alunos.studiojuliacarvalho.com.br/checkout/bpwD3Q'
  },
  {
    id: 'micropigmentacao-fio',
    title: 'Micropigmentação Fio a Fio',
    description: 'Fios realistas que imitam a naturalidade das sobrancelhas. A técnica mais desejada do mercado.',
    price: 950,
    duration: '2 dias',
    category: 'Micropigmentação',
    image: '/assets/micropigmentacao-fio-a-fio.webp',
    features: [
      'Trama de fios realista',
      'Profundidade e pressão',
      'Dermógrafo e agulhas',
      'Kit personalizado + Apostila Física',
      'Certificado + Coffee Break/Champanhe',
      'Suporte pós-curso ilimitado com a Ju'
    ],
    checkoutUrl: 'https://alunos.studiojuliacarvalho.com.br/checkout/x9Ynmx'
  },
  {
    id: 'micropigmentacao-shadow',
    title: 'Micropigmentação Shadow',
    description: 'Efeito sombra degradê para sobrancelhas mais marcadas e definidas, com acabamento aveludado.',
    price: 970,
    duration: '2 dias',
    category: 'Micropigmentação',
    image: '/assets/micropigmentacao-shadow.webp',
    features: [
      'Efeito pixel e compacta',
      'Degradê perfeito',
      'Fixação e cicatrização',
      'Kit personalizado + Apostila Física',
      'Certificado + Coffee Break/Champanhe',
      'Suporte pós-curso ilimitado com a Ju'
    ],
    checkoutUrl: 'https://alunos.studiojuliacarvalho.com.br/checkout/x4Jg2b'
  },
  {
    id: 'cilios',
    title: 'Extensão de Cílios',
    description: 'Aprenda as técnicas clássicas e volumes para transformar o olhar das suas clientes com segurança.',
    price: 790,
    duration: '1 dia',
    category: 'Cílios',
    image: '/assets/cilios.webp', // Placeholder
    features: [
      'Fio a fio clássico',
      'Isolamento perfeito',
      'Mapping e Visagismo',
      'Kit personalizado + Apostila Física',
      'Certificado + Coffee Break/Champanhe',
      'Suporte pós-curso ilimitado com a Ju'
    ],
    checkoutUrl: 'https://alunos.studiojuliacarvalho.com.br/checkout/b1ayyb'
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Mariana Silva',
    role: 'Designer de Sobrancelhas',
    content: 'O curso de Micropigmentação Fio a Fio mudou completamente minha carreira! A Ju é uma profissional incrível, ensina com amor e dedicação. Hoje atendo várias clientes por semana com total segurança.',
    rating: 5,
    image: '/assets/testimonial-1.webp'
  },
  {
    id: '2',
    name: 'Camila Rodrigues',
    role: 'Esteticista',
    content: 'Fiz o curso de Limpeza de Pele Profunda e saí preparada para atender no mesmo dia! A metodologia é excepcional, com muita prática e material de apoio completo. Super recomendo!',
    rating: 5,
    image: '/assets/testimonial-2.webp'
  },
  {
    id: '3',
    name: 'Juliana Oliveira',
    role: 'Micropigmentadora',
    content: 'Já tinha experiência na área, mas o curso de Shadow 3D da Studio Ju Carvalho elevou meu trabalho a outro nível. As técnicas são avançadas e os resultados impressionam minhas clientes!',
    rating: 5,
    image: '/assets/testimonial-3.webp'
  }
];

export const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'Os cursos incluem material didático?',
    answer: 'Sim! Todos os cursos incluem material de estudo completo, kit personalizado para prática, coffee break durante as aulas e certificado de conclusão.'
  },
  {
    id: '2',
    question: 'Preciso ter experiência prévia?',
    answer: 'Não! Nossos cursos são desenvolvidos tanto para iniciantes quanto para profissionais que desejam aprimorar suas técnicas. Temos turmas específicas para cada nível.'
  },
  {
    id: '3',
    question: 'Como funciona a parte prática?',
    answer: 'Todos os cursos incluem prática supervisionada em modelo real. Você terá acompanhamento individual durante toda a execução, garantindo segurança e confiança para iniciar seus atendimentos.'
  },
  {
    id: '4',
    question: 'Qual a forma de pagamento?',
    answer: 'Aceitamos pagamento via PIX, cartão de crédito (parcelamento disponível) e transferência bancária. Entre em contato para consultar condições especiais.'
  },
  {
    id: '5',
    question: 'Recebo certificado?',
    answer: 'Sim! Ao concluir o curso, você receberá um certificado de conclusão reconhecido, que comprova sua formação e capacitação técnica na área.'
  },
  {
    id: '6',
    question: 'As turmas são limitadas?',
    answer: 'Sim! Trabalhamos com turmas reduzidas para garantir atendimento personalizado e qualidade no ensino. Por isso, recomendamos garantir sua vaga com antecedência.'
  }
];
