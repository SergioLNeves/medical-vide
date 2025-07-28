'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { checkEmailExists, validateLogin, initializeUsers } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    // Inicializa os usuários mock no localStorage
    initializeUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Limpar erros anteriores
    setEmailError('');
    setPasswordError('');

    try {
      if (!email.trim()) {
        setEmailError('Por favor, insira seu email');
        return;
      }

      if (!password.trim()) {
        setPasswordError('Por favor, insira sua senha');
        return;
      }

      if (!checkEmailExists(email)) {
        setEmailError('Email não encontrado');
        return;
      }

      const user = validateLogin(email, password);
      if (user) {
        toast.success(`Bem-vindo(a), ${user.name}!`);
        login(user);
        router.push('/');
      } else {
        setPasswordError('Senha incorreta. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-primary text-xl font-bold">
            Entrar no Medical Vide
          </CardTitle>
          <CardDescription>
            Digite seu email e senha para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(''); // Limpa erro ao digitar
                }}
                placeholder="seu@email.com"
                disabled={isLoading}
                className={`text-primary ${emailError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-500">{emailError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError(''); // Limpa erro ao digitar
                }}
                placeholder="Digite sua senha"
                disabled={isLoading}
                className={`text-primary ${passwordError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-500">{passwordError}</p>
              )}
              <div className="flex justify-end">
                <Button variant={'link'} className="text-primary pr-0">
                  Esqueceu sua senha?
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="flex justify-end">
            <Button
              variant={'link'}
              className="text-primary pr-0"
              onClick={() => router.push('/register')}
            >
              Cadastre-se
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
