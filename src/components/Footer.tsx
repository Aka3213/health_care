import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="gradient-primary text-primary-foreground py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Heart className="h-6 w-6" />
            <span className="text-lg font-semibold">HealthCare Plus</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-primary-foreground/80">
              © 2024 HealthCare Plus. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-sm mt-1">
              Your Health, Our Priority
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}