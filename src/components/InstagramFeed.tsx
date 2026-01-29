import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

const feedImages = [
    { id: 1, src: '/assets/micropigmentacao-shadow.jpeg', likes: '124', comments: '12' },
    { id: 2, src: '/assets/brow-lamination.jpeg', likes: '89', comments: '5' },
    { id: 3, src: '/assets/limpeza-pele-profunda.jpeg', likes: '210', comments: '18' },
    { id: 4, src: '/assets/micropigmentacao-labial.jpeg', likes: '156', comments: '14' },
    { id: 5, src: '/assets/lash-lifting.jpeg', likes: '92', comments: '7' },
    { id: 6, src: '/assets/microagulhamento.jpeg', likes: '178', comments: '21' },
];

const InstagramFeed = () => {
    return (
        <section className="py-24 bg-base overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <span className="label-uppercase text-accent mb-4 block">Social Proof</span>
                        <h2 className="heading-xl mb-6 whitespace-nowrap">
                            <span className="text-text-primary">Acompanhe nosso </span>
                            <span className="gradient-text italic">Instagram</span>
                        </h2>
                        <p className="text-body-light text-text-secondary">
                            Siga @studiojucarvalho._ para ver transformações diárias, dicas de beleza e bastidores do nosso studio.
                        </p>
                    </motion.div>

                    <motion.a
                        href="https://www.instagram.com/studiojucarvalho._/"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="btn-secondary group flex items-center gap-3 px-8 py-4 rounded-2xl"
                    >
                        <Instagram className="w-5 h-5 text-accent" />
                        Seguir no Instagram
                    </motion.a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {feedImages.map((post, index) => (
                        <motion.a
                            key={post.id}
                            href="https://www.instagram.com/studiojucarvalho._/"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-square rounded-2xl overflow-hidden bg-surface-dark shadow-sm"
                        >
                            <img
                                src={post.src}
                                alt="Instagram post"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 text-white backdrop-blur-[2px]">
                                <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4 fill-white" />
                                    <span className="text-xs font-bold">{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageCircle className="w-4 h-4 fill-white" />
                                    <span className="text-xs font-bold">{post.comments}</span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstagramFeed;
