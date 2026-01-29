import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, Instagram } from 'lucide-react';

const LocationSection = () => {
    const address = "Tatuapé, São Paulo - SP";
    const reference = "A 1 minuto do Metrô Carrão";
    const whatsapp = "11 93330-0012";

    return (
        <section id="contato" className="py-24 bg-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="label-uppercase text-accent mb-4 block">Onde Estamos</span>
                        <h2 className="heading-xl mb-8">
                            <span className="text-text-primary">Visite o nosso </span>
                            <span className="gradient-text italic">studio</span>
                        </h2>

                        <p className="text-text-secondary mb-12 text-lg font-light leading-relaxed">
                            Localizado em um ponto privilegiado do Tatuapé, nosso espaço oferece todo o conforto e exclusividade que você merece.
                        </p>

                        <div className="space-y-8">
                            {/* Address */}
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                                    <MapPin className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h4 className="font-display text-2xl text-text-primary mb-1">Localização</h4>
                                    <p className="text-text-secondary font-light">{address}</p>
                                    <p className="text-xs text-accent font-medium mt-1 uppercase tracking-wider">{reference}</p>
                                </div>
                            </div>

                            {/* Working Hours */}
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                                    <Clock className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h4 className="font-display text-2xl text-text-primary mb-1">Horários</h4>
                                    <p className="text-text-secondary font-light">Segunda a Sexta: 09h às 19h</p>
                                    <p className="text-text-secondary font-light">Sábados: 09h às 14h</p>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                                    <Phone className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h4 className="font-display text-2xl text-text-primary mb-1">Contato</h4>
                                    <p className="text-text-secondary font-light">WhatsApp: {whatsapp}</p>
                                    <a
                                        href="https://www.instagram.com/studiojucarvalho._/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-xs text-accent font-medium mt-1 uppercase tracking-wider hover:underline"
                                    >
                                        <Instagram className="w-3 h-3" /> @studiojucarvalho._
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-4">
                            <button
                                onClick={() => window.open('https://wa.me/5511933300012', '_blank')}
                                className="btn-primary"
                            >
                                Agende agora pelo WhatsApp
                            </button>
                            <button
                                onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Studio+Julia+Carvalho+Tatuape', '_blank')}
                                className="btn-secondary"
                            >
                                <Navigation className="w-4 h-4" /> Ver no Mapa
                            </button>
                        </div>
                    </motion.div>

                    {/* Map / Image Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl border border-border/50 bg-base relative group">
                            {/* This would be a Google Map Embed in a real scenario */}
                            {/* For now, let's use a stylized image of the studio or a generic map visual */}
                            <img
                                src="/assets/salao/salao-01.webp"
                                alt="Studio Interior"
                                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                            <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white shadow-lg">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h5 className="font-display text-xl text-white">Próximo ao Metrô</h5>
                                        <p className="text-white/70 text-sm">Fácil acesso para você chegar com tranquilidade.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative background */}
                        <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
                        <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default LocationSection;
