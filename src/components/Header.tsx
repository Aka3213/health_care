import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Heart, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const userProfile = user?.user_metadata;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="gradient-primary shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary-foreground">
            <Heart className="h-8 w-8" />
            <span className="text-xl font-bold">HealthCare Plus</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-primary-foreground hover:text-primary-foreground/80 transition-colors ${
                isActive('/') ? 'font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`text-primary-foreground hover:text-primary-foreground/80 transition-colors ${
                isActive('/services') ? 'font-semibold' : ''
              }`}
            >
              Services
            </Link>
            <Link
              to="/doctors"
              className={`text-primary-foreground hover:text-primary-foreground/80 transition-colors ${
                isActive('/doctors') ? 'font-semibold' : ''
              }`}
            >
              Doctors
            </Link>
            {user && (
              <Link
                to="/my-appointments"
                className={`text-primary-foreground hover:text-primary-foreground/80 transition-colors ${
                  isActive('/my-appointments') ? 'font-semibold' : ''
                }`}
              >
                My Appointments
              </Link>
            )}
            <Link
              to="/contact"
              className={`text-primary-foreground hover:text-primary-foreground/80 transition-colors ${
                isActive('/contact') ? 'font-semibold' : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white/20 border-white/30 text-primary-foreground hover:bg-white/30">
                    <User className="h-4 w-4 mr-2" />
                    {userProfile?.full_name || user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background">
                  <DropdownMenuItem onClick={() => signOut()} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="bg-white/20 border-white/30 text-primary-foreground hover:bg-white/30">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-accent hover:bg-accent/90">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}