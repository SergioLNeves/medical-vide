'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { checkEmailExists } from '@/lib/auth';

export default function ForgotPasswordPage() {

  // Schema de validação para o campo de email usando Zod
  const forgotSchema = z.object({
    email: z
      .string()
      .min(1, 'Por favor, insira seu email')
      .email('Por favor, insira um email válido'),
  });

  // Estados do formulário e controle de interface
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // Controla exibição da tela de confirmação
  const [emailError, setEmailError] = useState('');

  const router = useRouter();

  // Função que processa o envio do formulário de recuperação de senha
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailError('');

    try {
      // Valida o formato do email usando Zod
      const result = forgotSchema.safeParse({ email });
      if (!result.success) {
        result.error.errors.forEach((err) => {
          if (err.path[0] === 'email') setEmailError(err.message);
        });
        return;
      }

      // Verifica se o email existe no sistema antes de "enviar"
      if (!checkEmailExists(email)) {
        setEmailError('Email não encontrado no sistema');
        return;
      }

      // Se chegou aqui, email existe - simula envio e muda para tela de confirmação
      setEmailSent(true);
      toast.success('Email de recuperação enviado com sucesso!');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para voltar à página de login
  const handleBackToLogin = () => {
    router.push('/');
  };

  // Função para reenviar email (volta ao formulário inicial)
  const handleResendEmail = () => {
    setEmailSent(false);
    setEmail('');
  };

  // Tela de confirmação - exibida após envio do email
  if (emailSent) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            {/* Ícone de sucesso */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-primary text-xl font-bold">
              Email Enviado!
            </CardTitle>
            <CardDescription>
              Enviamos um link de recuperação para seu email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Informações sobre o email enviado */}
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <div className="flex items-start">
                <Mail className="mt-0.5 mr-3 h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800 dark:text-blue-300">
                    Verifique sua caixa de entrada
                  </p>
                  <p className="mt-1 text-blue-700 dark:text-blue-400">
                    Enviamos um link de recuperação para{' '}
                    <span className="font-medium">{email}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Opções de ação após envio */}
            <div className="space-y-4 text-center">
              <p className="text-muted-foreground text-sm">
                Não recebeu o email? Verifique sua pasta de spam ou tente
                novamente.
              </p>

              {/* Botão para testar o fluxo de reset (apenas para desenvolvimento) */}
              <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
                <div className="text-xs text-yellow-700 dark:text-yellow-400">
                  <p className="font-medium mb-2">🔧 Modo Teste (Mock):</p>
                  <Button
                    onClick={() => router.push(`/reset-password?email=${encodeURIComponent(email)}`)}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                  >
                    Simular Clique no Link do Email
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleResendEmail}
                  variant="outline"
                  className="w-full"
                >
                  Reenviar Email
                </Button>
                <Button
                  onClick={handleBackToLogin}
                  variant="ghost"
                  className="w-full"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar ao Login
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Formulário principal de recuperação de senha
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        {/* Botão para voltar ao login */}
        <Button
          onClick={handleBackToLogin}
          variant="ghost"
          className="text-muted-foreground hover:text-primary self-start"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao login
        </Button>
        <CardHeader>
          <CardTitle className="text-primary text-xl font-bold">
            Esqueceu sua senha?
          </CardTitle>
          <CardDescription>
            Digite seu email e enviaremos um link para redefinir sua senha
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Campo de email com validação */}
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

            {/* Botão de envio com estado de loading */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
            </Button>
          </form>

          {/* Link para voltar ao login */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Lembrou da senha?{' '}
              <Button
                variant="link"
                className="text-primary h-auto p-0"
                onClick={handleBackToLogin}
              >
                Fazer login
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
