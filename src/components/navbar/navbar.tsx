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
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Bem-vindo, {user.name}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {user.role}
                        </span>
                        <Button variant="outline" onClick={onLogout}>
                            Sair
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
