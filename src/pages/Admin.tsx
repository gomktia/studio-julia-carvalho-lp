import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, Package, GraduationCap, CalendarDays, Scissors } from 'lucide-react';
import AdminCombos from '@/components/admin/AdminCombos';
import AdminCourses from '@/components/admin/AdminCourses';
import AdminAppointments from '@/components/admin/AdminAppointments';
import AdminServices from '@/components/admin/AdminServices';

const Admin = () => {
  const { user, isAdmin, isLoading, signOut } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="text-sm text-gray-600 hover:text-rose-600">
                Ver site →
              </a>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Agendamentos
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              Serviços
            </TabsTrigger>
            <TabsTrigger value="combos" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Combos
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Cursos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <AdminAppointments />
          </TabsContent>

          <TabsContent value="services">
            <AdminServices />
          </TabsContent>

          <TabsContent value="combos">
            <AdminCombos />
          </TabsContent>

          <TabsContent value="courses">
            <AdminCourses />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
