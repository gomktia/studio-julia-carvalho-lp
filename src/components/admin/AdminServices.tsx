import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Clock, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import ServiceFormDialog from './ServiceFormDialog';

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  category: string | null;
  active: boolean;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name');

    if (error) {
      toast.error('Erro ao carregar serviços');
    } else {
      setServices(data || []);
    }
    setIsLoading(false);
  };

  const handleCreate = () => {
    setEditingService(null);
    setDialogOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erro ao excluir serviço');
    } else {
      toast.success('Serviço excluído!');
      fetchServices();
    }
  };

  const handleSave = () => {
    setDialogOpen(false);
    fetchServices();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Gerenciar Serviços</h2>
        <Button onClick={handleCreate} className="bg-rose-500 hover:bg-rose-600">
          <Plus className="w-4 h-4 mr-2" />
          Novo Serviço
        </Button>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            Nenhum serviço cadastrado.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className={!service.active ? 'opacity-60' : ''}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    {service.category && (
                      <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                        {service.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${service.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {service.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {service.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                )}
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-rose-600 font-semibold">
                    <DollarSign className="w-4 h-4" />
                    R$ {service.price.toFixed(2)}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    {service.duration_minutes} min
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                    <Pencil className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ServiceFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        service={editingService}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminServices;
