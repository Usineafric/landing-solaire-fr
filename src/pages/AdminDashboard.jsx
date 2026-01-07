import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LogOut, Download, Filter, Search, TrendingUp, Users, 
  CheckCircle, XCircle, Clock, Calendar, Mail, Phone,
  Home, MapPin, RefreshCw, Eye, BarChart3
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [eligibilityFilter, setEligibilityFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    eligible: 0,
    today: 0,
    week: 0
  });

  // Check auth
  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_authenticated");
    if (!isAuth) {
      navigate("/admin");
    }
  }, [navigate]);

  // Load leads
  useEffect(() => {
    loadLeads();
  }, []);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [leads, searchTerm, statusFilter, eligibilityFilter, dateFilter]);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLeads(data || []);
      calculateStats(data || []);
    } catch (err) {
      console.error('Erreur chargement leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    setStats({
      total: data.length,
      eligible: data.filter(l => l.is_owner === 'yes' && l.housing_type === 'house').length,
      today: data.filter(l => new Date(l.created_at) >= today).length,
      week: data.filter(l => new Date(l.created_at) >= weekAgo).length
    });
  };

  const applyFilters = () => {
    let filtered = [...leads];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.first_name?.toLowerCase().includes(term) ||
        lead.last_name?.toLowerCase().includes(term) ||
        lead.email?.toLowerCase().includes(term) ||
        lead.phone?.includes(term) ||
        lead.postal_code?.includes(term)
      );
    }

    // Eligibility
    if (eligibilityFilter !== 'all') {
      const isEligible = eligibilityFilter === 'eligible';
      filtered = filtered.filter(lead => 
        (lead.is_owner === 'yes' && lead.housing_type === 'house') === isEligible
      );
    }

    // Date
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(lead => {
        const leadDate = new Date(lead.created_at);
        
        if (dateFilter === 'today') {
          return leadDate >= today;
        } else if (dateFilter === 'week') {
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return leadDate >= weekAgo;
        } else if (dateFilter === 'month') {
          const monthAgo = new Date(today);
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          return leadDate >= monthAgo;
        }
        return true;
      });
    }

    setFilteredLeads(filtered);
  };

  const exportCSV = () => {
    const headers = [
      'Date', 'Prénom', 'Nom', 'Email', 'Téléphone',
      'Code Postal', 'Propriétaire', 'Type Bien', 'Délai', 'Éligible'
    ];

    const rows = filteredLeads.map(lead => {
      const isEligible = lead.is_owner === 'yes' && lead.housing_type === 'house';
      return [
        new Date(lead.created_at).toLocaleDateString('fr-FR'),
        lead.first_name,
        lead.last_name,
        lead.email,
        lead.phone,
        lead.postal_code,
        lead.is_owner === 'yes' ? 'Oui' : 'Non',
        lead.housing_type === 'house' ? 'Maison' : 'Autre',
        lead.timeframe,
        isEligible ? 'Oui' : 'Non'
      ];
    });

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const logout = () => {
    sessionStorage.removeItem("admin_authenticated");
    navigate("/admin");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement des leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container-page py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
                <p className="text-sm text-gray-500 font-light">Gestion des leads solaires</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={loadLeads}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm font-medium">Actualiser</span>
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container-page py-8">
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Leads", value: stats.total, icon: Users, color: "blue" },
            { label: "Éligibles", value: stats.eligible, icon: CheckCircle, color: "green" },
            { label: "Aujourd'hui", value: stats.today, icon: Calendar, color: "orange" },
            { label: "Cette semaine", value: stats.week, icon: TrendingUp, color: "purple" }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <div className={`w-10 h-10 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="flex flex-wrap gap-4">
            
            {/* Search */}
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher (nom, email, téléphone, code postal...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-colors font-light"
                />
              </div>
            </div>

            {/* Eligibility Filter */}
            <select
              value={eligibilityFilter}
              onChange={(e) => setEligibilityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-colors font-light"
            >
              <option value="all">Tous les leads</option>
              <option value="eligible">✅ Éligibles</option>
              <option value="not-eligible">❌ Non éligibles</option>
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition-colors font-light"
            >
              <option value="all">Toutes les dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
            </select>

            {/* Export CSV */}
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span className="font-light">
              {filteredLeads.length} lead{filteredLeads.length > 1 ? 's' : ''} affiché{filteredLeads.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Projet</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Éligibilité</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-light">
                      Aucun lead trouvé
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const isEligible = lead.is_owner === 'yes' && lead.housing_type === 'house';
                    
                    return (
                      <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="font-light text-gray-600">{formatDate(lead.created_at)}</span>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <p className="font-semibold text-gray-900">{lead.first_name} {lead.last_name}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-3 h-3" />
                              <a href={`mailto:${lead.email}`} className="hover:text-orange-600 transition-colors font-light">
                                {lead.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-3 h-3" />
                              <a href={`tel:${lead.phone}`} className="hover:text-orange-600 transition-colors font-light">
                                {lead.phone}
                              </a>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="font-light text-gray-600">{lead.postal_code}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Home className="w-3 h-3 text-gray-400" />
                              <span className="font-light text-gray-600">
                                {lead.housing_type === 'house' ? 'Maison' : 'Autre'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="font-light text-gray-600">{lead.timeframe}</span>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          {isEligible ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                              <CheckCircle className="w-3 h-3" />
                              Éligible
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                              <XCircle className="w-3 h-3" />
                              Non éligible
                            </span>
                          )}
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${lead.email}`}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Envoyer un email"
                            >
                              <Mail className="w-4 h-4" />
                            </a>
                            <a
                              href={`tel:${lead.phone}`}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Appeler"
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}