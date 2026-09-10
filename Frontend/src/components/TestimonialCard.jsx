import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

export const TestimonialCard = ({ testimonial }) => {
  return (
    <div
      id={`testimonial-${testimonial.id}`}
      className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
    >
      <div>
        {/* Rating stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-slate-200 fill-slate-200'
                }`}
            />
          ))}
          <span className="ml-2 text-xs font-semibold text-slate-500">
            {testimonial.rating}.0
          </span>
        </div>

        {/* Testimonial Quote */}
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 italic">
          "{testimonial.comment}"
        </p>
      </div>

      {/* Patient info */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <img
          src={testimonial.avatarUrl}
          alt={testimonial.patientName}
          className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-slate-900 truncate">
              {testimonial.patientName}
            </h4>
            <span title="Verified Patient">
              <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            </span>
          </div>
          <p className="text-xs text-teal-700 font-medium truncate">
            {testimonial.procedure}
          </p>
        </div>
      </div>
    </div>
  );
};
