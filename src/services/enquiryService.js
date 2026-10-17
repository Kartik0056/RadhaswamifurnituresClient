/**
 * Radha Swami Furniture — CRM & Enquiry Service
 * ===============================================
 * Powers lead capturing from public contact forms, product enquiry modals,
 * and the complete Showroom CRM Admin Dashboard.
 *
 * Supports dual-mode operation:
 * - Live Backend API: when server is online and connected (POST/GET /api/v1/enquiries)
 * - Local CRM Database: persists in localStorage with initial high-quality Ludhiana showroom leads.
 */

import apiClient from './apiClient';

const CRM_STORAGE_KEY = 'rsf_crm_leads';

const initialDemoLeads = [
  {
    _id: 'lead-1',
    id: 'lead-1',
    name: 'Harpreet Singh',
    phone: '+91 98141 55230',
    email: 'harpreet.ludhiana@gmail.com',
    subject: 'Custom Sheesham King Bed Enquiry',
    message:
      'Looking for a bespoke king bed in dark walnut finish with cushioned headboard for our new master bedroom in Model Town, Ludhiana.',
    productName: 'The Royal Sheesham King Bed',
    preferredContact: 'WhatsApp',
    status: 'in_consultation',
    priority: 'high',
    source: 'product_modal',
    dealValue: 75000,
    timberPreference: 'Sheesham',
    roomType: 'Master Bedroom',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    notes: [
      {
        _id: 'n1',
        note: 'Customer shared floor plan over WhatsApp. Requested walnut polish sample before final polish.',
        author: 'Showroom Admin',
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
    ],
  },
  {
    _id: 'lead-2',
    id: 'lead-2',
    name: 'Jasleen Kaur',
    phone: '+91 98722 41189',
    email: 'jasleen.kaur@yahoo.com',
    subject: 'Chesterfield 3-Seater Sofa in Velvet',
    message:
      'Interested in the Chesterfield sofa in emerald green velvet upholstery. Would like to visit the Bachan Singh Marg showroom this Saturday.',
    productName: 'Heritage Chesterfield 3-Seater',
    preferredContact: 'Phone Call',
    status: 'new',
    priority: 'high',
    source: 'contact_page',
    dealValue: 62000,
    timberPreference: 'Teak Wood frame',
    roomType: 'Formal Living Room',
    createdAt: new Date(Date.now() - 86400000 / 2).toISOString(),
    notes: [],
  },
  {
    _id: 'lead-3',
    id: 'lead-3',
    name: 'Gurinder Sandhu',
    phone: '+91 97800 33412',
    email: 'gsandhu.transport@gmail.com',
    subject: '8-Seater Live Edge Dining Table',
    message:
      'Need a heavy 8-seater dining table with matching cushioned high-back chairs. Kindly provide quotation including delivery to Civil Lines.',
    productName: 'Artisan Live-Edge Dining Table',
    preferredContact: 'WhatsApp',
    status: 'quotation_sent',
    priority: 'medium',
    source: 'showroom_walkin',
    dealValue: 110000,
    timberPreference: 'Solid Sheesham',
    roomType: 'Dining Hall',
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    notes: [
      {
        _id: 'n2',
        note: 'Showed live showroom slab samples. Quotation sent via WhatsApp PDF on ₹1,05,000.',
        author: 'Showroom Admin',
        createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      },
    ],
  },
  {
    _id: 'lead-4',
    id: 'lead-4',
    name: 'Dr. Amanpreet Virdi',
    phone: '+91 94178 88902',
    email: 'aman.virdi@hospital.org',
    subject: 'Modular Sheesham 4-Door Wardrobe',
    message:
      'Enquiring about sliding 4-door wardrobe with internal sensor lighting and soft close fittings.',
    productName: 'Heritage 4-Door Wardrobe',
    preferredContact: 'WhatsApp',
    status: 'won',
    priority: 'high',
    source: 'product_modal',
    dealValue: 92000,
    timberPreference: 'Sheesham & Teak veneer',
    roomType: 'Guest Room',
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    notes: [
      {
        _id: 'n3',
        note: 'Advance received ₹30,000. Carpentry work in progress, delivery scheduled next week.',
        author: 'Showroom Admin',
        createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
      },
    ],
  },
  {
    _id: 'lead-5',
    id: 'lead-5',
    name: 'Rohit Sharma',
    phone: '+91 99155 77621',
    email: 'rohit.sharma@outlook.com',
    subject: 'Coffee Table Catalog Enquiry',
    message: 'Kindly send brochure for coffee tables and nesting side tables.',
    productName: 'Artisan Brass Inlay Coffee Table',
    preferredContact: 'WhatsApp',
    status: 'contacted',
    priority: 'low',
    source: 'contact_page',
    dealValue: 18500,
    timberPreference: 'Mango Wood',
    roomType: 'Living Room',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    notes: [],
  },
];

function getStoredLeads() {
  try {
    const raw = localStorage.getItem(CRM_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(initialDemoLeads));
      return initialDemoLeads;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to parse CRM leads from storage, initializing defaults', err);
    return initialDemoLeads;
  }
}

function saveStoredLeads(leads) {
  try {
    localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(leads));
  } catch (err) {
    console.error('Failed to save CRM leads to storage', err);
  }
}

