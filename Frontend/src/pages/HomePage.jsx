import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Sparkles,
  UserCheck,
  Phone,
  CheckCircle2,
  Heart,
  Cpu,
  Coffee,
  FileCheck,
  CalendarCheck,
  GraduationCap
} from 'lucide-react';
import {
  CLINIC_INFO,
  CLINIC_STATS,
  DENTAL_SERVICES,
  DENTISTS,
  DENTAL_TOOLS,
  WHY_CHOOSE_US,
  HOW_IT_WORKS_STEPS,
  TESTIMONIALS
} from '../data/clinicData.js';
import { ServiceCard } from '../components/ServiceCard.jsx';
import { ServiceDetailModal } from '../components/ServiceDetailModal.jsx';
import { ToolCard } from '../components/ToolCard.jsx';
import { DoctorCard } from '../components/DoctorCard.jsx';
import { TestimonialCard } from '../components/TestimonialCard.jsx';

export const HomePage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const renderStatIcon = (name) => {
    switch (name) {
      case 'Award': return <Award className="w-5 h-5 text-teal-600" />;
      case 'Users': return <Users className="w-5 h-5 text-teal-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-teal-600" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-teal-600" />;
      default: return <Award className="w-5 h-5 text-teal-600" />;
    }
  };

  const renderWhyChooseIcon = (name) => {
    const props = { className: 'w-6 h-6 text-teal-600' };
    switch (name) {
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Coffee': return <Coffee {...props} />;
      case 'FileCheck': return <FileCheck {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'CalendarCheck': return <CalendarCheck {...props} />;
      default: return <ShieldCheck {...props} />;
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Your Smile, <br className="hidden sm:inline" />
                <span className="text-teal-600">Our Compassionate Care.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Experience gentle, stress-free dental treatments powered by advanced digital scanning,
                minimally invasive techniques, and an experienced team dedicated to your oral wellness.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all duration-150 transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment</span>
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                >
                  <span>Explore Dental Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust badges row */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Transparent Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Zero-Anxiety Environment</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Weekend Appointments</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative soft glow */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-teal-200/40 to-sky-100/40 rounded-3xl blur-xl"></div>

                <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000"
                    alt="Friendly dentist consulting with smiling patient at WeCare Clinic"
                    className="w-full aspect-4/3 sm:aspect-5/4 object-cover object-center"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />

                  {/* Overlay floating badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                        5.0
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Patient Satisfaction</h4>
                        <p className="text-xs text-slate-500">Over 5,000+ happy smiles restored</p>
                      </div>
                    </div>
                    <Link
                      to="/contact"
                      className="text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors shrink-0"
                    >
                      Visit Clinic
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-slate-50 border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {CLINIC_STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                  {renderStatIcon(stat.iconName)}
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT WECARE PREVIEW */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600"
                  alt="Modern Dental Consultation Room"
                  className="rounded-2xl object-cover aspect-4/5 shadow-sm border border-slate-200"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-4 pt-6">
                  <img
                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600"
                    alt="Modern Dental Operatory Equipment"
                    className="rounded-2xl object-cover aspect-4/5 shadow-sm border border-slate-200"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-xs">
                    <p className="text-xs uppercase tracking-wider font-semibold opacity-90">Hygiene Standard</p>
                    <p className="text-sm font-bold mt-1">Class-B Medical Autoclave Sterilization</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                A Welcoming Practice Dedicated to Comfortable, Modern Dental Health.
              </h2>

              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                At WeCare Clinic, we believe dental visits should be empowering, relaxed, and transparent.
                Whether you visit us for regular preventive maintenance, gentle pediatric dental care, or a full aesthetic smile transformation,
                our focus is on personalized comfort and long-term oral well-being.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">
                    <strong className="text-slate-900">Gentle Bedside Approach:</strong> We listen to your concerns, explain all findings chairside, and offer comfort options for anxious patients.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">
                    <strong className="text-slate-900">State-of-the-Art Technology:</strong> Digital 3D impressions, intraoral HD cameras, and digital low-dose radiography.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">
                    <strong className="text-slate-900">Accessible Care:</strong> Flexible appointment hours, transparent treatment estimates, and simple online scheduling.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 font-bold text-sm text-teal-700 hover:text-teal-800 underline underline-offset-4"
                >
                  <span>Learn more about our dental clinic philosophy & doctors</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURED DENTAL SERVICES */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                Dental Services & Specialties
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
                From preventive examinations to specialized restorative and cosmetic therapies,
                we deliver comprehensive dental care tailored to your unique smile.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 shrink-0"
            >
              <span>View All 8 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DENTAL_SERVICES.slice(0, 4).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={(svc) => setSelectedService(svc)}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs transition-colors"
            >
              <span>Explore All Dental Treatments & Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. DENTAL EQUIPMENT & MODERN TOOLS */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Modern Dental Tools & Technology
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              We invest in advanced equipment designed to make procedures quicker, quieter, and significantly more comfortable for every patient.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DENTAL_TOOLS.slice(0, 6).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE WECARE */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Why Patients Choose WeCare Clinic
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Designed around patient comfort, transparent communication, and clinical excellence at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 border border-teal-100">
                  {renderWhyChooseIcon(item.iconName)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              How Your Dental Visit Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              From seamless booking to personalized post-care support, here is what you can expect when visiting WeCare Clinic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div
                key={step.step}
                className="relative bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200/90 flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black text-teal-600 font-mono mb-3">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-all duration-150"
            >
              <Calendar className="w-4 h-4" />
              <span>Get Started & Schedule an Appointment</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. MEET OUR DENTISTS */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                Meet Our Dentists
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">
                Dedicated professionals with advanced post-doctoral training, gentle clinical bedside manners, and a shared dedication to patient comfort.
              </p>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 shrink-0"
            >
              <span>Learn More About the Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DENTISTS.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. PATIENT TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              What Our Patients Say
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Real reviews from individuals and families who rely on WeCare Clinic for their smiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. BOTTOM CTA BANNER */}
      <section className="py-16 sm:py-20 bg-teal-700 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs uppercase tracking-wider font-bold text-teal-100 bg-teal-800/80 px-4 py-1.5 rounded-full border border-teal-600 inline-block mb-4">
            Start Your Smile Journey Today
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Ready for a Brighter, Healthier Smile?
          </h2>
          <p className="text-teal-100 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Experience gentle, comprehensive dentistry in a relaxing modern atmosphere.
            Schedule online now or speak directly with our clinic coordinator.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book-appointment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-teal-900 bg-white hover:bg-teal-50 shadow-md transition-all duration-150 transform hover:-translate-y-0.5"
            >
              <Calendar className="w-5 h-5 text-teal-700" />
              <span>Book Appointment Online</span>
            </Link>

            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-base text-white bg-teal-800 hover:bg-teal-900 border border-teal-600 transition-colors"
            >
              <Phone className="w-5 h-5 text-teal-300" />
              <span>Call {CLINIC_INFO.phone}</span>
            </a>
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
