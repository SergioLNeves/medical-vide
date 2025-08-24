'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { ArrowLeft, Lock, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { checkEmailExists, resetUserPassword } from '@/lib/auth';

export default function ResetPasswordPage() {
  // Schema de validação para redefinição de senha usando Zod
  const resetPasswordSchema = z
    .object({
      password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
      confirmPassword: z.string().min(1, 'Por favor, confirme sua senha'),
    })
    // Validação customizada para confirmar se as senhas coincidem
    .refine((data) => data.password === data.confirmPassword, {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    });

  // Estados do formulário e controle de interface
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false); // Controla exibição da tela de sucesso
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados de erro para cada campo
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  // Verifica e valida o email passado via query params
  useEffect(() => {
    const emailParam = searchParams.get('email');

    if (!emailParam) {
      setEmailError('Link inválido: email não encontrado');
      return;
    }

    // Valida formato do email
    const emailSchema = z.string().email();
    const emailValidation = emailSchema.safeParse(emailParam);

    if (!emailValidation.success) {
      setEmailError('Link inválido: formato de email inválido');
      return;
    }

    // Verifica se o email existe no sistema (simulação)
    if (!checkEmailExists(emailParam)) {
      setEmailError('Email não encontrado no sistema');
      return;
    }

    setEmail(emailParam);
  }, [searchParams]);

  // Função que processa a redefinição de senha
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Limpa erros anteriores
    setPasswordError('');
    setConfirmPasswordError('');

    try {
      const formData = { password, confirmPassword };
      // Valida os dados do formulário usando o schema Zod
      const result = resetPasswordSchema.safeParse(formData);

      if (!result.success) {
        result.error.errors.forEach((err) => {
          if (err.path[0] === 'password') setPasswordError(err.message);
          if (err.path[0] === 'confirmPassword') setConfirmPasswordError(err.message);
        });
        return;
      }

      // Simula redefinição da senha no backend
      console.log('Redefinindo senha para email:', email);

      // Atualiza a senha no MockDatabase
      const success = resetUserPassword(email, password);

      if (!success) {
        setPasswordError('Erro ao redefinir senha. Tente novamente.');
        return;
      }

      // Simula sucesso e muda para tela de confirmação
      setPasswordChanged(true);
      toast.success('Senha redefinida com sucesso!');

    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      setPasswordError('Erro interno do sistema');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para voltar à página de login
  const handleBackToLogin = () => {
    router.push('/');
  };

  // Tela de sucesso - exibida após redefinição bem-sucedida
  if (passwordChanged) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            {/* Ícone de sucesso */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-primary text-xl font-bold">
              Senha Redefinida!
            </CardTitle>
            <CardDescription>
              Sua senha foi alterada com sucesso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Informações sobre o sucesso */}
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <div className="flex items-start">
                <Lock className="mt-0.5 mr-3 h-5 w-5 text-green-600 dark:text-green-400" />
                <div className="text-sm">
                  <p className="font-medium text-green-800 dark:text-green-300">
                    Nova senha configurada
                  </p>
                  <p className="mt-1 text-green-700 dark:text-green-400">
                    Sua senha para{' '}
                    <span className="font-medium">{email}</span>
                    {' '}foi alterada com sucesso.
                  </p>
                </div>
              </div>
            </div>

            {/* Botão para fazer login */}
            <div className="space-y-4 text-center">
              <p className="text-muted-foreground text-sm">
                Agora você pode fazer login com sua nova senha.
              </p>
              <Button
                onClick={handleBackToLogin}
                className="w-full"
              >
                Fazer Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Se há erro com o email (link inválido)
  if (emailError) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-primary text-xl font-bold">
              Link Inválido
            </CardTitle>
            <CardDescription>
              Este link de recuperação não é válido
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
              <div className="text-sm">
                <p className="font-medium text-red-800 dark:text-red-300">
                  {emailError}
                </p>
                <p className="mt-1 text-red-700 dark:text-red-400">
                  Por favor, solicite um novo link de recuperação.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => router.push('/forgot-password')}
                variant="outline"
                className="w-full"
              >
                Solicitar Novo Link
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
          </CardContent>
        </Card>
      </div>
    );
  }

  // Formulário principal de redefinição de senha
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
            Redefinir Senha
          </CardTitle>
          <CardDescription>
            Digite sua nova senha para a conta {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Campo de nova senha */}
            <div className="space-y-2">
              <Label htmlFor="password">Nova Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError(''); // Limpa erro ao digitar
                  }}
                  placeholder="Digite sua nova senha (mín. 6 caracteres)"
                  disabled={isLoading}
                  className={`text-primary pr-10 ${passwordError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordError && (
                <p className="mt-1 text-sm text-red-500">{passwordError}</p>
              )}
            </div>

            {/* Campo de confirmação de senha */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (confirmPasswordError) setConfirmPasswordError(''); // Limpa erro ao digitar
                  }}
                  placeholder="Confirme sua nova senha"
                  disabled={isLoading}
                  className={`text-primary pr-10 ${confirmPasswordError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {confirmPasswordError && (
                <p className="mt-1 text-sm text-red-500">{confirmPasswordError}</p>
              )}
            </div>

            {/* Botão de envio com estado de loading */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? 'Redefinindo...' : 'Redefinir Senha'}
            </Button>
          </form>

          {/* Informação sobre segurança */}
          <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <div className="flex items-start">
              <Lock className="mt-0.5 mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
              <div className="text-xs text-blue-700 dark:text-blue-400">
                <p className="font-medium">Dica de segurança:</p>
                <p>Use uma senha forte com pelo menos 6 caracteres.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
