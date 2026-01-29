import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

interface BeforeAfterItem {
    id: string;
    title: string;
    before: string;
    after: string;
}

const items: BeforeAfterItem[] = [
    {
        id: '1',
        title: 'Micropigmentação Labial',
        before: '/assets/micropigmentacao-labial.webp', // Using existing as placeholder
        after: '/assets/labial.webp',
    },
    {
        id: '2',
        title: 'Limpeza de Pele',
        before: '/assets/limpeza-pele.webp',
        after: '/assets/limpeza-pele-nova.webp',
    },
    {
        id: '3',
        title: 'Design de Sobrancelha',
        before: '/assets/design-sobrancelha.webp',
        after: '/assets/foto-capa-brow.webp',
    }
];

const BeforeAfter = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [activeItem, setActiveItem] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const position = ((x - rect.left) / rect.width) * 100;

        setSliderPosition(Math.max(0, Math.min(100, position)));
    };

    return (
        <section id="resultados" className="py-24 bg-surface-elevated overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="label-uppercase text-accent mb-4 block">Resultados Reais</span>
                    <h2 className="heading-xl mb-6">
                        <span className="text-text-primary">Antes e </span>
                        <span className="gradient-text italic">Depois</span>
                    </h2>
                    <p className="text-body-light text-text-secondary max-w-xl mx-auto">
                        Arraste o cursor para comparar a transformação impecável que entregamos em cada procedimento.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Main Slider Display */}
                    <div className="w-full lg:w-2/3">
                        <div
                            ref={containerRef}
                            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 cursor-ew-resize select-none"
                            onMouseMove={handleMove}
                            onTouchMove={handleMove}
                        >
                            {/* After Image */}
                            <img
                                src={items[activeItem].after}
                                alt="After"
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />

                            {/* Before Image (Clipped) */}
                            <div
                                className="absolute inset-0 w-full h-full overflow-hidden"
                                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                            >
                                <img
                                    src={items[activeItem].before}
                                    alt="Before"
                                    className="absolute inset-0 w-[100%] h-full object-cover grayscale-[0.5]"
                                    loading="lazy"
                                />
                            </div>

                            {/* Slider Handle */}
                            <div
                                className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] z-10"
                                style={{ left: `${sliderPosition}%` }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-accent/20">
                                    <Layers className="w-5 h-5 text-accent" />
                                </div>
                            </div>

                            {/* Labels */}
                            <div className="absolute bottom-6 left-6 z-20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold">
                                Antes
                            </div>
                            <div className="absolute bottom-6 right-6 z-20 px-3 py-1 rounded-full bg-accent/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold">
                                Depois
                            </div>
                        </div>
                    </div>

                    {/* Selector Tabs */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-4">
                        {items.map((item, index) => (
                            <motion.button
                                key={item.id}
                                whileHover={{ x: 10 }}
                                onClick={() => {
                                    setActiveItem(index);
                                    setSliderPosition(50);
                                }}
                                className={`p-6 rounded-2xl border text-left transition-all duration-300 ${activeItem === index
                                    ? 'bg-white border-accent shadow-xl shadow-accent/5'
                                    : 'bg-transparent border-border hover:border-accent/30'
                                    }`}
                            >
                                <h4 className={`font-display text-xl mb-1 ${activeItem === index ? 'text-accent' : 'text-text-primary'}`}>
                                    {item.title}
                                </h4>
                                <p className="text-xs text-text-tertiary">Clique para visualizar este resultado</p>
                            </motion.button>
                        ))}

                        <div className="mt-8 p-6 rounded-2xl bg-accent/5 border border-accent/10">
                            <p className="text-sm text-text-secondary italic">
                                "Nossa técnica preza pela naturalidade e realce da beleza individual de cada cliente."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;
