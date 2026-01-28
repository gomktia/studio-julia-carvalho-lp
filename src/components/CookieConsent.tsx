import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, ChevronRight } from 'lucide-react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showPolicies, setShowPolicies] = useState(false);
    const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | null>(null);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const handleOpenPolicy = (e: any) => {
            setActivePolicy(e.detail);
            setShowPolicies(true);
        };
        window.addEventListener('open-policy', handleOpenPolicy);
        return () => window.removeEventListener('open-policy', handleOpenPolicy);
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const policies = {
        privacy: {
            title: 'Política de Privacidade',
            content: `
        O Estúdio Júlia Carvalho valoriza a sua privacidade. Esta política descreve como coletamos e usamos seus dados.
        
        1. Coleta de Dados: Coletamos informações fornecidas voluntariamente em nossos formulários de inscrição e contato (nome, e-mail, telefone).
        2. Finalidade: Seus dados são usados exclusivamente para processar suas solicitações de cursos, serviços e enviar comunicações relacionadas ao studio.
        3. Cookies: Utilizamos cookies para melhorar sua experiência de navegação e entender como você interage com nosso site.
        4. Segurança: Implementamos medidas rigorosas para proteger suas informações contra acesso não autorizado.
        5. Seus Direitos: De acordo com a LGPD, você pode solicitar o acesso, correção ou exclusão de seus dados a qualquer momento via e-mail.
      `
        },
        terms: {
            title: 'Termos de Uso',
            content: `
        Ao acessar o site do Estúdio Júlia Carvalho, você concorda em cumprir estes termos de serviço.
        
        1. Uso de Conteúdo: Todo material didático, fotos e vídeos são de propriedade intelectual exclusiva do Studio Júlia Carvalho.
        2. Inscrições: O preenchimento do formulário de inscrição não garante vaga imediata; nossa equipe entrará em contato para confirmação.
        3. Conduta: Você concorda em usar este site apenas para fins lícitos e informativos.
        4. Limitação de Responsabilidade: O Studio busca manter as informações sempre atualizadas, mas não se responsabiliza por eventuais erros técnicos temporários.
        5. Jurisdição: Estes termos são regidos pelas leis brasileiras.
      `
        }
    };

    return (
        <>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
                        className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:max-w-md z-[100]"
                    >
                        <div className="bg-white/80 backdrop-blur-xl border border-border/50 p-6 rounded-[2rem] shadow-2xl shadow-black/10">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                                    <Shield className="w-6 h-6 text-accent" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-display text-xl text-text-primary mb-2 italic">Sua privacidade importa</h3>
                                    <p className="text-text-secondary text-xs leading-relaxed mb-6 opacity-80">
                                        Utilizamos cookies para personalizar sua experiência e analisar nosso tráfego conforme a LGPD. Ao continuar, você concorda com nossas políticas.
                                    </p>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-4 mb-2">
                                            <button
                                                onClick={() => { setActivePolicy('privacy'); setShowPolicies(true); }}
                                                className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest hover:text-accent transition-colors"
                                            >
                                                Privacidade
                                            </button>
                                            <div className="w-1 h-1 rounded-full bg-text-tertiary/30" />
                                            <button
                                                onClick={() => { setActivePolicy('terms'); setShowPolicies(true); }}
                                                className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest hover:text-accent transition-colors"
                                            >
                                                Termos
                                            </button>
                                        </div>

                                        <button
                                            onClick={handleAccept}
                                            className="w-full h-12 bg-text-primary text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95"
                                        >
                                            Aceitar e Continuar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Policies Modal / Drawer (Full Screen on Mobile, Side Drawer on Desktop) */}
            <AnimatePresence>
                {showPolicies && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-end p-0 md:p-6 lg:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPolicies(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.6, ease: [0.21, 0.45, 0.32, 0.9] }}
                            className="relative w-full md:w-[600px] h-full bg-white md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
                        >
                            <div className="p-8 md:p-12 border-b border-border/50 flex items-center justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-2 block">Informações Legais</span>
                                    <h2 className="font-display text-4xl italic text-text-primary">
                                        {activePolicy ? policies[activePolicy].title : 'Políticas'}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setShowPolicies(false)}
                                    className="w-12 h-12 rounded-2xl bg-base border border-border/50 flex items-center justify-center hover:bg-white hover:border-accent/30 transition-all group"
                                >
                                    <X className="w-5 h-5 text-text-tertiary group-hover:text-accent transition-colors" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                                <div className="prose prose-sm max-w-none">
                                    <div className="space-y-8">
                                        {activePolicy ? (
                                            <div className="whitespace-pre-line text-text-secondary font-light leading-relaxed text-lg">
                                                {policies[activePolicy].content}
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <button
                                                    onClick={() => setActivePolicy('privacy')}
                                                    className="w-full flex items-center justify-between p-6 rounded-2xl border border-border/50 hover:border-accent/30 hover:bg-accent/[0.02] transition-all group"
                                                >
                                                    <span className="font-display text-2xl italic text-text-primary">Política de Privacidade</span>
                                                    <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                                </button>
                                                <button
                                                    onClick={() => setActivePolicy('terms')}
                                                    className="w-full flex items-center justify-between p-6 rounded-2xl border border-border/50 hover:border-accent/30 hover:bg-accent/[0.02] transition-all group"
                                                >
                                                    <span className="font-display text-2xl italic text-text-primary">Termos de Uso</span>
                                                    <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-12 border-t border-border/50 bg-base/50">
                                <p className="text-[10px] text-text-tertiary uppercase tracking-widest font-medium mb-1 text-center">
                                    Estúdio Júlia Carvalho • CNPJ 12.345.678/0001-90
                                </p>
                                <p className="text-[10px] text-text-tertiary opacity-60 text-center">
                                    Última atualização: Janeiro de 2026
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CookieConsent;
