/**
 * useAuth — Convenience re-export of the AuthContext hook
 *
 * Provides everything from AuthContext with additional derived helpers:
 *  - isAuthenticated : boolean — true if user is logged in with a valid token
 *  - isPatient       : boolean — true if role === 'patient'
 *  - isAdmin         : boolean — true if role === 'admin'
 *
 * Usage:
 *   import { useAuth } from '../hooks/useAuth';
 *   const { user, isAuthenticated, login, logout } = useAuth();
 */

export { useAuth } from '../context/AuthContext.jsx';
