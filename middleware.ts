import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Rotas que precisam de autenticação
    const protectedRoutes = ['/dashboard']

    // Rotas que só devem ser acessadas sem autenticação (usuário deslogado)
    const authRoutes = ['/auth/login', '/auth/register']

    const { pathname } = request.nextUrl

    // Verifica se é uma rota protegida
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

    // Verifica se é uma rota de autenticação
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

    // Simula verificação de token (em uma aplicação real, você verificaria o JWT, aqui verifimos o cookie mockado)
    const currentUser = request.cookies.get('current_user')?.value

    // Se é uma rota protegida e não há usuário, redireciona para login
    if (isProtectedRoute && !currentUser) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // Se é uma rota de auth e há usuário, redireciona para dashboard
    if (isAuthRoute && currentUser) {
        try {
            const user = JSON.parse(currentUser);
            // Redireciona para a dashboard específica baseada na role
            return NextResponse.redirect(new URL(`/dashboard/${user.role}`, request.url))
        } catch {
            // Se não conseguir parsear o cookie, redireciona para dashboard geral
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
