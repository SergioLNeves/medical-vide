// Importa tipos e funções do Next.js para criar o middleware
import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from 'next/server';

// Rotas públicas: podem ser acessadas sem autenticação
// Se o usuário estiver autenticado e acessar uma dessas rotas, será redirecionado
const publicRoutes = [
  { path: '/', whenAuthenticated: 'redirect' },
  { path: '/register', whenAuthenticated: 'redirect' },
  { path: '/forgot-password', whenAuthenticated: 'redirect' },
  { path: '/reset-password', whenAuthenticated: 'allow' }, // Permite acesso mesmo autenticado
] as const;

// Página para onde o usuário será redirecionado se não estiver autenticado
const REDIRECT_WHEN_NOT_AUTHENTICATED = '/';

// Função principal do middleware
export function middleware(request: NextRequest) {
  // Extrai o caminho da requisição
  const path = request.nextUrl.pathname;
  // Verifica se o caminho solicitado é uma rota pública
  const publicRoute = publicRoutes.find((route) => route.path === path);
  // Tenta obter o cookie de autenticação
  const authToken = request.cookies.get('current_user');

  // Caso 1: Usuário não autenticado acessando rota pública
  if (!authToken && publicRoute) {
    // Permite acesso normalmente
    return NextResponse.next();
  }

  // Caso 2: Usuário não autenticado tentando acessar rota privada
  // Redireciona para a página inicial (login)
  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
    return NextResponse.redirect(redirectUrl);
  }

  // Caso 3: Usuário autenticado acessando rota pública
  if (authToken && publicRoute) {
    // Se configurado para redirecionar quando autenticado
    if (publicRoute.whenAuthenticated === 'redirect') {
      try {
        // Tenta extrair o papel do usuário do cookie
        const userRole = JSON.parse(authToken.value);
        const redirectUrl = request.nextUrl.clone();

        // Se não houver papel definido, apenas segue e loga erro
        if (!userRole || !userRole.role) {
          console.error('User role is not defined in the auth token');
          return NextResponse.next();
        }

        // Redireciona para a rota do papel do usuário
        redirectUrl.pathname = `/${userRole.role}`;
        return NextResponse.redirect(redirectUrl);
      } catch (error) {
        // Se o cookie estiver inválido, remove ele e permite seguir
        console.error('Error parsing auth token:', error);
        const response = NextResponse.next();
        response.cookies.delete('current_user');
        return response;
      }
    }

    // Se configurado para permitir acesso mesmo autenticado
    if (publicRoute.whenAuthenticated === 'allow') {
      return NextResponse.next();
    }
  }

  // Caso 4: Usuário autenticado acessando rota privada
  // Permite acesso normalmente
  if (authToken && !publicRoute) {
    // Aqui poderia ser feita uma verificação de expiração do token
    return NextResponse.next();
  }

  // Caso padrão: permite seguir
  return NextResponse.next();
}

// Configuração do middleware para Next.js
// Define quais rotas o middleware deve interceptar
// Documentação: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Intercepta todas as rotas exceto as que começam com:
     * - api (rotas de API)
     * - _next/static (arquivos estáticos)
     * - _next/image (arquivos de otimização de imagem)
     * - favicon.ico, sitemap.xml, robots.txt (arquivos de metadados)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
