import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show an elegant loading spinner while silent session refresh is checking authentication
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 shadow-sm border border-teal-100 animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
        </div>
        <p className="text-sm font-semibold text-slate-700">Verifying session...</p>
        <p className="text-xs text-slate-400 mt-1">Please wait a moment while we load your patient portal.</p>
      </div>
    );
  }

  // If not authenticated, redirect to login while preserving the attempted destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
