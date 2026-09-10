import React from 'react';
import { X, CheckCircle2, Clock, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServiceDetailModal = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs uppercase tracking-wider font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            {service.category} Specialty
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            ~{service.durationMinutes} mins
          </span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-3">{service.name}</h2>

        <p className="text-slate-600 leading-relaxed mb-5 text-sm sm:text-base">
          {service.fullDescription}
        </p>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            What is included in this treatment:
          </h4>
          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-xs sm:text-sm text-slate-700 gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-teal-600" />
            Best suited for:
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 bg-teal-50/50 p-3 rounded-lg border border-teal-100/60">
            {service.suitableFor}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-100">
          <Link
            to={`/book-appointment?service=${service.id}`}
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>Book for {service.name}</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
