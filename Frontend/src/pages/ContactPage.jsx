import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Calendar,
  Building2
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData.js';
import { contactAPI } from '../services/api.js';
import { Link } from 'react-router-dom';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.fullName || !formData.email || !formData.message) {
      setErrorMessage('Please fill in your full name, email address, and message.');
      return;
    }

    setLoading(true);
    try {
      const response = await contactAPI.submitContact(formData);
      setSuccessMessage(response.message);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setErrorMessage(err.message || 'Unable to submit your message. Please try calling us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
              Contact WeCare Clinic
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Have questions about your dental health or wish to schedule a consultation?
              Our friendly patient coordination team is here to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency / Urgent Care Alert Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-900">
                Emergency & Urgent Dental Care
              </h3>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                Experiencing severe toothache, dental trauma, knocked-out tooth, or severe facial swelling? We reserve daily emergency priority slots.
              </p>
            </div>
          </div>
          <a
            href={`tel:${CLINIC_INFO.emergencyPhone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-amber-600 hover:bg-amber-700 transition-colors shrink-0 shadow-xs"
          >
            <Phone className="w-4 h-4" />
            <span>Call {CLINIC_INFO.emergencyPhone}</span>
          </a>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Left side: Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                  Clinic Information
                </h2>

                <div className="space-y-5">
                  {/* Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Physical Address
                      </h4>
                      <p className="text-sm font-semibold text-slate-800 leading-snug">
                        {CLINIC_INFO.address}
                      </p>
                      <span className="text-xs text-slate-500 mt-0.5 block">
                        Free patient parking available in Garage B (Levels 1-3).
                      </span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Phone & SMS Inquiries
                      </h4>
                      <a href={`tel:${CLINIC_INFO.phone}`} className="text-sm font-semibold text-teal-700 hover:text-teal-800">
                        {CLINIC_INFO.phone}
                      </a>
                      <span className="text-xs text-slate-500 mt-0.5 block">
                        Available Monday to Saturday during clinic hours.
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Email Correspondence
                      </h4>
                      <a href={`mailto:${CLINIC_INFO.email}`} className="text-sm font-semibold text-teal-700 hover:text-teal-800">
                        {CLINIC_INFO.email}
                      </a>
                      <span className="text-xs text-slate-500 mt-0.5 block">
                        We respond to all email messages within 24 business hours.
                      </span>
                    </div>
                  </div>

                  {/* Opening Hours */}
                  <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="w-full">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Operating Hours
                      </h4>
                      <div className="space-y-1.5 text-xs sm:text-sm">
                        {CLINIC_INFO.hours.map((h, i) => (
                          <div key={i} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
                            <span className="text-slate-600 font-medium">{h.days}</span>
                            <span className="text-slate-900 font-semibold">{h.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/book-appointment"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Prefer to Schedule an Appointment?</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side: Contact Form & Interactive Map Placeholder */}
            <div className="lg:col-span-7 space-y-6">

              {/* Contact Form Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  Send Us a Message
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">
                  Fill out the form below and a clinical coordinator will contact you promptly.
                </p>

                {successMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Message Delivered!</p>
                      <p className="text-xs mt-1 leading-relaxed">{successMessage}</p>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm">{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="">Select an inquiry topic</option>
                        <option value="General Inquiry">General Question</option>
                        <option value="Treatment Options">Dental Treatment Consultation</option>
                        <option value="Insurance & Billing">Insurance & Pricing Questions</option>
                        <option value="Dental Records Request">Records / X-Ray Transfer</option>
                        <option value="Other">Other Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please describe how we can assist you with your smile or appointment..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Map Placeholder Section */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-teal-600" />
                    <h3 className="font-bold text-slate-900 text-sm">Clinic Location & Directions</h3>
                  </div>
                  <span className="text-xs text-slate-500">Suite 300, 3rd Floor</span>
                </div>

                {/* Styled Map Graphic / Card */}
                <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-16/7 sm:aspect-16/6 flex items-center justify-center text-center p-6">
                  <div className="space-y-2 z-10 max-w-sm">
                    <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto shadow-md">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">WeCare Clinic Dental Pavilion</h4>
                    <p className="text-xs text-slate-600">
                      Located conveniently right off Healthview Blvd with direct elevator access and handicap ramps.
                    </p>
                  </div>
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div>
                    <span className="font-semibold text-slate-800">Public Transit: </span>
                    <span>Subway Line 2 (Medical Center Stop)</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Parking: </span>
                    <span>Validated parking on Level 2</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
