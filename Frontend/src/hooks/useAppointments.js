/**
 * useAppointments — Custom hook for appointment state management
 *
 * Provides:
 *  - appointments[]   : list of the current user's appointments
 *  - isLoading        : fetch in progress
 *  - error            : last error message string (null if none)
 *  - bookAppointment  : async function to book a new appointment
 *  - cancelAppointment: async function to cancel by id
 *  - refetch          : manually re-fetch appointments
 *
 * Usage:
 *   const { appointments, isLoading, error, bookAppointment, cancelAppointment } = useAppointments();
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { appointmentAPI } from '../services/api.js';

export function useAppointments() {
  const { isAuthenticated } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Fetch appointments ─────────────────────────────────────────────────────
  const fetchAppointments = useCallback(async () => {
    if (!isAuthenticated) {
      setAppointments([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await appointmentAPI.getAppointments();
      setAppointments(data.appointments ?? []);
    } catch (err) {
      setError(err.message || 'Failed to load appointments.');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Auto-fetch when auth state changes
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // ── Book appointment ───────────────────────────────────────────────────────
  const bookAppointment = useCallback(async (payload) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await appointmentAPI.bookAppointment(payload);
      // Prepend the new appointment to the list for instant UI update
      setAppointments((prev) => [data.appointment, ...prev]);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to book appointment.');
      throw err; // Re-throw so the calling component can handle it too
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── Cancel appointment ─────────────────────────────────────────────────────
  const cancelAppointment = useCallback(async (appointmentId) => {
    setError(null);
    try {
      const data = await appointmentAPI.cancelAppointment(appointmentId);
      // Update status optimistically in local state
      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === appointmentId || apt.id === appointmentId
            ? { ...apt, status: 'cancelled' }
            : apt
        )
      );
      return data;
    } catch (err) {
      setError(err.message || 'Failed to cancel appointment.');
      throw err;
    }
  }, []);

  return {
    appointments,
    isLoading,
    error,
    bookAppointment,
    cancelAppointment,
    refetch: fetchAppointments,
  };
}
