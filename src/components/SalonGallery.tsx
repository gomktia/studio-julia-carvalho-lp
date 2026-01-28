import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const salonImages = [
    '/assets/salao/salao-01.jpeg',
    '/assets/salao/salao-02.jpeg',
    '/assets/salao/salao-03.jpeg',
    '/assets/salao/salao-04.jpeg',
    '/assets/salao/salao-05.jpeg',
    '/assets/salao/salao-06.jpeg',
    '/assets/salao/salao-07.jpeg',
    '/assets/salao/salao-08.jpeg',
    '/assets/salao/salao-09.jpeg',
    '/assets/salao/salao-10.jpeg',
    '/assets/salao/salao-11.jpeg',
    '/assets/salao/salao-12.jpeg',
    '/assets/salao/salao-13.jpeg',
    '/assets/salao/salao-14.jpeg',
    '/assets/salao/salao-15.jpeg',
    '/assets/salao/salao-17.jpeg',
];

const SalonGallery = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    // Lock scroll when modal is open
    useEffect(() => {
        if (selectedImage !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

    const nextImage = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % salonImages.length);
        }
    };

    const prevImage = () => {
        if (selectedImage !== null) {
            setSelectedImage((selectedImage - 1 + salonImages.length) % salonImages.length);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImage === null) return;
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage]);

    return (
        <section id="studio" className="py-24 bg-surface lg:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="label-uppercase text-accent mb-4 block">Nosso Espaço</span>
                    <h2 className="heading-xl mb-6">
                        <span className="text-text-primary">Conheça o </span>
                        <span className="gradient-text italic">nosso studio</span>
                    </h2>
                    <p className="text-body-light text-text-secondary max-w-xl mx-auto">
                        Um ambiente preparado com todo carinho e profissionalismo para receber você com o máximo conforto e elegância.
                    </p>
                </motion.div>

                <div className="relative group">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 md:-ml-6">
                            {salonImages.map((src, index) => (
                                <CarouselItem key={src} className="pl-4 md:pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => setSelectedImage(index)}
                                        className="cursor-pointer relative group/item aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-white/5 bg-surface-dark"
                                    >
                                        <img
                                            src={src}
                                            alt={`Studio Ju Carvalho ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                            <div className="bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/30 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-300">
                                                <Camera className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <div className="flex justify-center gap-4 mt-12">
                            <CarouselPrevious className="static translate-y-0 bg-white/5 border-white/10 hover:bg-accent hover:text-white hover:border-accent text-white w-12 h-12 transition-all duration-300" />
                            <CarouselNext className="static translate-y-0 bg-white/5 border-white/10 hover:bg-accent hover:text-white hover:border-accent text-white w-12 h-12 transition-all duration-300" />
                        </div>
                    </Carousel>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/10 z-[110]"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>

                        <button
                            className="absolute left-6 text-white/50 hover:text-white transition-colors hidden md:flex items-center justify-center bg-white/5 hover:bg-white/10 w-14 h-14 rounded-full backdrop-blur-sm border border-white/10 z-[110]"
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>

                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative max-w-5xl w-full flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={salonImages[selectedImage]}
                                alt={`Studio Ju Carvalho ${selectedImage + 1}`}
                                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10"
                            />
                            <div className="mt-6 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white/70 text-sm font-light">
                                {selectedImage + 1} <span className="mx-2 opacity-30">|</span> {salonImages.length}
                            </div>
                        </motion.div>

                        <button
                            className="absolute right-6 text-white/50 hover:text-white transition-colors hidden md:flex items-center justify-center bg-white/5 hover:bg-white/10 w-14 h-14 rounded-full backdrop-blur-sm border border-white/10 z-[110]"
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>

                        {/* Mobile Controls */}
                        <div className="absolute bottom-10 flex gap-6 md:hidden z-[110]">
                            <button
                                className="bg-white/10 p-5 rounded-full text-white backdrop-blur-md border border-white/10 active:scale-95 transition-transform"
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button
                                className="bg-white/10 p-5 rounded-full text-white backdrop-blur-md border border-white/10 active:scale-95 transition-transform"
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default SalonGallery;
