import React, { useState } from 'react';
import {
  ScanLine,
  Camera,
  Zap,
  Box,
  Cpu,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShieldCheck
} from 'lucide-react';

export const ToolCard = ({ tool }) => {
  const [expanded, setExpanded] = useState(false);

  const renderIcon = (name) => {
    const props = { className: 'w-6 h-6 text-teal-600' };
    switch (name) {
      case 'ScanLine': return <ScanLine {...props} />;
      case 'Camera': return <Camera {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Box': return <Box {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'CheckCircle2': return <CheckCircle2 {...props} />;
      default: return <ShieldCheck {...props} />;
    }
  };

  return (
    <div
      id={`tool-card-${tool.id}`}
      className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50/80 border border-teal-100 flex items-center justify-center">
            {renderIcon(tool.iconName)}
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            {tool.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {tool.name}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {tool.shortDescription}
        </p>

        {expanded && (
          <div className="pt-3 border-t border-slate-100 mb-3 animate-in fade-in duration-150">
            <h4 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
              Patient Advantages:
            </h4>
            <ul className="space-y-1.5">
              {tool.benefits.map((benefit, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                  <span className="text-teal-500 font-bold">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="pt-2 text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 focus:outline-none"
      >
        <span>{expanded ? 'Show Less' : 'Learn More'}</span>
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
