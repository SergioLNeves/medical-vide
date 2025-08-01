import ModeToggle from '@/components/mode-toggle.tsx/mode-toggle';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onLogout?: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  return (
    <header className="bg-sidebar shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center">
            <h2 className="text-primary text-2xl font-bold select-none">
              Medical Vide
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button variant="outline" size={'lg'} onClick={onLogout}>
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
