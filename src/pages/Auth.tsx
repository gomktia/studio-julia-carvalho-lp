import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        checkAdminAndRedirect(session.user.id);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        checkAdminAndRedirect(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminAndRedirect = async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (data) {
      navigate('/admin');
    } else {
      toast.error('Acesso negado. Você não tem permissão de administrador.');
      await supabase.auth.signOut();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Email ou senha incorretos.');
        } else {
          toast.error(error.message);
        }
      }
    } catch (error) {
      toast.error('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Editorial Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] -ml-96 -mt-96" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-rose-50/50 rounded-full blur-[120px] -mr-64 -mb-64" />

        {/* Floating Brand Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
          <span className="font-display text-[30vw] italic leading-none whitespace-nowrap">Studio Ju</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="bg-white border border-border/50 p-12 md:p-16 rounded-[3.5rem] shadow-2xl shadow-black/[0.03] relative overflow-hidden">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/[0.02] rounded-bl-[5rem]" />

          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-3xl bg-accent/5 flex items-center justify-center mx-auto mb-8 border border-accent/10"
            >
              <Lock className="w-8 h-8 text-accent" />
            </motion.div>
            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-4 block">Acesso Restrito</span>
            <h1 className="font-display text-4xl text-text-primary mb-2 italic">Dashboard</h1>
            <p className="text-text-secondary text-sm font-light mt-4 italic opacity-70">Entre com suas credenciais de administrador</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold ml-1">E-mail Administrativo</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input
                    id="email"
                    type="email"
                    placeholder="exemplo@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-14 pr-6 rounded-2xl bg-base border border-border/50 focus:border-accent outline-none transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label htmlFor="password" className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold">Senha</label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-14 pr-14 rounded-2xl bg-base border border-border/50 focus:border-accent outline-none transition-all text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-accent transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-16 bg-text-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-accent/20 transition-all overflow-hidden relative group"
              disabled={isLoading}
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? 'Verificando...' : 'Acessar Painel'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </form>

          <div className="mt-12 text-center pt-8 border-t border-border/30">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-3 text-xs font-bold text-text-tertiary hover:text-accent uppercase tracking-widest transition-all group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Voltar para o site
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export default Auth;
