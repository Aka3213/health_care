import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { UserCheck, Calendar } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image_url: string;
}

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setDoctors(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading doctors",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollToAppointments = () => {
    window.location.href = '/#appointments';
  };

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Expert Doctors</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our team of experienced physicians and specialists are committed to providing you with the best possible care.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="shadow-card">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4 animate-pulse"></div>
                    <div className="h-6 bg-muted rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4 mx-auto"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
                    </div>
                    <div className="h-10 bg-muted rounded animate-pulse"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="shadow-card hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <img
                        src={doctor.image_url}
                        alt={doctor.name}
                        className="w-full h-full object-cover rounded-full border-4 border-primary/20"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <CardTitle className="text-xl">{doctor.name}</CardTitle>
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <UserCheck className="h-4 w-4" />
                      <span className="font-medium">{doctor.specialty}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {doctor.bio}
                    </p>
                    {user ? (
                      <Button 
                        onClick={scrollToAppointments}
                        className="w-full"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Button>
                    ) : (
                      <Link to="/login" className="block">
                        <Button className="w-full">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Appointment
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && doctors.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Doctors Available</h3>
              <p className="text-muted-foreground">
                Please check back later for our medical professionals.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}