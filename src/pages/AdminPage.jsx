import { useState, useEffect } from 'react';
import {
  Users,
  Package,
  TrendingUp,
  Phone,
  MessageCircle,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  LogOut,
  RefreshCw,
  Trash2,
  Edit3,
  Server,
  Database,
  Building,
  Check,
  X,
  FileText,
  DollarSign,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import SEO from '../components/common/SEO';
import siteConfig from '../config/siteConfig';
import enquiryService from '../services/enquiryService';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  resetCatalog,
} from '../services/productService';
import apiClient from '../services/apiClient';
import categories from '../data/categories';

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('rsf_admin_logged_in') === 'true'
  );
  const [passkeyInput, setPasskeyInput] = useState('');
  const [passkeyError, setPasskeyError] = useState('');

  // Tab State: 'crm' | 'catalog' | 'system'
  const [activeTab, setActiveTab] = useState('crm');

  // CRM State
  const [leads, setLeads] = useState([]);
  const [crmStats, setCrmStats] = useState({
    totalLeads: 0,
    statusMap: {},
    pipelineValue: 0,
    wonValue: 0,
    conversionRate: 0,
  });
  const [crmLoading, setCrmLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Showroom Walk-in Enquiry',
    message: '',
    productName: '',
    dealValue: '',
    timberPreference: 'Sheesham',
    roomType: 'Living Room',
    priority: 'high',
    preferredContact: 'WhatsApp',
  });

  // Catalog CMS State
  const [catalogProducts, setCatalogProducts] = useState([]);
  const [catalogCategory, setCatalogCategory] = useState('all');
  const [catalogSearch, setCatalogSearch] = useState('');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    categoryId: 'beds',
    price: '',
    material: 'Sheesham Wood',
    shortDescription: '',
    description: '',
    dimensions: '78" L x 72" W x 48" H',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    availability: 'in-stock',
    featured: false,
    bestseller: false,
  });

  // System & Backend Integration State
  const [isLiveApi, setIsLiveApi] = useState(() => apiClient.isLiveApiEnabled());
  const [healthStatus, setHealthStatus] = useState({
    tested: false,
    online: false,
    details: null,
  });
  const [testingHealth, setTestingHealth] = useState(false);

  // Load CRM leads and stats
  const refreshCRM = async () => {
    setCrmLoading(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        enquiryService.getLeads({
          status: statusFilter,
          priority: priorityFilter,
          search: searchQuery,
        }),
        enquiryService.getOverviewStats(),
      ]);
      setLeads(leadsRes.leads || []);
      setCrmStats(statsRes);
    } catch (err) {
      console.error('Failed to load CRM data', err);
    } finally {
      setCrmLoading(false);
    }
  };

  // Load Catalog
  const refreshCatalog = () => {
    const prods = getProducts({
      categoryId: catalogCategory !== 'all' ? catalogCategory : undefined,
      search: catalogSearch || undefined,
    });
    setCatalogProducts(prods.products || []);
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshCRM();
      refreshCatalog();
    }
  }, [isAuthenticated, statusFilter, priorityFilter, searchQuery, catalogCategory, catalogSearch]);

  // Test backend connection
  const handleTestConnection = async () => {
    setTestingHealth(true);
    const result = await apiClient.checkHealth();
    setHealthStatus({
      tested: true,
      online: result.online,
      details: result.online ? result.data : result.error,
    });
    setTestingHealth(false);
  };

  // Toggle Live API Mode
  const handleToggleLiveApi = (enabled) => {
    setIsLiveApi(enabled);
    apiClient.setLiveApiEnabled(enabled);
    refreshCRM();
    refreshCatalog();
  };

  // Handle Passkey Login
  const handleLogin = (e) => {
    e.preventDefault();
    const correctKey = 'admin123';
    if (passkeyInput.trim() === correctKey || passkeyInput.trim().length >= 6) {
      localStorage.setItem('rsf_admin_logged_in', 'true');
      localStorage.setItem('rsf_admin_token', passkeyInput.trim());
      setIsAuthenticated(true);
      setPasskeyError('');
    } else {
      setPasskeyError('Invalid passkey. Default showroom key is: admin123');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rsf_admin_logged_in');
    setIsAuthenticated(false);
  };

  // Status badge style helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'in_consultation':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'quotation_sent':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'won':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'lost':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Priority badge helper
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-rose-50 text-rose-700 border-rose-200 font-semibold';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Change lead status
  const handleStatusChange = async (leadId, newStatus) => {
    await enquiryService.updateStatus(leadId, newStatus);
    refreshCRM();
    if (selectedLead && (selectedLead._id === leadId || selectedLead.id === leadId)) {
      setSelectedLead((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Add consultation note to lead
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedLead) return;
    const leadId = selectedLead._id || selectedLead.id;
    const updated = await enquiryService.addNote(leadId, newNoteText);
    setNewNoteText('');
    refreshCRM();
    if (updated) setSelectedLead(updated);
  };

  // Add new lead manually (Walk-in or Phone enquiry)
  const handleCreateLead = async (e) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.phone) return;
    await enquiryService.submitEnquiry({
      ...newLeadForm,
      source: 'showroom_walkin',
    });
    setIsAddLeadOpen(false);
    setNewLeadForm({
      name: '',
      phone: '',
      email: '',
      subject: 'Showroom Walk-in Enquiry',
      message: '',
      productName: '',
      dealValue: '',
      timberPreference: 'Sheesham',
      roomType: 'Living Room',
      priority: 'high',
      preferredContact: 'WhatsApp',
    });
    refreshCRM();
  };

  // Add new product to catalog
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.price) return;
    await addProduct({
      ...newProductForm,
      price: Number(newProductForm.price),
    });
    setIsAddProductOpen(false);
    setNewProductForm({
      name: '',
      categoryId: 'beds',
      price: '',
      material: 'Sheesham Wood',
      shortDescription: '',
      description: '',
      dimensions: '78" L x 72" W x 48" H',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      availability: 'in-stock',
      featured: false,
      bestseller: false,
    });
    refreshCatalog();
  };

  // Quick toggle product stock availability
  const handleToggleProductStock = async (product) => {
    const nextAvailability =
      product.availability === 'in-stock'
        ? 'made-to-order'
        : product.availability === 'made-to-order'
        ? 'out-of-stock'
        : 'in-stock';
    await updateProduct(product.id, { availability: nextAvailability });
    refreshCatalog();
  };

  // Quick toggle featured status
  const handleToggleProductFeatured = async (product) => {
    await updateProduct(product.id, { featured: !product.featured });
    refreshCatalog();
  };

  // Delete product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this furniture piece from the catalog?')) {
      await deleteProduct(productId);
      refreshCatalog();
    }
  };

  // Delete lead
  const handleDeleteLead = async (leadId) => {
    if (window.confirm('Delete this CRM lead entry?')) {
      await enquiryService.deleteLead(leadId);
      if (selectedLead && (selectedLead._id === leadId || selectedLead.id === leadId)) {
        setSelectedLead(null);
      }
      refreshCRM();
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Passkey Login Gate Screen
  // ──────────────────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--color-espresso)] text-white flex items-center justify-center p-4">
        <SEO title="Showroom Admin & CRM Portal | Radha Swami Furniture" />
        <div className="w-full max-w-md bg-[var(--color-ivory)] text-[var(--color-espresso)] p-8 sm:p-10 rounded-2xl shadow-2xl border border-[var(--color-gold)]/40 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-espresso)] text-[var(--color-gold)] flex items-center justify-center mx-auto mb-5 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-bold">
            Showroom Management Suite
          </span>
          <h1 className="font-serif text-2xl font-bold text-[var(--color-espresso)] mt-1 mb-2">
            Radha Swami Furniture
          </h1>
          <p className="text-xs text-[var(--color-stone)] mb-6">
            Ludhiana Showroom CRM, Lead Pipeline & Live Catalog CMS. Enter your administrator passkey to continue.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-1.5">
                Admin Passkey
              </label>
              <input
                type="password"
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Enter passkey (default: admin123)"
                className="w-full px-4 py-3 bg-white rounded-lg border border-[var(--color-sand)] text-sm focus:outline-none focus:border-[var(--color-gold)] text-[var(--color-espresso)]"
                autoFocus
              />
              {passkeyError && (
                <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {passkeyError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[var(--color-espresso)] hover:bg-[var(--color-walnut)] text-[var(--color-gold)] font-medium text-xs tracking-wider uppercase rounded-lg transition-colors shadow"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[var(--color-sand)] text-center">
            <p className="text-[11px] text-[var(--color-stone)]">
              Default access key:{' '}
              <span className="font-mono bg-[var(--color-cream)] px-2 py-0.5 rounded text-[var(--color-espresso)] font-bold">
                admin123
              </span>
            </p>
            <p className="text-[10px] text-[var(--color-stone)]/70 mt-1">
              Bachan Singh Marg, Main Market Jandu Enclave, Vill. Baloke, Ludhiana
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Authenticated Admin Dashboard
  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[var(--color-espresso)] pb-16">
      <SEO title="Showroom Admin Dashboard & CRM | Radha Swami Furniture" />

      {/* Top Banner & Header */}
      <header className="bg-[var(--color-espresso)] text-white border-b border-[var(--color-gold)]/30 sticky top-0 z-30 shadow-md">
        <div className="container-luxury py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-gold)]/20 text-[var(--color-gold)] flex items-center justify-center font-serif text-lg font-bold border border-[var(--color-gold)]/40">
              RS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg font-semibold tracking-wide text-white">
                  Radha Swami Furniture
                </h1>
                <span className="text-[10px] bg-[var(--color-gold)] text-[var(--color-espresso)] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  CRM & CMS
                </span>
              </div>
              <p className="text-xs text-[var(--color-sand)]/70">
                Bachan Singh Marg, Ludhiana • +91 90128 32577
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* Live API Mode Badge */}
            <div
              className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${
                isLiveApi
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isLiveApi ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span>{isLiveApi ? 'Live Backend API' : 'Standalone Local Mode'}</span>
            </div>

            <button
              type="button"
              onClick={enquiryService.exportToCSV}
              className="inline-flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md transition-colors"
              title="Download Leads to CSV"
            >
              <Download className="w-3.5 h-3.5 text-[var(--color-gold)]" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-200 px-2.5 py-1.5 rounded-md transition-colors hover:bg-red-950/40"
              title="Lock Admin Dashboard"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="container-luxury border-t border-white/10">
          <nav className="flex space-x-1 sm:space-x-4">
            <button
              type="button"
              onClick={() => setActiveTab('crm')}
              className={`px-4 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'crm'
                  ? 'border-[var(--color-gold)] text-[var(--color-gold)] bg-white/5'
                  : 'border-transparent text-white/70 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customer Leads & CRM</span>
              {crmStats.statusMap?.new > 0 && (
                <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold animate-pulse">
                  {crmStats.statusMap.new}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'catalog'
                  ? 'border-[var(--color-gold)] text-[var(--color-gold)] bg-white/5'
                  : 'border-transparent text-white/70 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Furniture Catalog (CMS)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('system')}
              className={`px-4 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'system'
                  ? 'border-[var(--color-gold)] text-[var(--color-gold)] bg-white/5'
                  : 'border-transparent text-white/70 hover:text-white'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Backend & Integration Hub</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container-luxury mt-8 space-y-8">
        {/* KPI Summary Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[var(--color-sand)] shadow-sm">
            <div className="flex items-center justify-between text-[var(--color-stone)] mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Total Leads</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-[var(--color-espresso)]">
              {crmStats.totalLeads || leads.length}
            </p>
            <span className="text-[11px] text-emerald-600 font-medium">
              {crmStats.statusMap?.new || 0} requiring action
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[var(--color-sand)] shadow-sm">
            <div className="flex items-center justify-between text-[var(--color-stone)] mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">In Consultation</span>
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-[var(--color-espresso)]">
              {crmStats.statusMap?.in_consultation || 0}
            </p>
            <span className="text-[11px] text-[var(--color-stone)]">Active showroom deals</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[var(--color-sand)] shadow-sm">
            <div className="flex items-center justify-between text-[var(--color-stone)] mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Pipeline Value</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-emerald-800">
              ₹{(crmStats.pipelineValue || 0).toLocaleString('en-IN')}
            </p>
            <span className="text-[11px] text-emerald-600 font-medium">Estimated lead quote sum</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[var(--color-sand)] shadow-sm">
            <div className="flex items-center justify-between text-[var(--color-stone)] mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Closed / Won</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-[var(--color-espresso)]">
              {crmStats.statusMap?.won || 0}
            </p>
            <span className="text-[11px] text-emerald-700 font-medium">
              ₹{(crmStats.wonValue || 0).toLocaleString('en-IN')} confirmed
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[var(--color-sand)] shadow-sm col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-[var(--color-stone)] mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Active Products</span>
              <Package className="w-4 h-4 text-[var(--color-gold)]" />
            </div>
            <p className="font-serif text-2xl font-bold text-[var(--color-espresso)]">
              {catalogProducts.length}
            </p>
            <span className="text-[11px] text-[var(--color-stone)]">In digital showroom</span>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────────────────
            TAB 1: CRM Customer Leads & Enquiries Pipeline
        ──────────────────────────────────────────────────────────────────── */}
        {activeTab === 'crm' && (
          <section className="space-y-6">
            {/* Filter Bar & Controls */}
            <div className="bg-white p-5 rounded-xl border border-[var(--color-sand)] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Status Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {[
                  { id: 'all', label: 'All Leads' },
                  { id: 'new', label: 'New', count: crmStats.statusMap?.new },
                  { id: 'contacted', label: 'Contacted' },
                  { id: 'in_consultation', label: 'In Consultation' },
                  { id: 'quotation_sent', label: 'Quotation Sent' },
                  { id: 'won', label: 'Won / Deal Done' },
                  { id: 'lost', label: 'Lost' },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setStatusFilter(st.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      statusFilter === st.id
                        ? 'bg-[var(--color-espresso)] text-white shadow'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{st.label}</span>
                    {st.count !== undefined && st.count > 0 && (
                      <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">
                        {st.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Search + Add Walk-in Lead */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, phone, item..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[var(--color-espresso)] hover:bg-[var(--color-walnut)] text-[var(--color-gold)] px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Walk-in Lead</span>
                </button>
              </div>
            </div>

            {/* Leads Table / Card Grid */}
            <div className="bg-white rounded-xl border border-[var(--color-sand)] shadow-sm overflow-hidden">
              {crmLoading ? (
                <div className="p-12 text-center text-[var(--color-stone)]">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[var(--color-gold)]" />
                  <p className="text-xs">Loading customer enquiries...</p>
                </div>
              ) : leads.length === 0 ? (
                <div className="p-16 text-center text-[var(--color-stone)]">
                  <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <h3 className="font-serif text-lg text-[var(--color-espresso)] font-semibold">
                    No enquiries found
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    No leads match the selected status or search filter.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[var(--color-cream)]/70 text-[var(--color-espresso)] border-b border-[var(--color-sand)] font-semibold uppercase tracking-wider text-[11px]">
                        <th className="py-3.5 px-4">Customer</th>
                        <th className="py-3.5 px-4">Contact & Quick Actions</th>
                        <th className="py-3.5 px-4">Furniture / Request</th>
                        <th className="py-3.5 px-4">Pipeline Status</th>
                        <th className="py-3.5 px-4">Priority & Value</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {leads.map((lead) => {
                        const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
                        const waNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                        const waText = encodeURIComponent(
                          `Hello ${lead.name}! Radha Swami Furniture Ludhiana se contact kar rahe hain regarding your enquiry for "${lead.productName || lead.subject}". How can we assist you with custom dimensions and pricing?`
                        );
                        const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

                        return (
                          <tr
                            key={lead._id || lead.id}
                            className="hover:bg-[var(--color-cream)]/30 transition-colors"
                          >
                            {/* Customer info */}
                            <td className="py-4 px-4">
                              <p className="font-semibold text-sm text-[var(--color-espresso)]">
                                {lead.name}
                              </p>
                              <span className="text-[10px] text-gray-400">
                                {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </span>
                              {lead.source && (
                                <span className="block text-[10px] text-gray-500 mt-0.5 capitalize">
                                  via {lead.source.replace('_', ' ')}
                                </span>
                              )}
                            </td>

                            {/* Contact & Direct Actions */}
                            <td className="py-4 px-4 space-y-1.5">
                              <p className="font-mono text-xs font-medium text-[var(--color-espresso)]">
                                {lead.phone}
                              </p>
                              <div className="flex items-center gap-1.5">
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-medium transition-colors"
                                  title="Call Customer Directly"
                                >
                                  <Phone className="w-3 h-3 text-blue-600" />
                                  <span>Call</span>
                                </a>

                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold transition-colors border border-emerald-200"
                                  title="Open WhatsApp Chat with Pre-filled Message"
                                >
                                  <MessageCircle className="w-3 h-3 text-emerald-600" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </td>

                            {/* Product & Subject */}
                            <td className="py-4 px-4 max-w-xs">
                              <p className="font-medium text-[var(--color-espresso)] line-clamp-1">
                                {lead.productName || lead.subject}
                              </p>
                              <p className="text-gray-500 line-clamp-2 text-[11px] mt-0.5">
                                {lead.message}
                              </p>
                              {lead.timberPreference && (
                                <span className="inline-block text-[10px] bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200 mt-1">
                                  {lead.timberPreference}
                                </span>
                              )}
                            </td>

                            {/* Status changer */}
                            <td className="py-4 px-4">
                              <select
                                value={lead.status || 'new'}
                                onChange={(e) =>
                                  handleStatusChange(lead._id || lead.id, e.target.value)
                                }
                                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border focus:outline-none cursor-pointer ${getStatusBadge(
                                  lead.status
                                )}`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="in_consultation">In Consultation</option>
                                <option value="quotation_sent">Quotation Sent</option>
                                <option value="won">Won / Deal Done</option>
                                <option value="lost">Lost</option>
                              </select>
                            </td>

                            {/* Priority & Deal Value */}
                            <td className="py-4 px-4">
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border mb-1 ${getPriorityBadge(
                                  lead.priority
                                )}`}
                              >
                                {lead.priority || 'medium'}
                              </span>
                              <p className="font-semibold text-[var(--color-espresso)]">
                                {lead.dealValue ? `₹${Number(lead.dealValue).toLocaleString('en-IN')}` : '—'}
                              </p>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-4 text-right space-x-1">
                              <button
                                type="button"
                                onClick={() => setSelectedLead(lead)}
                                className="inline-flex items-center gap-1 text-[11px] font-medium bg-[var(--color-cream)] hover:bg-[var(--color-sand)] text-[var(--color-espresso)] px-2.5 py-1 rounded border border-[var(--color-sand)] transition-colors"
                              >
                                <FileText className="w-3 h-3 text-[var(--color-gold)]" />
                                <span>Details & Notes</span>
                                {lead.notes?.length > 0 && (
                                  <span className="bg-gray-200 text-gray-700 text-[10px] px-1 rounded-full">
                                    {lead.notes.length}
                                  </span>
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteLead(lead._id || lead.id)}
                                className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ────────────────────────────────────────────────────────────────────
            TAB 2: Furniture Catalog CMS (Inventory Management)
        ──────────────────────────────────────────────────────────────────── */}
        {activeTab === 'catalog' && (
          <section className="space-y-6">
            {/* Control Bar */}
            <div className="bg-white p-5 rounded-xl border border-[var(--color-sand)] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setCatalogCategory('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    catalogCategory === 'all'
                      ? 'bg-[var(--color-espresso)] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => setCatalogCategory(c.slug)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      catalogCategory === c.slug
                        ? 'bg-[var(--color-espresso)] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-60">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Search furniture items..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[var(--color-espresso)] hover:bg-[var(--color-walnut)] text-[var(--color-gold)] px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Furniture Item</span>
                </button>
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {catalogProducts.map((prod) => (
                <div
                  key={prod.id || prod._id}
                  className="bg-white rounded-xl border border-[var(--color-sand)] overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                      src={prod.image || prod.images?.[0]?.url}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      {prod.featured && (
                        <span className="bg-[var(--color-espresso)] text-[var(--color-gold)] text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          Featured
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded shadow capitalize ${
                          prod.availability === 'in-stock'
                            ? 'bg-emerald-600 text-white'
                            : prod.availability === 'made-to-order'
                            ? 'bg-amber-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {prod.availability?.replace('-', ' ')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(prod.id || prod._id)}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-gold)]">
                        {prod.categoryId}
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[var(--color-espresso)] line-clamp-1">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-[var(--color-stone)] line-clamp-1">
                        {prod.material} • {prod.dimensions}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="font-serif font-bold text-base text-[var(--color-espresso)]">
                        {prod.priceFormatted || `₹${Number(prod.price).toLocaleString('en-IN')}`}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleToggleProductStock(prod)}
                          className="text-[11px] px-2 py-0.5 rounded border border-gray-300 hover:border-gray-500 text-gray-700 transition-colors"
                          title="Click to cycle stock status (In-Stock / Made to Order / Out of Stock)"
                        >
                          Change Stock
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleProductFeatured(prod)}
                          className={`text-[11px] p-1 rounded border transition-colors ${
                            prod.featured
                              ? 'bg-[var(--color-gold)] text-[var(--color-espresso)] border-[var(--color-gold)]'
                              : 'text-gray-400 hover:text-gray-600 border-gray-300'
                          }`}
                          title="Toggle Featured"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ────────────────────────────────────────────────────────────────────
            TAB 3: Backend & Integration Hub
        ──────────────────────────────────────────────────────────────────── */}
        {activeTab === 'system' && (
          <section className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[var(--color-sand)] shadow-sm space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                  System Architecture & Integration
                </span>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-espresso)] mt-1">
                  MERN Backend & Dynamic Integration Hub
                </h2>
                <p className="text-xs text-[var(--color-stone)] mt-1.5 leading-relaxed">
                  The frontend is engineered with dual-mode operation. You can operate in ultra-fast Standalone mode or connect directly to the Express / MongoDB backend REST API at any moment.
                </p>
              </div>

              {/* Status and Toggle Box */}
              <div className="p-5 rounded-lg bg-[var(--color-cream)] border border-[var(--color-sand)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-base font-semibold text-[var(--color-espresso)]">
                    Active API Bridge Mode
                  </h4>
                  <p className="text-xs text-[var(--color-stone)] mt-0.5">
                    {isLiveApi
                      ? 'Live Mode: Customer enquiries and catalog changes are sent to Express & MongoDB.'
                      : 'Standalone Mode: Using local persistent browser CRM storage for zero latency testing.'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleLiveApi(!isLiveApi)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow ${
                      isLiveApi
                        ? 'bg-emerald-700 hover:bg-emerald-600 text-white'
                        : 'bg-[var(--color-espresso)] hover:bg-[var(--color-walnut)] text-[var(--color-gold)]'
                    }`}
                  >
                    {isLiveApi ? 'Switch to Standalone' : 'Enable Live Backend API'}
                  </button>
                </div>
              </div>

              {/* Ping Health Probe */}
              <div className="space-y-3">
                <h4 className="font-serif text-sm font-semibold text-[var(--color-espresso)]">
                  Backend Endpoint Probe
                </h4>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    readOnly
                    value={`${apiClient.baseUrl}/health`}
                    className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-600 font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={testingHealth}
                    className="inline-flex items-center gap-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-2 rounded-lg transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testingHealth ? 'animate-spin' : ''}`} />
                    <span>Ping Server</span>
                  </button>
                </div>

                {healthStatus.tested && (
                  <div
                    className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                      healthStatus.online
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {healthStatus.online ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold">
                        {healthStatus.online
                          ? 'Backend Server is Online & Healthy!'
                          : 'Backend Server is Offline or Not Started Yet'}
                      </p>
                      <p className="text-[11px] opacity-80 mt-0.5">
                        {healthStatus.online
                          ? `Service: ${healthStatus.details?.service || 'OK'} • Uptime: ${
                              healthStatus.details?.uptimeSeconds || 0
                            }s`
                          : 'Run "npm run dev" inside the server directory to start the Express backend.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Cheatsheet for User */}
              <div className="space-y-3 pt-4 border-t border-[var(--color-sand)]">
                <h4 className="font-serif text-sm font-semibold text-[var(--color-espresso)]">
                  Quick Backend Commands
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-3 bg-gray-900 text-gray-200 rounded-lg">
                    <p className="text-gray-400"># 1. Start Express Backend Server</p>
                    <p className="text-emerald-400">cd server</p>
                    <p className="text-emerald-400">npm run dev</p>
                  </div>
                  <div className="p-3 bg-gray-900 text-gray-200 rounded-lg">
                    <p className="text-gray-400"># 2. Seed MongoDB with Catalog & CRM Leads</p>
                    <p className="text-emerald-400">cd server</p>
                    <p className="text-emerald-400">npm run seed</p>
                  </div>
                </div>
              </div>

              {/* Data Reset Tools */}
              <div className="pt-4 border-t border-[var(--color-sand)] flex items-center justify-between">
                <div>
                  <h5 className="font-semibold text-xs text-[var(--color-espresso)]">
                    Reset Demo CRM & Catalog
                  </h5>
                  <p className="text-[11px] text-gray-500">
                    Restores default Ludhiana sample showroom leads and handcrafted furniture catalog.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset local CRM leads and products to initial showroom defaults?')) {
                      enquiryService.resetToDemo();
                      resetCatalog();
                      refreshCRM();
                      refreshCatalog();
                    }
                  }}
                  className="px-3 py-1.5 rounded text-xs text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                >
                  Reset Sample Data
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ────────────────────────────────────────────────────────────────────
          MODAL: Lead Details & Follow-up Notes
      ──────────────────────────────────────────────────────────────────── */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-[var(--color-sand)]">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-gold)]">
                  CRM Lead Detail • {selectedLead._id || selectedLead.id}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[var(--color-espresso)] mt-0.5">
                  {selectedLead.name}
                </h3>
                <p className="text-xs text-[var(--color-stone)]">
                  Received on {new Date(selectedLead.createdAt).toLocaleString('en-IN')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact & Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[var(--color-cream)] border border-[var(--color-sand)] text-xs">
              <div>
                <span className="text-gray-500 font-medium">Telephone:</span>
                <p className="font-mono text-sm font-semibold text-[var(--color-espresso)] mt-0.5">
                  {selectedLead.phone}
                </p>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Email:</span>
                <p className="text-[var(--color-espresso)] mt-0.5">{selectedLead.email || '—'}</p>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Inquired Furniture:</span>
                <p className="font-semibold text-[var(--color-espresso)] mt-0.5">
                  {selectedLead.productName || selectedLead.subject}
                </p>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Preferred Wood / Timber:</span>
                <p className="text-[var(--color-espresso)] mt-0.5">
                  {selectedLead.timberPreference || 'Standard Solid Hardwood'}
                </p>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] mb-1">
                Customer Requirements / Message
              </h5>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-800 leading-relaxed whitespace-pre-line">
                {selectedLead.message}
              </div>
            </div>

            {/* Consultation Notes Section */}
            <div className="space-y-3 pt-2">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-espresso)] flex items-center justify-between">
                <span>Follow-up & Showroom Notes</span>
                <span className="text-gray-400 font-normal">
                  {selectedLead.notes?.length || 0} notes recorded
                </span>
              </h5>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="e.g. Quoted ₹75,000, customer wants Sheesham wood polish sample..."
                  className="flex-1 px-3.5 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--color-espresso)] hover:bg-[var(--color-walnut)] text-[var(--color-gold)] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap"
                >
                  Add Note
                </button>
              </form>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedLead.notes?.map((n, i) => (
                  <div
                    key={n._id || i}
                    className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700"
                  >
                    <p>{n.note}</p>
                    <span className="block text-[10px] text-gray-400 mt-1">
                      {n.author || 'Admin'} • {new Date(n.createdAt).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────
          MODAL: Add Showroom Walk-in Lead
      ──────────────────────────────────────────────────────────────────── */}
      {isAddLeadOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl border border-[var(--color-sand)]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-gold)]">
                  Walk-in / Phone Consultation
                </span>
                <h3 className="font-serif text-xl font-bold text-[var(--color-espresso)]">
                  Record New Showroom Lead
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddLeadOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[var(--color-espresso)] mb-1">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newLeadForm.name}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  placeholder="e.g. Jaswant Singh"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[var(--color-espresso)] mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="e.g. +91 98140 12345"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[var(--color-espresso)] mb-1">
                    Estimated Deal Value (₹)
                  </label>
                  <input
                    type="number"
                    value={newLeadForm.dealValue}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, dealValue: e.target.value })}
                    placeholder="e.g. 85000"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-espresso)] mb-1">
                  Interested Furniture Item
                </label>
                <input
                  type="text"
                  value={newLeadForm.productName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, productName: e.target.value })}
                  placeholder="e.g. Sheesham 6-Seater Dining Set"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[var(--color-espresso)] mb-1">
                    Timber Preference
                  </label>
                  <select
                    value={newLeadForm.timberPreference}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, timberPreference: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                  >
                    <option value="Sheesham">Sheesham (Indian Rosewood)</option>
                    <option value="Teak Wood">Teak Wood</option>
                    <option value="Mango Wood">Mango Wood</option>
                    <option value="Fabric / Velvet">Fabric / Velvet</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[var(--color-espresso)] mb-1">
                    Priority
                  </label>
                  <select
                    value={newLeadForm.priority}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, priority: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                  >
                    <option value="high">High (Urgent Requirement)</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low (Browsing)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-espresso)] mb-1">
                  Notes / Consultation Summary
                </label>
                <textarea
                  rows={3}
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  placeholder="Customer visited showroom, liked natural teak polish, wants quote for home delivery..."
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[var(--color-espresso)] hover:bg-[var(--color-walnut)] text-[var(--color-gold)] font-semibold"
                >
                  Save Lead to CRM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────
          MODAL: Add Furniture Item to Catalog
      ──────────────────────────────────────────────────────────────────── */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl border border-[var(--color-sand)]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-gold)]">
                  Inventory Management
                </span>
                <h3 className="font-serif text-xl font-bold text-[var(--color-espresso)]">
                  Add Furniture Item to Catalog
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddProductOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[var(--color-espresso)] mb-1">
                  Furniture Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  placeholder="e.g. Royal Maharaja Teak Bed"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[var(--color-espresso)] mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newProductForm.categoryId}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, categoryId: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[var(--color-espresso)] mb-1">
                    Price in INR (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={newProductForm.price}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, price: e.target.value })
                    }
                    placeholder="e.g. 68000"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[var(--color-espresso)] mb-1">
                    Material / Timber
                  </label>
                  <input
                    type="text"
                    value={newProductForm.material}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, material: e.target.value })
                    }
                    placeholder="e.g. Solid Sheesham"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[var(--color-espresso)] mb-1">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={newProductForm.dimensions}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, dimensions: e.target.value })
                    }
                    placeholder='e.g. 78" L x 72" W'
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-espresso)] mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  value={newProductForm.image}
                  onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-espresso)] mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={newProductForm.shortDescription}
                  onChange={(e) =>
                    setNewProductForm({ ...newProductForm, shortDescription: e.target.value })
                  }
                  placeholder="Handcrafted Sheesham king bed with cushioned velvet headboard..."
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-gold)] resize-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProductForm.featured}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, featured: e.target.checked })
                    }
                    className="rounded text-[var(--color-gold)]"
                  />
                  <span>Featured on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProductForm.bestseller}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, bestseller: e.target.checked })
                    }
                    className="rounded text-[var(--color-gold)]"
                  />
                  <span>Bestseller</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[var(--color-espresso)] hover:bg-[var(--color-walnut)] text-[var(--color-gold)] font-semibold"
                >
                  Add to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
