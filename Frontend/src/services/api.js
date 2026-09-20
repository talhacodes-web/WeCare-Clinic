/**
 * WeCare Clinic — API Service Layer
 *
 * Architecture:
 *  - Access token stored in module-level memory (never in localStorage for security)
 *  - Refresh token lives in an httpOnly cookie — sent automatically by the browser
 *  - On every 401 TOKEN_EXPIRED response, silently calls /api/auth/refresh-token,
 *    gets a new access token, and retries the original request once
 *  - All functions throw plain Error objects with backend message strings
 *    so UI components can show them directly
 */

import { DENTAL_SERVICES, DENTISTS } from '../data/clinicData.js';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

// ─── In-memory token store ────────────────────────────────────────────────────
// Never persisted to localStorage — cleared on page refresh (re-hydrated via /me)
let _accessToken = null;

export const tokenStore = {
  get: () => _accessToken,
  set: (token) => { _accessToken = token; },
  clear: () => { _accessToken = null; },
};

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

/**
 * Internal fetch helper.
 * Attaches Authorization header, parses JSON, and throws on non-2xx.
 * Does NOT auto-refresh — use apiFetch for that.
 */
async function _rawFetch(url, options = {}) {
  const token = tokenStore.get();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(apiUrl(url), {
    ...options,
    headers,
    credentials: 'include', // Send httpOnly refresh token cookie automatically
  });

  // Parse body (even on error, backend always returns JSON)
  let data;
  try {
    data = await res.json();
  } catch {
    data = { message: `HTTP ${res.status} — ${res.statusText}` };
  }

  if (!res.ok) {
    const err = new Error(data?.message || 'Something went wrong.');
    err.status = res.status;
    err.code = data?.code;
    throw err;
  }

  return data;
}

/**
 * Public fetch wrapper with automatic token refresh on TOKEN_EXPIRED (401).
 * Retries the original request once with the new access token.
 */
async function apiFetch(url, options = {}, _isRetry = false) {
  try {
    return await _rawFetch(url, options);
  } catch (err) {
    // If access token expired and we haven't retried yet — refresh and retry
    if (err.status === 401 && err.code === 'TOKEN_EXPIRED' && !_isRetry) {
      try {
        const refreshData = await _rawFetch('/api/auth/refresh-token', { method: 'POST' });
        tokenStore.set(refreshData.accessToken);
        return await apiFetch(url, options, true); // Retry once
      } catch {
        // Refresh also failed — clear token, let the caller handle 401
        tokenStore.clear();
        throw err;
      }
    }
    throw err;
  }
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

export const authAPI = {
  /**
   * POST /api/auth/signup
   * Returns: { success, message, accessToken, user }
   */
  async signup(payload) {
    const data = await apiFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    tokenStore.set(data.accessToken);
    return data;
  },

  /**
   * POST /api/auth/login
   * Returns: { success, message, accessToken, user }
   */
  async login(payload) {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    tokenStore.set(data.accessToken);
    return data;
  },

  /**
   * POST /api/auth/logout
   */
  async logout() {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } finally {
      tokenStore.clear();
    }
  },

  /**
   * POST /api/auth/refresh-token
   * Uses the httpOnly cookie — no payload needed.
   * Returns: { success, accessToken }
   */
  async refreshToken() {
    const data = await _rawFetch('/api/auth/refresh-token', { method: 'POST' });
    tokenStore.set(data.accessToken);
    return data;
  },

  /**
   * GET /api/auth/me
   * Returns: { success, user }
   */
  async getMe() {
    return apiFetch('/api/auth/me');
  },
};

// ─── Appointment API ──────────────────────────────────────────────────────────

export const appointmentAPI = {
  /**
   * POST /api/appointments
   * Payload: { serviceId, serviceName, dentistId, dentistName, date, time, reason }
   * Returns: { success, message, appointment }
   */
  async bookAppointment(payload) {
    return apiFetch('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * GET /api/appointments
   * Returns: { success, count, appointments }
   */
  async getAppointments() {
    return apiFetch('/api/appointments');
  },

  /**
   * PUT /api/appointments/:id/cancel
   * Returns: { success, message, appointment }
   */
  async cancelAppointment(appointmentId) {
    return apiFetch(`/api/appointments/${appointmentId}/cancel`, {
      method: 'PUT',
    });
  },
};

// ─── Contact API ──────────────────────────────────────────────────────────────

export const contactAPI = {
  /**
   * POST /api/contact
   * (Backend route for future implementation — graceful fallback provided)
   */
  async submitContact(payload) {
    try {
      return await apiFetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch (err) {
      // If contact route not yet implemented on backend, simulate success
      if (err.status === 404) {
        return {
          success: true,
          message: 'Thank you for reaching out. Our clinic coordinator will contact you shortly.',
        };
      }
      throw err;
    }
  },
};

// ─── AI Assistant API ────────────────────────────────────────────────────────

export const aiAPI = {
  /**
   * POST /api/ai/chat
   * Payload: { message, history }
   * Returns: { success, answer }
   */
  async chat(message, history = []) {
    return apiFetch('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    });
  },
};

// ─── Services & Dentists (static fallback) ────────────────────────────────────

export const serviceAPI = {
  async getServices() {
    try {
      const data = await apiFetch('/api/services');
      return data.services ?? data;
    } catch {
      return DENTAL_SERVICES;
    }
  },

  async getServiceById(id) {
    const services = await serviceAPI.getServices();
    return services.find((s) => s.id === id);
  },
};

export const dentistAPI = {
  async getDentists() {
    try {
      const data = await apiFetch('/api/dentists');
      return data.dentists ?? data;
    } catch {
      return DENTISTS;
    }
  },

  async getDentistById(id) {
    const dentists = await dentistAPI.getDentists();
    return dentists.find((d) => d.id === id);
  },
};
