import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  IndianRupee,
  Search,
  Trash2,
  RefreshCw,
  Plus,
  Phone,
  LogOut,
  X,
  Database,
  Code2,
  Copy,
  Check,
  AlertTriangle
} from 'lucide-react';
import { Booking, BookingStatus } from '../types';
import {
  fetchLiveBookings,
  updateLiveBookingStatus,
  deleteLiveBooking,
  createLiveBooking,
  resetToDemoBookings,
  computeKPIs
} from '../services/storage';
import { supabase, SUPABASE_SQL_SCHEMA } from '../services/supabase';
import { SEATING_AREAS, TIME_SLOTS } from '../data/businessData';

interface AdminPortalProps {
  onLogout: () => void;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onLogout, onClose }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');
  const [isAddingBooking, setIsAddingBooking] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string>('');
  const [backendSource, setBackendSource] = useState<'supabase' | 'local'>('local');
  const [isLoading, setIsLoading] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [sqlCopied, setSqlCopied] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  // Add Walk-in reservation form state
  const todayStr = new Date().toISOString().split('T')[0];
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newGuests, setNewGuests] = useState(4);
  const [newDate, setNewDate] = useState(todayStr);
  const [newTimeSlot, setNewTimeSlot] = useState('08:00 PM');
  const [newServiceName, setNewServiceName] = useState('Zafrani Mutton Dum Biryani Special');
  const [newDiningArea, setNewDiningArea] = useState<Booking['diningArea']>('Main AC Family Hall');

  const loadData = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const res = await fetchLiveBookings();
      setBookings(res.data);
      setBackendSource(res.source);
      if (res.error) {
        setBackendError(res.error);
      } else {
        setBackendError(null);
      }
    } catch (err: any) {
      console.error('Error loading live bookings:', err);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);

    // Subscribe to live postgres changes from Supabase
    const channel = supabase
      .channel('pista-house-admin-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        (payload) => {
          console.log('Real-time Supabase update received:', payload);
          loadData(false);
          showFeedback('Live update received from Supabase database.');
        }
      )
      .subscribe();

    const handleStorageChange = () => {
      loadData(false);
    };

    window.addEventListener('bookings-changed', handleStorageChange);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('bookings-changed', handleStorageChange);
    };
  }, []);

  // Compute KPIs
  const kpis = useMemo(() => computeKPIs(bookings), [bookings]);

  // Filter & Search
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.customerName.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.serviceName.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [bookings, statusFilter, searchQuery]);

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
    // Optimistic UI update
    setBookings(prev => prev.map(b => (b.id === id ? { ...b, status: newStatus } : b)));
    
    const result = await updateLiveBookingStatus(id, newStatus);
    if (result.source === 'supabase') {
      showFeedback(`Booking ${id} status updated to "${newStatus}" in Supabase.`);
    } else {
      showFeedback(`Booking ${id} marked as "${newStatus}" (cached locally).`);
    }
    loadData(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(`Are you sure you want to delete reservation ${id}?`)) {
      setBookings(prev => prev.filter(b => b.id !== id));
      const res = await deleteLiveBooking(id);
      if (res.source === 'supabase') {
        showFeedback(`Reservation ${id} deleted from Supabase.`);
      } else {
        showFeedback(`Reservation ${id} removed.`);
      }
      loadData(false);
    }
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset local cache to realistic initial demo records?')) {
      const reset = resetToDemoBookings();
      setBookings(reset);
      showFeedback('Restored default demo records.');
    }
  };

  const showFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(''), 3500);
  };

  const handleCreateWalkin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName.trim() || !newPhone.trim()) return;

    setIsLoading(true);
    const res = await createLiveBooking({
      customerName: newCustomerName.trim(),
      phone: newPhone.startsWith('+91') ? newPhone : `+91 ${newPhone.trim()}`,
      guests: newGuests,
      date: newDate,
      timeSlot: newTimeSlot,
      serviceName: newServiceName,
      diningArea: newDiningArea,
      estimatedBill: newGuests * 450
    });

    setIsAddingBooking(false);
    setNewCustomerName('');
    setNewPhone('');
    setIsLoading(false);
    
    if (res.source === 'supabase') {
      showFeedback(`Walk-in reservation ${res.booking.id} synced live to Supabase!`);
    } else {
      showFeedback(`Reservation ${res.booking.id} created.`);
    }
    loadData(false);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 2500);
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle className="w-3.5 h-3.5" />
            Confirmed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/50 text-emerald-300 border border-emerald-500/30">
            <CheckCircle className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" />
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] text-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Management Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-white/10 bg-[#1E293B]/85 shadow-xl">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-[#34D399] uppercase tracking-wider">
                Management Operations Console
              </span>

              {/* Supabase backend status indicator */}
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                  backendSource === 'supabase'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    backendSource === 'supabase' ? 'bg-[#10B981] animate-pulse' : 'bg-emerald-400'
                  }`}
                />
                <span>{backendSource === 'supabase' ? 'Supabase Live DB' : 'Local Fallback'}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] mt-1.5">
              Pista House Reservation Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Boduppal & Uppal Dining Operations · Real-Time Table Dispatch
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View SQL Script button */}
            <button
              onClick={() => setShowSqlModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#10B981] hover:text-[#34D399] border border-emerald-500/30 text-xs font-semibold transition-colors cursor-pointer min-h-[42px]"
              title="View copy-pasteable Supabase SQL script"
            >
              <Code2 className="w-4 h-4 text-[#10B981]" />
              <span>Supabase SQL</span>
            </button>

            <button
              onClick={() => setIsAddingBooking(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(5,150,105,0.4)] cursor-pointer min-h-[42px] border border-emerald-400/30"
            >
              <Plus className="w-4 h-4 text-white" />
              <span>New Reservation</span>
            </button>

            <button
              onClick={() => loadData(true)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] border border-white/10 text-xs font-medium transition-colors cursor-pointer min-h-[42px] disabled:opacity-50"
              title="Refresh from Supabase"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#10B981] ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleResetDemo}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] border border-white/10 text-xs font-medium transition-colors cursor-pointer min-h-[42px]"
              title="Restore initial demo mock records"
            >
              <Database className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-medium transition-colors cursor-pointer min-h-[42px]"
              title="Sign out of Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer min-h-[42px] min-w-[42px] flex items-center justify-center"
              aria-label="Return to customer site"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action feedback toast */}
        {actionFeedback && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in duration-200 shadow-lg">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Notice if Supabase table is not yet created */}
        {backendError && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Supabase Schema Setup Needed:</strong> The `bookings` table has not yet been created in your Supabase project (or RLS needs configuring).
                <div className="text-xs text-[#94A3B8] mt-0.5">
                  Click the button on the right to copy the ready-to-use SQL script and run it in your Supabase SQL Editor.
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowSqlModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs transition-colors shrink-0 whitespace-nowrap"
            >
              Copy SQL Script
            </button>
          </div>
        )}

        {/* KPI Metric Cards (4-column desktop, 2-column tablet, 1-column mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl glass-card border border-white/10 bg-[#1E293B]/75 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#94A3B8] font-semibold">
                Total Bookings
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] mt-1 font-mono tabular-nums">
                {kpis.totalBookings}
              </div>
              <div className="text-[11px] text-[#94A3B8] mt-1">Live in database</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#111827] flex items-center justify-center text-[#10B981] border border-white/5">
              <Calendar className="w-6 h-6 text-[#10B981]" />
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-white/10 bg-[#1E293B]/75 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                Pending Requests
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1 font-mono tabular-nums">
                {kpis.pending}
              </div>
              <div className="text-[11px] text-[#94A3B8] mt-1">Awaiting confirmation</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-white/10 bg-[#1E293B]/75 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                Confirmed Tables
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 font-mono tabular-nums">
                {kpis.confirmed}
              </div>
              <div className="text-[11px] text-[#94A3B8] mt-1">Ready for seating</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-white/10 bg-[#1E293B]/75 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#34D399] font-semibold">
                Estimated Revenue
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] mt-1 font-mono tabular-nums">
                ₹{kpis.estimatedRevenue.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1">Active customer spend</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#059669]/20 flex items-center justify-center text-[#10B981] border border-emerald-500/20">
              <IndianRupee className="w-6 h-6 text-[#10B981]" />
            </div>
          </div>
        </div>

        {/* Search, Filter Bar & Controls */}
        <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#1E293B]/85">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by customer name, phone (+91), or reference ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-[#111827] border border-white/10 text-[#F8FAFC] text-xs sm:text-sm focus:outline-none focus:border-[#10B981] min-h-[44px]"
            />
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center overflow-x-auto gap-1.5 pb-1 sm:pb-0 no-scrollbar">
            <div className="flex items-center gap-1 p-1 bg-[#111827] rounded-xl border border-white/5">
              {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap cursor-pointer min-h-[36px] ${
                    statusFilter === st
                      ? 'bg-[#059669] text-white font-bold shadow border border-emerald-400'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden bg-[#1E293B]/85">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#F8FAFC] flex items-center gap-2">
              <span>Active Reservations Management</span>
              <span className="text-xs font-mono font-normal text-[#94A3B8]">
                ({filteredBookings.length} {filteredBookings.length === 1 ? 'record' : 'records'})
              </span>
            </h2>

            <div className="text-xs text-[#94A3B8] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real-Time Sync</span>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Calendar className="w-12 h-12 text-[#94A3B8]/40 mx-auto" />
              <h3 className="font-bold text-[#F8FAFC] text-base">No Bookings Found</h3>
              <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
                No reservations match the selected search query or status filter. Try clearing your filters or create a new booking.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-white/10 text-[#F8FAFC] text-xs hover:bg-white/15"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE VIEW */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#111827]/90 text-[#94A3B8] font-semibold border-b border-white/10">
                    <tr>
                      <th className="py-3.5 px-4">Ref ID / Type</th>
                      <th className="py-3.5 px-4">Customer</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Experience / Seating</th>
                      <th className="py-3.5 px-4">Date & Slot</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-4 font-mono font-medium text-[#10B981]">
                          <div>{b.id}</div>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded ${
                              b.isDemo
                                ? 'bg-[#111827] text-[#94A3B8] border border-white/5'
                                : 'bg-[#059669]/20 text-[#34D399] border border-emerald-500/30 font-semibold'
                            }`}
                          >
                            {b.isDemo ? 'Demo Seed' : 'Live Supabase'}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-[#F8FAFC]">{b.customerName}</div>
                          <div className="text-xs text-[#94A3B8]">{b.guests} Guests</div>
                        </td>

                        <td className="py-4 px-4 font-mono">
                          <a
                            href={`tel:${b.phone}`}
                            className="text-[#94A3B8] hover:text-[#34D399] flex items-center gap-1"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#10B981]" />
                            <span>{b.phone}</span>
                          </a>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-medium text-[#F8FAFC] truncate max-w-[200px]" title={b.serviceName}>
                            {b.serviceName}
                          </div>
                          <div className="text-xs text-[#34D399] truncate max-w-[200px]">
                            {b.diningArea}
                          </div>
                          {b.specialRequests && (
                            <div className="text-[11px] text-[#94A3B8] italic truncate max-w-[200px]" title={b.specialRequests}>
                              Note: {b.specialRequests}
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-4 font-mono">
                          <div className="text-[#F8FAFC]">{b.date}</div>
                          <div className="text-xs text-[#34D399]">{b.timeSlot}</div>
                        </td>

                        <td className="py-4 px-4">
                          {getStatusBadge(b.status)}
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {b.status !== 'confirmed' && (
                              <button
                                onClick={() => handleStatusChange(b.id, 'confirmed')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-semibold transition-colors cursor-pointer"
                                title="Confirm reservation in Supabase"
                              >
                                Confirm
                              </button>
                            )}

                            {b.status === 'confirmed' && (
                              <button
                                onClick={() => handleStatusChange(b.id, 'completed')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 text-xs font-semibold transition-colors border border-emerald-500/30 cursor-pointer"
                                title="Mark as seated / completed in Supabase"
                              >
                                Complete
                              </button>
                            )}

                            {b.status !== 'cancelled' && (
                              <button
                                onClick={() => handleStatusChange(b.id, 'cancelled')}
                                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
                                title="Cancel reservation in Supabase"
                              >
                                Cancel
                              </button>
                            )}

                            <button
                              onClick={() => handleDelete(b.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 transition-colors cursor-pointer"
                              title="Delete record from Supabase"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE RESPONSIVE CARD VIEW */}
              <div className="lg:hidden divide-y divide-white/10 p-4 space-y-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-xl glass-card border border-white/10 space-y-3 bg-[#111827]/70"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#10B981] text-sm">{b.id}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            b.isDemo
                              ? 'bg-[#1E293B] text-[#94A3B8]'
                              : 'bg-[#059669]/20 text-[#34D399] font-semibold border border-emerald-500/30'
                          }`}
                        >
                          {b.isDemo ? 'Demo' : 'Supabase'}
                        </span>
                      </div>
                      <div>{getStatusBadge(b.status)}</div>
                    </div>

                    <div>
                      <div className="font-bold text-base text-[#F8FAFC]">{b.customerName}</div>
                      <div className="text-xs text-[#94A3B8] mt-0.5">
                        {b.guests} Guests · {b.diningArea}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-[#F8FAFC] bg-[#111827] p-2.5 rounded-lg border border-white/5">
                      <div>
                        <span className="text-[#94A3B8]">Date:</span> <div>{b.date}</div>
                      </div>
                      <div>
                        <span className="text-[#94A3B8]">Time:</span> <div className="font-mono text-[#34D399]">{b.timeSlot}</div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#94A3B8]">Experience:</span> <div>{b.serviceName}</div>
                      </div>
                      {b.specialRequests && (
                        <div className="col-span-2 text-[#94A3B8] italic">
                          "{b.specialRequests}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={`tel:${b.phone}`}
                        className="inline-flex items-center gap-1.5 text-xs text-[#34D399] font-mono py-1 px-2 rounded bg-white/5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{b.phone}</span>
                      </a>

                      <div className="flex items-center gap-1.5">
                        {b.status !== 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'confirmed')}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-semibold cursor-pointer"
                          >
                            Confirm
                          </button>
                        )}
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'completed')}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-950/40 text-emerald-300 text-xs font-semibold border border-emerald-500/30 cursor-pointer"
                          >
                            Complete
                          </button>
                        )}
                        {b.status !== 'cancelled' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'cancelled')}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Manual "New Walk-In Reservation" Modal */}
      {isAddingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative z-10 w-full max-w-lg glass-modal rounded-3xl border border-white/12 p-6 shadow-2xl space-y-5 bg-[#1E293B]/95">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-[#F8FAFC]">
                Record Walk-In / Phone Reservation
              </h3>
              <button
                onClick={() => setIsAddingBooking(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateWalkin} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-[#111827] border border-white/10 text-[#F8FAFC] focus:outline-none focus:border-[#10B981]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#111827] border border-white/10 text-[#F8FAFC] font-mono focus:outline-none focus:border-[#10B981]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] uppercase mb-1">
                    Party Size
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={newGuests}
                    onChange={(e) => setNewGuests(parseInt(e.target.value) || 1)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#111827] border border-white/10 text-[#F8FAFC] focus:outline-none focus:border-[#10B981]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] uppercase mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#111827] border border-white/10 text-[#F8FAFC] focus:outline-none focus:border-[#10B981]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] uppercase mb-1">
                    Time Slot
                  </label>
                  <select
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#111827] border border-white/10 text-[#F8FAFC] focus:outline-none focus:border-[#10B981]"
                  >
                    {TIME_SLOTS.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase mb-1">
                  Seating Area
                </label>
                <select
                  value={newDiningArea}
                  onChange={(e) => setNewDiningArea(e.target.value as Booking['diningArea'])}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-[#111827] border border-white/10 text-[#F8FAFC] focus:outline-none focus:border-[#10B981]"
                >
                  {SEATING_AREAS.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingBooking(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-white/5 text-[#94A3B8] hover:text-[#F8FAFC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold shadow-[0_4px_16px_rgba(5,150,105,0.4)] border border-emerald-400/30 disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save to Supabase'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SQL Script Viewer Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative z-10 w-full max-w-2xl glass-modal rounded-3xl border border-white/12 p-6 sm:p-7 shadow-2xl space-y-4 bg-[#1E293B]/95 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#10B981]" />
                <h3 className="text-lg font-bold text-[#F8FAFC]">
                  Supabase SQL Schema Script
                </h3>
              </div>
              <button
                onClick={() => setShowSqlModal(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#94A3B8]">
              Run this SQL script in your Supabase project (<strong>Dashboard → SQL Editor</strong>) to create the <code className="text-[#34D399]">bookings</code> table, enable Row Level Security, and configure public access policies.
            </p>

            <div className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-[#111827]">
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={handleCopySql}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
                >
                  {sqlCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>Copy SQL</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-[11px] font-mono text-emerald-300 overflow-y-auto max-h-[50vh] leading-relaxed">
                {SUPABASE_SQL_SCHEMA}
              </pre>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="text-[11px] text-[#94A3B8]">
                Project URL: <span className="font-mono text-white">https://ovqaazreepckumgfnqpm.supabase.co</span>
              </div>
              <button
                onClick={() => setShowSqlModal(false)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
