import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Layers,
  SunMedium,
  Anchor,
  Activity,
  HeartHandshake,
  Smile,
  Clock,
  Calendar,
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { DENTAL_SERVICES, DENTAL_TOOLS } from '../data/clinicData.js';
import { ServiceCard } from '../components/ServiceCard.jsx';
import { ServiceDetailModal } from '../components/ServiceDetailModal.jsx';
import { ToolCard } from '../components/ToolCard.jsx';
import { Link } from 'react-router-dom';

export const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'preventive', label: 'Preventive & Family' },
    { id: 'cosmetic', label: 'Cosmetic & Aesthetic' },
    { id: 'restorative', label: 'Restorative & Implants' },
    { id: 'specialized', label: 'Orthodontics & Specialist' },
  ];

  const filteredServices = useMemo(() => {
    return DENTAL_SERVICES.filter((svc) => {
      const matchesCategory = activeCategory === 'all' || svc.category === activeCategory;
      const matchesSearch =
        svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
              Our Dental Services & Specialties
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Explore our wide array of preventive checkups, aesthetic enhancements, and specialized oral surgeries—all performed with cutting-edge comfort technology.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-8 bg-slate-50 border-b border-slate-200 sticky top-20 z-30 bg-slate-50/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${activeCategory === cat.id
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search treatment or symptom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center max-w-md mx-auto border border-slate-200">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">No dental services found</h3>
              <p className="text-xs text-slate-500 mb-4">
                We couldn't find anything matching "{searchQuery}". Try a different keyword or reset filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="text-xs font-semibold text-teal-700 bg-teal-50 px-4 py-2 rounded-lg hover:bg-teal-100 transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onSelect={(svc) => setSelectedService(svc)}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Equipment Spotlight Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Advanced Tools That Power Your Treatment
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              High-accuracy dental instruments ensure faster diagnostics, less pain, and quicker healing times.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DENTAL_TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-700 to-teal-800 text-white rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Unsure which treatment is right for you?</h3>
              <p className="text-sm text-teal-100 leading-relaxed max-w-md">
                Schedule a comprehensive consultation with Dr. Ahmed or Dr. Hassan. We'll examine your smile and guide you transparently.
              </p>
            </div>
            <Link
              to="/book-appointment"
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-teal-900 bg-white hover:bg-teal-50 shadow-xs transition-colors shrink-0 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-teal-700" />
              <span>Book Consultation</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};
