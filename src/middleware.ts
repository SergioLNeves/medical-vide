import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from 'next/server';

const publicRoutes = [
  { path: '/', whenAuthenticated: 'redirect' },
  { path: '/register', whenAuthenticated: 'redirect' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get('current_user');

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  // Verifica se o usuário está autenticado e se a rota é pública
  // Se não estiver autenticado e a rota não for pública, redireciona para a página de login
  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;

    return NextResponse.redirect(redirectUrl);
  }

  //Verifica se o usuário está autenticado e se a rota é pública
  // Se estiver autenticado e a rota for pública, redireciona para a página
  if (authToken && publicRoute?.whenAuthenticated === 'redirect') {
    const userRole = (authToken.value = JSON.parse(authToken.value));
    const redirectUrl = request.nextUrl.clone();

    if (!userRole || !userRole.role) {
      return console.error('User role is not defined in the auth token');
    }

    redirectUrl.pathname = `/${userRole.role}`;
    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    // Aqui eu poderia verificar se a data de expiração do token é válida

    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configuração do middleware doc Next.js
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
