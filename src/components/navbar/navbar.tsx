import { Button } from '@/components/ui/button';

interface NavbarProps {
    user: {
        name: string;
        role: string;
    }
    onLogout?: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
    return (
        <header className="bg-sidebar shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    <div className="flex items-center">
                        <h2 className="text-2xl font-bold text-primary select-none">
                            Medical Vide
                        </h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size={'lg'} onClick={onLogout}>
                            Sair
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
