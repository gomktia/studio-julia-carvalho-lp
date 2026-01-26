import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  category: string | null;
  active: boolean;
}

interface ServiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
  onSave: () => void;
}

const ServiceFormDialog = ({ open, onOpenChange, service, onSave }: ServiceFormDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration_minutes: '60',
    category: '',
    active: true
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description || '',
        price: service.price.toString(),
        duration_minutes: service.duration_minutes.toString(),
        category: service.category || '',
        active: service.active
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        duration_minutes: '60',
        category: '',
        active: true
      });
    }
  }, [service, open]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.price) {
      toast.error('Preencha nome e preço');
      return;
    }

    setIsLoading(true);

    const serviceData = {
      name: formData.name,
      description: formData.description || null,
      price: parseFloat(formData.price),
      duration_minutes: parseInt(formData.duration_minutes) || 60,
      category: formData.category || null,
      active: formData.active
    };

    let error;

    if (service) {
      const result = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', service.id);
      error = result.error;
    } else {
      const result = await supabase
        .from('services')
        .insert(serviceData);
      error = result.error;
    }

    setIsLoading(false);

    if (error) {
      toast.error('Erro ao salvar serviço');
    } else {
      toast.success(service ? 'Serviço atualizado!' : 'Serviço criado!');
      onSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{service ? 'Editar Serviço' : 'Novo Serviço'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nome *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Limpeza de Pele"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o serviço..."
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Preço (R$) *</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Duração (min)</Label>
              <Input
                type="number"
                min="15"
                step="15"
                value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                placeholder="60"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Input
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Ex: Facial, Corporal, Sobrancelhas"
            />
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Label>Serviço Ativo</Label>
            <Switch
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="bg-rose-500 hover:bg-rose-600"
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormDialog;
