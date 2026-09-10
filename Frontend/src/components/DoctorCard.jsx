import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Award } from 'lucide-react';

export const DoctorCard = ({ doctor }) => {
  return (
    <div
      id={`doctor-card-${doctor.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-200 overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Doctor Image */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-800 shadow-xs border border-slate-100 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-teal-600" />
            <span>{doctor.experienceYears}+ Years Experience</span>
          </div>
        </div>

        {/* Doctor Content */}
        <div className="p-6">
          <div className="mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100/80">
              {doctor.specialty}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mt-2 mb-1">
            {doctor.name}
          </h3>

          <p className="text-xs text-slate-500 mb-3 font-medium">
            {doctor.title}
          </p>

          <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
            {doctor.bio}
          </p>

          <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-4">
            <span className="font-semibold text-slate-700">
              Days Available:{' '}
            </span>
            <span>{doctor.availableDays.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Book Appointment */}
      <div className="px-6 pb-6 pt-0">
        <Link
          to={`/book-appointment?dentist=${doctor.id}`}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-teal-700 bg-teal-50 hover:bg-teal-600 hover:text-white border border-teal-200 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>Book with {doctor.name.split(' ')[1]}</span>
        </Link>
      </div>
    </div>
  );
};