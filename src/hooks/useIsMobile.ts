import { useEffect, useState } from "react";

/**
 * Hook customizado para detectar se o dispositivo é mobile
 * Retorna true para mobile (< 1024px) e false para desktop (>= 1024px)
 */
export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState<boolean>(() => {
        // Verifica se está no cliente (não no servidor)
        if (typeof window === "undefined") return false;
        return window.matchMedia("(max-width: 1023px)").matches;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1023px)");

        const handleChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };

        // Adiciona o listener
        mediaQuery.addEventListener("change", handleChange);

        // Define o valor inicial
        setIsMobile(mediaQuery.matches);

        // Cleanup
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return isMobile;
}
