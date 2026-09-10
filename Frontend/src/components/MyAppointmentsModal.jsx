import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { useAppointments } from '../hooks/useAppointments.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

export const MyAppointmentsModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { appointments, isLoading: loading, error, cancelAppointment, refetch } = useAppointments();
  const [cancellingId, setCancellingId] = useState(null);
  const [message, setMessage] = useState(null);

  // Re-fetch when modal opens
  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen]);

  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this appointment request?')) return;
    setCancellingId(id);
    try {
      await cancelAppointment(id);
      setMessage('Appointment status updated to cancelled.');
    } catch (err) {
      setMessage(err.message || 'Failed to cancel appointment.');
    } finally {
      setCancellingId(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Your Dental Appointments</h2>
            <p className="text-xs text-slate-500">
              {user ? `Showing bookings for ${user.email}` : 'Recent appointments recorded on this device'}
            </p>
          </div>
        </div>

        {message && (
          <div className="mb-4 p-3 text-xs bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Loading appointment records...
            </div>
          ) : appointments.length === 0 ? (
            <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-xl p-6">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h4 className="text-sm font-semibold text-slate-700 mb-1">No appointments yet</h4>
              <p className="text-xs text-slate-500 mb-4 max-w-xs mx-auto">
                Ready to schedule your visit? Book your consultation with our dental team in under two minutes.
              </p>
              <Link
                to="/book-appointment"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700"
              >
                <span>Book Appointment Now</span>
              </Link>
            </div>
          ) : (
            appointments.map((apt) => {
              const aptId = apt._id || apt.id;
              return (
              <div
                key={aptId}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                      {String(aptId).slice(-8).toUpperCase()}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${apt.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : apt.status === 'cancelled'
                          ? 'bg-slate-200 text-slate-600 line-through'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                      {apt.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Booked: {new Date(apt.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 my-3 bg-white p-3 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Service:</span>
                    <span className="font-semibold text-slate-900">{apt.serviceName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Dentist:</span>
                    <span className="font-semibold text-slate-900">{apt.dentistName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Scheduled Date:</span>
                    <span className="font-semibold text-teal-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {apt.date}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Time:</span>
                    <span className="font-semibold text-slate-900 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      {apt.time}
                    </span>
                  </div>
                </div>

                {apt.reason && (
                  <p className="text-xs text-slate-500 italic mb-3">
                    Reason: "{apt.reason}"
                  </p>
                )}

                {(apt.status !== 'cancelled' && apt.status !== 'completed') && (
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      disabled={cancellingId === (apt._id || apt.id)}
                      onClick={() => handleCancel(apt._id || apt.id)}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded transition-colors"
                    >
                      {cancellingId === (apt._id || apt.id) ? 'Updating...' : 'Cancel Request'}
                    </button>
                  </div>
                )}
              </div>
              );
            })
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
          <Link
            to="/book-appointment"
            onClick={onClose}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 hover:underline"
          >
            + Book Another Visit
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