export const enquiryService = {
  /**
   * Submit an enquiry from contact page or product modal.
   * Dual-mode: Tries live API first if enabled/online, falls back to local CRM seamlessly.
   */
  async submitEnquiry(data) {
    const isLive = apiClient.isLiveApiEnabled();
    const payload = {
      name: data.name?.trim(),
      phone: data.phone?.trim(),
      email: data.email?.trim() || '',
      subject: data.subject?.trim() || 'General Furniture Enquiry',
      message: data.message?.trim(),
      productId: data.productId || '',
      productName: data.productName || '',
      preferredContact: data.preferredContact || 'WhatsApp',
      priority: data.priority || 'medium',
      source: data.source || 'contact_page',
      dealValue: Number(data.dealValue) || 0,
      timberPreference: data.timberPreference || '',
      roomType: data.roomType || '',
    };

    if (isLive) {
      try {
        const result = await apiClient.post('/enquiries', payload);
        return { success: true, data: result, mode: 'api' };
      } catch (err) {
        console.warn('API submission failed, persisting locally in CRM database', err);
      }
    }

    // Local CRM storage persistence
    const leads = getStoredLeads();
    const newLead = {
      ...payload,
      _id: `lead-${Date.now()}`,
      id: `lead-${Date.now()}`,
      status: 'new',
      notes: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    leads.unshift(newLead);
    saveStoredLeads(leads);

    return { success: true, data: newLead, mode: 'local' };
  },

  /**
   * Fetch leads with filtering, search, and sorting.
   */
  async getLeads({ status = 'all', priority = 'all', search = '', sortBy = 'newest' } = {}) {
    if (apiClient.isLiveApiEnabled()) {
      try {
        const params = {};
        if (status && status !== 'all') params.status = status;
        if (priority && priority !== 'all') params.priority = priority;
        if (search) params.search = search;
        if (sortBy) params.sortBy = sortBy;

        const data = await apiClient.get('/enquiries', params);
        if (Array.isArray(data)) return { leads: data, source: 'api' };
        if (data?.data && Array.isArray(data.data)) return { leads: data.data, source: 'api' };
      } catch (err) {
        console.warn('Falling back to local CRM storage', err);
      }
    }

    // Local Filtering
    let list = [...getStoredLeads()];

    if (status && status !== 'all') {
      list = list.filter((l) => l.status === status);
    }

    if (priority && priority !== 'all') {
      list = list.filter((l) => l.priority === priority);
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (l) =>
          l.name?.toLowerCase().includes(q) ||
          l.phone?.toLowerCase().includes(q) ||
          l.message?.toLowerCase().includes(q) ||
          l.productName?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'oldest') {
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'value-desc') {
      list.sort((a, b) => (b.dealValue || 0) - (a.dealValue || 0));
    } else {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return { leads: list, source: 'local' };
  },

  /**
   * Update lead pipeline status
   */
  async updateStatus(id, newStatus) {
    if (apiClient.isLiveApiEnabled()) {
      try {
        await apiClient.patch(`/enquiries/${id}/status`, { status: newStatus });
      } catch (err) {
        console.warn('API update failed, updating locally', err);
      }
    }

    const leads = getStoredLeads();
    const index = leads.findIndex((l) => l._id === id || l.id === id);
    if (index !== -1) {
      leads[index].status = newStatus;
      leads[index].updatedAt = new Date().toISOString();
      saveStoredLeads(leads);
      return leads[index];
    }
    return null;
  },

  /**
   * Update full lead details (deal value, priority, dates)
   */
  async updateLead(id, updates) {
    if (apiClient.isLiveApiEnabled()) {
      try {
        await apiClient.put(`/enquiries/${id}`, updates);
      } catch (err) {
        console.warn('API update failed, updating locally', err);
      }
    }

    const leads = getStoredLeads();
    const index = leads.findIndex((l) => l._id === id || l.id === id);
    if (index !== -1) {
      leads[index] = { ...leads[index], ...updates, updatedAt: new Date().toISOString() };
      saveStoredLeads(leads);
      return leads[index];
    }
    return null;
  },

  /**
   * Append follow-up note to lead
   */
  async addNote(id, noteText, author = 'Showroom Admin') {
    const newNote = {
      _id: `note-${Date.now()}`,
      note: noteText.trim(),
      author,
      createdAt: new Date().toISOString(),
    };

    if (apiClient.isLiveApiEnabled()) {
      try {
        await apiClient.post(`/enquiries/${id}/notes`, { note: noteText, author });
      } catch (err) {
        console.warn('API note append failed, updating locally', err);
      }
    }

    const leads = getStoredLeads();
    const index = leads.findIndex((l) => l._id === id || l.id === id);
    if (index !== -1) {
      if (!leads[index].notes) leads[index].notes = [];
      leads[index].notes.unshift(newNote);
      leads[index].updatedAt = new Date().toISOString();
      saveStoredLeads(leads);
      return leads[index];
    }
    return null;
  },

  /**
   * Delete lead
   */
  async deleteLead(id) {
    if (apiClient.isLiveApiEnabled()) {
      try {
        await apiClient.delete(`/enquiries/${id}`);
      } catch (err) {
        console.warn('API delete failed, updating locally', err);
      }
    }

    const leads = getStoredLeads().filter((l) => l._id !== id && l.id !== id);
    saveStoredLeads(leads);
    return true;
  },

  /**
   * Get CRM Analytics & Metrics
   */
  async getOverviewStats() {
    if (apiClient.isLiveApiEnabled()) {
      try {
        const stats = await apiClient.get('/enquiries/stats/overview');
        if (stats) return stats;
      } catch (err) {
        console.warn('API stats failed, calculating locally', err);
      }
    }

    const leads = getStoredLeads();
    const statusMap = {
      new: 0,
      contacted: 0,
      in_consultation: 0,
      quotation_sent: 0,
      won: 0,
      lost: 0,
    };

    let pipelineValue = 0;
    let wonValue = 0;

    leads.forEach((l) => {
      const s = l.status || 'new';
      if (statusMap[s] !== undefined) statusMap[s]++;
      const val = Number(l.dealValue) || 0;
      if (s !== 'lost') pipelineValue += val;
      if (s === 'won') wonValue += val;
    });

    const totalLeads = leads.length;
    const conversionRate = totalLeads > 0 ? ((statusMap.won / totalLeads) * 100).toFixed(1) : 0;

    return {
      totalLeads,
      statusMap,
      pipelineValue,
      wonValue,
      conversionRate: Number(conversionRate),
      recentLeads: leads.slice(0, 5),
    };
  },

  /**
   * Export all leads to CSV
   */
  exportToCSV() {
    const leads = getStoredLeads();
    const headers = [
      'Lead ID',
      'Customer Name',
      'Phone',
      'Email',
      'Status',
      'Priority',
      'Product / Subject',
      'Deal Value (INR)',
      'Preferred Contact',
      'Created Date',
      'Message',
    ];

    const rows = leads.map((l) => [
      `"${l._id || l.id}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${l.status || 'new'}"`,
      `"${l.priority || 'medium'}"`,
      `"${(l.productName || l.subject || '').replace(/"/g, '""')}"`,
      `"${l.dealValue || 0}"`,
      `"${l.preferredContact || 'WhatsApp'}"`,
      `"${new Date(l.createdAt).toLocaleDateString('en-IN')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Radha_Swami_Furniture_CRM_Leads_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  /**
   * Reset local leads to demo defaults
   */
  resetToDemo() {
    localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(initialDemoLeads));
    return initialDemoLeads;
  },
};

export default enquiryService;
