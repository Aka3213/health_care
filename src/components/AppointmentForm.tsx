import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

interface Profile {
  full_name: string;
}

export function AppointmentForm() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadDoctors();
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadDoctors = async () => {
    const { data, error } = await supabase
      .from('doctors')
      .select('id, name, specialty')
      .order('name');
    
    if (error) {
      toast({
        title: "Error loading doctors",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setDoctors(data || []);
    }
  };

  const loadProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('user_id', user.id)
      .single();
    
    if (data) {
      setProfile(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);

    const { error } = await supabase
      .from('appointments')
      .insert({
        user_id: user.id,
        doctor_id: selectedDoctor,
        appointment_date: date,
        appointment_time: time,
        reason_for_visit: reason
      });

    if (error) {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setShowSuccess(true);
      // Reset form
      setSelectedDoctor('');
      setDate('');
      setTime('');
      setReason('');
    }
    
    setLoading(false);
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <>
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Book Your Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile?.full_name || user?.email || ''}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Select Doctor</Label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={minDate}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <Textarea
                id="reason"
                placeholder="Please describe your reason for the visit..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
              {loading ? "Booking..." : "Book Appointment"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="text-center">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <DialogTitle className="text-2xl">Success!</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground mb-6">
            Your appointment has been booked successfully. We'll contact you soon to confirm the details.
          </p>
          <Button onClick={() => setShowSuccess(false)} className="w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}