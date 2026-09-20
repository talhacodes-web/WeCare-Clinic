import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { ScrollToTop } from './components/ScrollToTop.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { ServicesPage } from './pages/ServicesPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';
import { BookAppointmentPage } from './pages/BookAppointmentPage.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { Chatbot } from './components/Chatbot.jsx';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 selection:bg-teal-100 selection:text-teal-900">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/book-appointment"
            element={
              <ProtectedRoute>
                <BookAppointmentPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
