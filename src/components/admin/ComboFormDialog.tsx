import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';

interface ComboService {
  id?: string;
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

interface ComboFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  combo: Combo | null;
  onSave: () => void;
}

const ComboFormDialog = ({ open, onOpenChange, combo, onSave }: ComboFormDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    campaign: '',
    campaign_color: 'pink',
    description: '',
    original_price: 0,
    combo_price: 0,
    discount: '',
    ideal: '',
    active: true,
  });
  const [services, setServices] = useState<ComboService[]>([{ name: '', price: 0 }]);

  useEffect(() => {
    if (combo) {
      setFormData({
        title: combo.title,
        campaign: combo.campaign || '',
        campaign_color: combo.campaign_color || 'pink',
        description: combo.description || '',
        original_price: combo.original_price,
        combo_price: combo.combo_price,
        discount: combo.discount || '',
        ideal: combo.ideal || '',
        active: combo.active,
      });
      setServices(combo.services.length > 0 ? combo.services : [{ name: '', price: 0 }]);
    } else {
      setFormData({
        title: '',
        campaign: '',
        campaign_color: 'pink',
        description: '',
        original_price: 0,
        combo_price: 0,
        discount: '',
        ideal: '',
        active: true,
      });
      setServices([{ name: '', price: 0 }]);
    }
  }, [combo, open]);

  const handleAddService = () => {
    setServices([...services, { name: '', price: 0 }]);
  };

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index: number, field: 'name' | 'price', value: string | number) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validServices = services.filter((s) => s.name.trim() !== '');

      if (combo) {
        // Update combo
        const { error: comboError } = await supabase
          .from('combos')
          .update({
            title: formData.title,
            campaign: formData.campaign || null,
            campaign_color: formData.campaign_color || null,
            description: formData.description || null,
            original_price: formData.original_price,
            combo_price: formData.combo_price,
            discount: formData.discount || null,
            ideal: formData.ideal || null,
            active: formData.active,
          })
          .eq('id', combo.id);

        if (comboError) throw comboError;

        // Delete old services and insert new ones
        await supabase.from('combo_services').delete().eq('combo_id', combo.id);

        if (validServices.length > 0) {
          const { error: servicesError } = await supabase.from('combo_services').insert(
            validServices.map((s) => ({
              combo_id: combo.id,
              name: s.name,
              price: s.price,
            }))
          );
          if (servicesError) throw servicesError;
        }

        toast.success('Combo atualizado com sucesso');
      } else {
        // Create combo
        const { data: newCombo, error: comboError } = await supabase
          .from('combos')
          .insert({
            title: formData.title,
            campaign: formData.campaign || null,
            campaign_color: formData.campaign_color || null,
            description: formData.description || null,
            original_price: formData.original_price,
            combo_price: formData.combo_price,
            discount: formData.discount || null,
            ideal: formData.ideal || null,
            active: formData.active,
          })
          .select()
          .single();

        if (comboError) throw comboError;

        if (validServices.length > 0) {
          const { error: servicesError } = await supabase.from('combo_services').insert(
            validServices.map((s) => ({
              combo_id: newCombo.id,
              name: s.name,
              price: s.price,
            }))
          );
          if (servicesError) throw servicesError;
        }

        toast.success('Combo criado com sucesso');
      }

      onSave();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao salvar combo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{combo ? 'Editar Combo' : 'Novo Combo'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign">Campanha</Label>
              <Input
                id="campaign"
                value={formData.campaign}
                onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
                placeholder="Ex: Outubro Rosa"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>

          {/* Services */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Serviços Inclusos</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddService}>
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>
            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Nome do serviço"
                  value={service.name}
                  onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Preço"
                  value={service.price || ''}
                  onChange={(e) => handleServiceChange(index, 'price', Number(e.target.value))}
                  className="w-28"
                />
                {services.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveService(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Prices */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="original_price">Preço Original *</Label>
              <Input
                id="original_price"
                type="number"
                value={formData.original_price || ''}
                onChange={(e) => setFormData({ ...formData, original_price: Number(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="combo_price">Preço do Combo *</Label>
              <Input
                id="combo_price"
                type="number"
                value={formData.combo_price || ''}
                onChange={(e) => setFormData({ ...formData, combo_price: Number(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Desconto</Label>
              <Input
                id="discount"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                placeholder="Ex: 20% OFF"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ideal">Ideal para</Label>
            <Input
              id="ideal"
              value={formData.ideal}
              onChange={(e) => setFormData({ ...formData, ideal: e.target.value })}
              placeholder="Ex: Quem busca um visual sofisticado"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
            <Label htmlFor="active">Combo ativo (visível no site)</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-rose-500 hover:bg-rose-600">
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ComboFormDialog;
