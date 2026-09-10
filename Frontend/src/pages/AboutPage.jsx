import React from 'react';
import {
  Heart,
  Award,
  Sparkles,
  ShieldCheck,
  Users,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ArrowRight
} from 'lucide-react';
import { CLINIC_INFO, DENTISTS, CORE_VALUES } from '../data/clinicData.js';
import { DoctorCard } from '../components/DoctorCard.jsx';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  const renderValueIcon = (name) => {
    const props = { className: 'w-6 h-6 text-teal-600' };
    switch (name) {
      case 'Heart': return <Heart {...props} />;
      case 'Award': return <Award {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
              About WeCare Clinic
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Founded on the belief that dental care should be gentle, transparent, and welcoming for every family member.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Mission: Elevating Oral Health with Genuine Compassion
              </h2>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                WeCare Clinic was established over a decade ago with a single clear goal: to create a modern dental practice where patients never feel rushed, intimidated, or uncertain about their treatment.
              </p>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Too many people avoid dental visits due to anxiety or fear of the unknown. We redesigned the clinical experience from the ground up: tranquil consultation rooms, chairside high-definition screens to view your dental scans collaboratively, and transparent estimates before any procedure begins.
              </p>

              <div className="p-4 rounded-xl bg-teal-50 border border-teal-100/80">
                <h4 className="font-bold text-teal-900 text-sm mb-1">Our Core Promise</h4>
                <p className="text-xs sm:text-sm text-teal-800">
                  "We treat every patient like our own family member—prioritizing conservative preservation of your natural teeth and your lifelong comfort."
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000"
                  alt="WeCare Clinic Dental Team and Friendly Reception"
                  className="w-full aspect-4/3 object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Our Core Clinical Values
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every appointment, consultation, and treatment is guided by these four pillars of excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, i) => (
              <div
                key={i}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-100/60 flex items-center justify-center mb-4">
                    {renderValueIcon(val.iconName)}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Doctors Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Meet Our Dental Specialists
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our dental surgeons and hygienists participate in ongoing continuous education to bring you the safest and most advanced techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DENTISTS.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Environment & Hygiene Standards */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-teal-50/70 border border-teal-100 rounded-3xl p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mt-3 mb-3">
                  Hospital-Grade Sterilization & Patient Safety
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  We adhere to the strictest CDC and ADA sterilization guidelines.
                  All reusable dental handpieces and instruments undergo multi-stage ultrasonic cleaning and vacuum autoclaving in sealed individual indicator pouches.
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>EPA-registered hospital disinfectants for operatory surfaces</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>HEPA air filtration systems operating continuously in treatment suites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>Single-use sterile barriers for digital sensors and lights</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-teal-200/80 shadow-xs space-y-4">
                <h4 className="font-bold text-slate-900 text-base">Schedule a Clinic Tour</h4>
                <p className="text-xs sm:text-sm text-slate-500">
                  Anxious about an upcoming procedure? We invite you to tour our facility, meet Dr. Ahmed and our staff, and discuss your comfort preferences beforehand.
                </p>
                <div className="pt-2">
                  <Link
                    to="/book-appointment"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-xs"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book a Gentle Consultation</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
