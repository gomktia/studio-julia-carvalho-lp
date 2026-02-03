import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import CourseFormDialog from './CourseFormDialog';

interface Course {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration: string | null;
  category: string | null;
  image: string | null;
  features: string[] | null;
  active: boolean;
}

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erro ao carregar cursos');
    } else {
      setCourses(data || []);
    }
    setIsLoading(false);
  };

  const handleCreate = () => {
    setEditingCourse(null);
    setDialogOpen(true);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este curso?')) return;

    const { error } = await supabase.from('courses').delete().eq('id', id);

    if (error) {
      toast.error('Erro ao excluir curso');
    } else {
      toast.success('Curso excluído com sucesso');
      fetchCourses();
    }
  };

  const handleSave = () => {
    setDialogOpen(false);
    fetchCourses();
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
        <h2 className="text-xl font-semibold text-gray-900">Gerenciar Cursos</h2>
        <Button onClick={handleCreate} className="bg-rose-500 hover:bg-rose-600">
          <Plus className="w-4 h-4 mr-2" />
          Novo Curso
        </Button>
      </div>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            Nenhum curso cadastrado. Clique em "Novo Curso" para adicionar.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {course.image && (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        {!course.active && (
                          <span className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded">
                            Inativo
                          </span>
                        )}
                      </div>
                      {course.category && (
                        <span className="text-sm text-rose-600">{course.category}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(course)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(course.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Descrição:</span>
                    <p className="line-clamp-2">{course.description || '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Preço:</span>
                    <p className="text-rose-600 font-bold">R$ {course.price}</p>
                    <span className="text-gray-500">Duração:</span>
                    <p>{course.duration || '-'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Benefícios:</span>
                    <p>{course.features?.length || 0} itens</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CourseFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        course={editingCourse}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminCourses;
