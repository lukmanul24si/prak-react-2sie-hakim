import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Loading from '@/components/Loading'

export default function ProtectedRoute({ children, role }) {
    const { user, profile, loading } = useAuth()

    if (loading) {
        return <Loading />
    }

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // Role-based guard
    if (role && profile?.role !== role) {
        // If member tries to access admin route
        if (role === 'admin') {
            return <Navigate to="/" replace />
        }
        // If admin tries to access member-only route, allow (admin has more access)
        if (role === 'member' && profile?.role === 'admin') {
            return children
        }
        return <Navigate to="/" replace />
    }

    return children
}
