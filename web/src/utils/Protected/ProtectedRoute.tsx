import { useSession } from '@/hooks/use-session';
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { api } from '@/axios';
import { useToast } from '@/hooks/use-toast';

export const ProtectedRoute = () => {
    const { session, token, logout } = useSession();
    const { toast } = useToast()

    useEffect(() => {
        if (token) {
            api.get('/auth/profile')
                .catch(() => {
                    toast({
                        title: "Token Expirado",
                        description: "Faça o login novamente na aplicação",
                        duration: 2000,
                        variant: "destructive"
                    });
                    logout()
                }
                )
        }
    }, []);

    if (!session || !token) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
};
