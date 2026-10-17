/**
 * Radha Swami Furniture — Unified API Client
 * ===========================================
 * Centralized HTTP client for backend REST integration.
 * Supports configurable API base URL, admin authentication,
 * error handling, and connectivity health probes.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  getAdminToken() {
    return localStorage.getItem('rsf_admin_token') || 'admin123';
  }

  setAdminToken(token) {
    if (token) {
      localStorage.setItem('rsf_admin_token', token);
    } else {
      localStorage.removeItem('rsf_admin_token');
    }
  }

  isLiveApiEnabled() {
    const stored = localStorage.getItem('rsf_use_live_api');
    if (stored !== null) return stored === 'true';
    return import.meta.env.VITE_USE_LIVE_API === 'true';
  }

  setLiveApiEnabled(enabled) {
    localStorage.setItem('rsf_use_live_api', enabled ? 'true' : 'false');
  }

  /**
   * Health probe to verify if the Express + MongoDB backend is reachable
   */
  async checkHealth() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const response = await fetch(`${this.baseUrl}/health`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) return { online: false, error: `HTTP ${response.status}` };
      const data = await response.json();
      return { online: true, data: data.data };
    } catch (err) {
      return { online: false, error: err.message };
    }
  }

  /**
   * Generic request dispatcher
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getAdminToken();
    if (token) {
      headers['x-admin-key'] = token;
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);
    const result = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        result?.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.details = result;
      throw error;
    }

    return result?.data !== undefined ? result.data : result;
  }

  get(endpoint, params = {}) {
    const query = new URLSearchParams(params).toString();
    const path = query ? `${endpoint}?${query}` : endpoint;
    return this.request(path, { method: 'GET' });
  }

  post(endpoint, body = {}) {
    return this.request(endpoint, { method: 'POST', body });
  }

  put(endpoint, body = {}) {
    return this.request(endpoint, { method: 'PUT', body });
  }

  patch(endpoint, body = {}) {
    return this.request(endpoint, { method: 'PATCH', body });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
