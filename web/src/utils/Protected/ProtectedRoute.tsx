
import { useSession } from '@/hooks/use-session';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    const { session } = useSession();

    if (!session) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
};
