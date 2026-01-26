import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import ComboFormDialog from './ComboFormDialog';

interface ComboService {
  id: string;
  name: string;
  price: number;
}

interface Combo {
  id: string;
  title: string;
  campaign: string | null;
  campaign_color: string | null;
  description: string | null;
  original_price: number;
  combo_price: number;
  discount: string | null;
  ideal: string | null;
  active: boolean;
  services: ComboService[];
}

const AdminCombos = () => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState<Combo | null>(null);

  useEffect(() => {
    fetchCombos();
  }, []);

  const fetchCombos = async () => {
    setIsLoading(true);
    const { data: combosData, error } = await supabase
      .from('combos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erro ao carregar combos');
      setIsLoading(false);
      return;
    }

    // Fetch services for each combo
    const combosWithServices = await Promise.all(
      (combosData || []).map(async (combo) => {
        const { data: services } = await supabase
          .from('combo_services')
          .select('*')
          .eq('combo_id', combo.id);
        return { ...combo, services: services || [] };
      })
    );

    setCombos(combosWithServices);
    setIsLoading(false);
  };

  const handleCreate = () => {
    setEditingCombo(null);
    setDialogOpen(true);
  };

  const handleEdit = (combo: Combo) => {
    setEditingCombo(combo);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este combo?')) return;

    // Delete services first
    await supabase.from('combo_services').delete().eq('combo_id', id);
    
    const { error } = await supabase.from('combos').delete().eq('id', id);

    if (error) {
      toast.error('Erro ao excluir combo');
    } else {
      toast.success('Combo excluído com sucesso');
      fetchCombos();
    }
  };

  const handleSave = () => {
    setDialogOpen(false);
    fetchCombos();
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
        <h2 className="text-xl font-semibold text-gray-900">Gerenciar Combos</h2>
        <Button onClick={handleCreate} className="bg-rose-500 hover:bg-rose-600">
          <Plus className="w-4 h-4 mr-2" />
          Novo Combo
        </Button>
      </div>

      {combos.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            Nenhum combo cadastrado. Clique em "Novo Combo" para adicionar.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {combos.map((combo) => (
            <Card key={combo.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{combo.title}</CardTitle>
                      {!combo.active && (
                        <span className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded">
                          Inativo
                        </span>
                      )}
                    </div>
                    {combo.campaign && (
                      <span className="text-sm text-rose-600">{combo.campaign}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(combo)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(combo.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Serviços:</span>
                    <ul className="mt-1">
                      {combo.services.map((s) => (
                        <li key={s.id}>
                          {s.name} - R$ {s.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-gray-500">Preços:</span>
                    <p className="line-through text-gray-400">R$ {combo.original_price}</p>
                    <p className="text-rose-600 font-bold">R$ {combo.combo_price}</p>
                    {combo.discount && <p className="text-green-600">{combo.discount}</p>}
                  </div>
                  <div>
                    <span className="text-gray-500">Ideal para:</span>
                    <p>{combo.ideal || '-'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ComboFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        combo={editingCombo}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminCombos;
