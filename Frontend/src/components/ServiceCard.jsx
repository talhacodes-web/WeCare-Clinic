import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  Layers,
  SunMedium,
  Anchor,
  Activity,
  HeartHandshake,
  Smile,
  ArrowRight,
  Clock
} from 'lucide-react';

export const ServiceCard = ({ service, onSelect }) => {
  const renderIcon = (name) => {
    const props = { className: 'w-6 h-6 text-teal-600' };
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'SunMedium': return <SunMedium {...props} />;
      case 'Anchor': return <Anchor {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'HeartHandshake': return <HeartHandshake {...props} />;
      case 'Smile': return <Smile {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div
      id={`service-card-${service.id}`}
      className="group bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center group-hover:bg-teal-100/70 group-hover:scale-105 transition-all duration-200">
            {renderIcon(service.iconName)}
          </div>
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            {service.durationMinutes}m
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-teal-700 transition-colors">
          {service.name}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
          {service.shortDescription}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onSelect(service)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors focus:outline-none focus:underline"
        >
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
