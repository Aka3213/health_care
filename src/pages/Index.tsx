import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppointmentForm } from '@/components/AppointmentForm';
import { useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/Layout';
import { Users, Clock, Award, Heart } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const scrollToAppointments = () => {
    const element = document.getElementById('appointments');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Health, Our Priority
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Providing exceptional healthcare services with compassion, expertise, and modern technology
          </p>
          {user ? (
            <Button 
              onClick={scrollToAppointments}
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-lg px-8 py-4"
            >
              Book Appointment Now
            </Button>
          ) : (
            <Link to="/login">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-4">
                Book Appointment Now
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Expert Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team of experienced physicians and specialists are dedicated to providing the highest quality care.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Quick Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Easy online appointment booking system that saves your time and ensures you get the care you need.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Quality Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  State-of-the-art facilities and personalized treatment plans tailored to your unique health needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Appointment Form Section */}
      {user ? (
        <section id="appointments" className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <AppointmentForm />
          </div>
        </section>
      ) : (
        <section id="appointments" className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Book an Appointment?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Please log in to your account to book an appointment with our expert doctors.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="px-8 py-4">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="px-8 py-4">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;
