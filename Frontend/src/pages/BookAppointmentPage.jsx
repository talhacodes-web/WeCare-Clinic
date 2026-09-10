import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Info
} from 'lucide-react';
import { DENTAL_SERVICES, DENTISTS } from '../data/clinicData.js';
import { useAppointments } from '../hooks/useAppointments.js';
import { useAuth } from '../context/AuthContext.jsx';

export const BookAppointmentPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    serviceId: '',
    dentistId: '',
    date: '',
    time: '',
    reason: '',
    notes: '',
  });

  const { bookAppointment, isLoading: bookingLoading } = useAppointments();
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        patientName: prev.patientName || user.name,
        email: prev.email || user.email,
        phone: prev.phone || user.phone,
      }));
    }
  }, [user]);

  // Pre-fill from query parameters
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const dentistParam = searchParams.get('dentist');

    if (serviceParam && DENTAL_SERVICES.some((s) => s.id === serviceParam)) {
      setFormData((prev) => ({ ...prev, serviceId: serviceParam }));
    }
    if (dentistParam && DENTISTS.some((d) => d.id === dentistParam)) {
      setFormData((prev) => ({ ...prev, dentistId: dentistParam }));
    }
  }, [searchParams]);

  // Time slot options
  const timeSlots = [
    '08:30 AM', '09:15 AM', '10:00 AM', '10:45 AM',
    '11:30 AM', '01:15 PM', '02:00 PM', '02:45 PM',
    '03:30 PM', '04:15 PM', '05:00 PM', '06:00 PM'
  ];

  // Restrict date picker to today onward
  const todayString = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const selectedServiceObj = DENTAL_SERVICES.find((s) => s.id === formData.serviceId);
  const selectedDentistObj = DENTISTS.find((d) => d.id === formData.dentistId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.patientName || !formData.email || !formData.phone) {
      setErrorMessage('Please complete all patient contact information.');
      return;
    }
    if (!formData.serviceId) {
      setErrorMessage('Please select the dental service you need.');
      return;
    }
    if (!formData.date || !formData.time) {
      setErrorMessage('Please choose your preferred appointment date and time.');
      return;
    }

    try {
      const serviceName = selectedServiceObj ? selectedServiceObj.name : 'General Dentistry';
      const dentistName = selectedDentistObj ? selectedDentistObj.name : 'First Available Dental Doctor';

      const res = await bookAppointment({
        serviceId: formData.serviceId,
        serviceName,
        dentistId: formData.dentistId || 'first-available',
        dentistName,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
      });

      setConfirmedBooking(res.appointment);
    } catch (err) {
      setErrorMessage(err.message || 'Unable to submit booking request. Please try again.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-wider font-bold text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-100">
            Convenient Online Scheduling
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-2">
            Book a Dental Appointment
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Schedule your visit with our compassionate dental experts. No long wait times, transparent pricing, and gentle care.
          </p>
        </div>

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md text-center max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Appointment Request Submitted!
            </h2>

            <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
              Thank you for choosing WeCare Clinic. Our team will contact you to confirm your appointment details.
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left mb-8 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Reference Code:</span>
                <span className="text-sm font-extrabold text-teal-700 font-mono bg-white px-2.5 py-1 rounded border border-slate-200">
                  {confirmedBooking._id || confirmedBooking.id}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                <div>
                  <span className="text-slate-400 block text-xs">Patient Name</span>
                  <span className="font-semibold text-slate-900">{confirmedBooking.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Selected Service</span>
                  <span className="font-semibold text-slate-900">{confirmedBooking.serviceName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Dentist / Specialist</span>
                  <span className="font-semibold text-slate-900">{confirmedBooking.dentistName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Appointment Slot</span>
                  <span className="font-semibold text-teal-700">{confirmedBooking.date} at {confirmedBooking.time}</span>
                </div>
              </div>

              {confirmedBooking.reason && (
                <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-600">
                  <span className="text-slate-400 block text-xs">Reason for Visit</span>
                  <span className="italic">"{confirmedBooking.reason}"</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setConfirmedBooking(null);
                  setFormData({
                    patientName: user?.name || '',
                    email: user?.email || '',
                    phone: user?.phone || '',
                    serviceId: '',
                    dentistId: '',
                    date: '',
                    time: '',
                    reason: '',
                    notes: '',
                  });
                }}
                className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Book Another Visit
              </button>

              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-xs"
              >
                <span>Return to Home</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Main Booking Form */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <p>{errorMessage}</p>
              </div>
            )}

            {user && (
              <div className="mb-6 p-4 rounded-xl bg-teal-50/70 border border-teal-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span>
                    Booking as <strong className="text-slate-900">{user.name}</strong> ({user.email})
                  </span>
                </div>
                <span className="self-start sm:self-auto text-xs font-semibold text-teal-700 bg-white px-2.5 py-1 rounded-md border border-teal-200 shrink-0">
                  Verified Patient
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* SECTION 1: Patient Information */}
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-5">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center text-xs font-bold border border-teal-100">
                    1
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Patient Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="patientName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Jessica Martinez"
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="jessica@example.com"
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(555) 987-6543"
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Appointment Information */}
              <div>
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-5">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center text-xs font-bold border border-teal-100">
                    2
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Appointment Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  {/* Select Dental Service */}
                  <div>
                    <label htmlFor="serviceId" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Select Dental Service <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="serviceId"
                      name="serviceId"
                      value={formData.serviceId}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">-- Choose a Dental Service --</option>
                      {DENTAL_SERVICES.map((svc) => (
                        <option key={svc.id} value={svc.id}>
                          {svc.name} (~{svc.durationMinutes} min)
                        </option>
                      ))}
                    </select>
                    {selectedServiceObj && (
                      <p className="text-xs text-teal-700 mt-1 font-medium">
                        {selectedServiceObj.shortDescription}
                      </p>
                    )}
                  </div>

                  {/* Select Dentist */}
                  <div>
                    <label htmlFor="dentistId" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Select Dentist (Optional)
                    </label>
                    <select
                      id="dentistId"
                      name="dentistId"
                      value={formData.dentistId}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">First Available Dental Doctor</option>
                      {DENTISTS.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} ({doc.specialty})
                        </option>
                      ))}
                    </select>
                    {selectedDentistObj && (
                      <p className="text-xs text-slate-500 mt-1">
                        Available on {selectedDentistObj.availableDays.join(', ')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Preferred Date and Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="date" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        min={todayString}
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Time Slot <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="">-- Choose a Time Slot --</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Reason for Visit */}
                <div className="mb-4">
                  <label htmlFor="reason" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Reason for Visit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Routine cleaning, toothache on upper right, consultation for clear aligners..."
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label htmlFor="notes" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any dental anxiety, medical conditions, or specific questions we should know prior to your arrival..."
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl font-bold text-base text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all disabled:opacity-60 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>{bookingLoading ? 'Submitting Appointment Request...' : 'Book Appointment'}</span>
                </button>
                <p className="text-center text-xs text-slate-400 mt-2">
                  No advance payment required. We will confirm via SMS and email.
                </p>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
