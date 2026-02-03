import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 3 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="card-elevated p-1 overflow-hidden">
                    <div className="aspect-[4/3] w-full bg-border/30 relative overflow-hidden">
                        <motion.div
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        />
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="h-6 w-2/3 bg-border/40 rounded-full" />
                        <div className="h-4 w-full bg-border/20 rounded-full" />
                        <div className="h-4 w-5/6 bg-border/20 rounded-full" />
                        <div className="flex justify-between items-center pt-4">
                            <div className="h-4 w-20 bg-border/40 rounded-full" />
                            <div className="h-10 w-24 bg-border/40 rounded-full" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
