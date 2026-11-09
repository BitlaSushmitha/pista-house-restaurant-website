import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, Utensils, CheckCircle, ChevronRight, AlertCircle, MessageCircle, Copy, Check } from 'lucide-react';
import { SEATING_AREAS, TIME_SLOTS, MENU_ITEMS, BUSINESS_INFO } from '../data/businessData';
import { Booking } from '../types';
import { createLiveBooking } from '../services/storage';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceName
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [guests, setGuests] = useState<number>(4);
  const [diningArea, setDiningArea] = useState<Booking['diningArea']>('Main AC Family Hall');
  const [serviceName, setServiceName] = useState<string>(preSelectedServiceName || 'Table Reservation (Full A-la-carte Dining)');
  
  // Date & Time
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState<string>(todayStr);
  const [timeSlot, setTimeSlot] = useState<string>('08:00 PM');

  // Customer Info
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Status & Validation
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Reset or initialize when modal opens or preselected service changes
  useEffect(() => {
    if (isOpen) {
      if (preSelectedServiceName) {
        setServiceName(preSelectedServiceName);
      }
      setStep(1);
      setErrorMsg('');
      setConfirmedBooking(null);
      setToastMessage('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, preSelectedServiceName]);

  if (!isOpen) return null;

  const validateStep2 = () => {
    if (!date) {
      setErrorMsg('Please select a valid reservation date.');
      return false;
    }
    if (!timeSlot) {
      setErrorMsg('Please select a time slot.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Please enter the primary guest name.');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number (e.g. 98490 12345).');
      return;
    }

    let baseRate = 450;
    const found = MENU_ITEMS.find(m => m.name.toLowerCase() === serviceName.toLowerCase());
    if (found) baseRate = found.price;
    const estimatedBill = guests * baseRate;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const result = await createLiveBooking({
        customerName: customerName.trim(),
        phone: phone.startsWith('+91') ? phone : `+91 ${phone.trim()}`,
        email: email.trim() || undefined,
        guests,
        date,
        timeSlot,
        serviceName,
        diningArea,
        specialRequests: specialRequests.trim() || undefined,
        estimatedBill
      });

      setConfirmedBooking(result.booking);
      setStep(4);
      
      const toastText = result.source === 'supabase'
        ? `Reservation ${result.booking.id} synced live to Supabase database!`
        : `Reservation ${result.booking.id} recorded successfully (local cache active).`;
      setToastMessage(toastText);
    } catch (err: any) {
      setErrorMsg('Failed to process reservation. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyBookingId = () => {
    if (!confirmedBooking) return;
    navigator.clipboard.writeText(confirmedBooking.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog with Midnight Slate & Emerald Green styling */}
      <div className="relative z-10 w-full sm:max-w-2xl max-h-[100dvh] sm:max-h-[92vh] overflow-y-auto glass-modal sm:rounded-3xl border-0 sm:border border-white/12 shadow-[0_24px_50px_rgba(0,0,0,0.9),0_0_36px_rgba(5,150,105,0.2)] flex flex-col bg-[#111827]/95">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 glass-modal border-b border-white/10 px-5 sm:px-7 py-4 flex items-center justify-between bg-[#111827]/95">
          <div>
            <div className="text-[11px] font-semibold text-[#34D399] uppercase tracking-wider">
              {step === 4 ? 'Reservation Confirmed' : `Step ${step} of 3 · Table Reservation`}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">
              {step === 1 && 'Select Party & Seating Area'}
              {step === 2 && 'Choose Date & Preferred Time'}
              {step === 3 && 'Primary Guest Contact Details'}
              {step === 4 && 'Your Table is Reserved!'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 flex-1 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Guests, Service & Dining Area */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Number of Guests */}
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                  Number of Guests
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 6, 8, 10, 12].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                        guests === num
                          ? 'bg-[#059669] text-white font-bold shadow-[0_2px_12px_rgba(5,150,105,0.5)] border border-emerald-400'
                          : 'bg-[#1E293B]/80 text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC] border border-white/5'
                      }`}
                    >
                      {num} {num === 12 ? '12+' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                  Culinary Experience / Dish Focus
                </label>
                <select
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full py-3 px-4 rounded-xl bg-[#1E293B] border border-white/10 text-[#F8FAFC] text-sm focus:outline-none focus:border-[#10B981] cursor-pointer min-h-[44px]"
                >
                  <option value="Table Reservation (Full A-la-carte Dining)">
                    Table Reservation (Full A-la-carte Dining)
                  </option>
                  <option value="Royal Zafrani Biryani Feast Experience">
                    Royal Zafrani Biryani Feast Experience
                  </option>
                  <option value="World-Famous Haleem & Tandoor Special">
                    World-Famous Haleem & Tandoor Special
                  </option>
                  <option value="High-Tea: Irani Chai, Osmania Biscuits & Apricot Delight">
                    High-Tea: Irani Chai, Osmania Biscuits & Apricot Delight
                  </option>
                  <option value="Family Banquet Celebration / Special Occasion">
                    Family Banquet Celebration / Special Occasion
                  </option>
                  {MENU_ITEMS.map(m => (
                    <option key={m.id} value={m.name}>
                      Specialty: {m.name} (₹{m.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dining Area */}
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                  Preferred Seating Section
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SEATING_AREAS.map(area => (
                    <div
                      key={area.id}
                      onClick={() => setDiningArea(area.id as Booking['diningArea'])}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        diningArea === area.id
                          ? 'bg-[#059669]/20 border-[#10B981] text-[#F8FAFC] shadow-[0_0_16px_rgba(16,185,129,0.25)]'
                          : 'bg-[#1E293B]/60 border-white/5 text-[#94A3B8] hover:bg-[#1E293B] hover:border-white/15'
                      }`}
                    >
                      <div className="font-semibold text-sm flex items-center justify-between">
                        <span>{area.name}</span>
                        {diningArea === area.id && <Check className="w-4 h-4 text-[#10B981]" />}
                      </div>
                      <div className="text-[11px] text-[#94A3B8] mt-1">{area.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-bold bg-[#059669] hover:bg-[#047857] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(5,150,105,0.45)] min-h-[48px] border border-emerald-400/30"
                >
                  <span>Continue to Date & Time</span>
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time Picker */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Date selection */}
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                  Reservation Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#1E293B] border border-white/10 text-[#F8FAFC] text-sm focus:outline-none focus:border-[#10B981] cursor-pointer min-h-[48px]"
                  />
                  <Calendar className="w-4 h-4 text-[#10B981] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[11px] text-[#94A3B8] mt-1">
                  Reservations accepted up to 30 days in advance.
                </p>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                  Select Seating Time Slot (11:00 AM – 11:00 PM)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[44px] flex items-center justify-center font-mono ${
                        timeSlot === slot
                          ? 'bg-[#059669] text-white font-bold shadow-[0_2px_12px_rgba(5,150,105,0.5)] border border-emerald-400'
                          : 'bg-[#1E293B]/80 text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC] border border-white/5'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-[#94A3B8] flex items-center justify-between">
                <div>
                  <span>Guests:</span> <strong className="text-[#F8FAFC]">{guests} Persons</strong>
                </div>
                <div>
                  <span>Area:</span> <strong className="text-[#F8FAFC]">{diningArea}</strong>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3.5 px-4 rounded-xl text-[#94A3B8] bg-[#1E293B]/80 hover:bg-[#1E293B] hover:text-[#F8FAFC] text-xs sm:text-sm font-medium transition-colors cursor-pointer min-h-[48px]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep2()) setStep(3);
                  }}
                  className="w-2/3 py-3.5 px-4 rounded-xl text-white font-bold bg-[#059669] hover:bg-[#047857] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(5,150,105,0.45)] min-h-[48px] border border-emerald-400/30"
                >
                  <span>Continue to Contact</span>
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Customer Information */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-4 animate-in fade-in duration-150">
              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-[#10B981]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Syed Farhan Ali"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full py-3 px-4 rounded-xl bg-[#1E293B] border border-white/10 text-[#F8FAFC] text-sm focus:outline-none focus:border-[#10B981] min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-[#10B981]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98490 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl bg-[#1E293B] border border-white/10 text-[#F8FAFC] text-sm font-mono focus:outline-none focus:border-[#10B981] min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. farhan@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl bg-[#1E293B] border border-white/10 text-[#F8FAFC] text-sm focus:outline-none focus:border-[#10B981] min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">
                  Special Requests / Dietary Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Birthday celebration, high chair required, prefer less spicy salan..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1E293B] border border-white/10 text-[#F8FAFC] text-xs sm:text-sm focus:outline-none focus:border-[#10B981] resize-none"
                />
              </div>

              {/* Booking preview review */}
              <div className="p-4 rounded-xl bg-[#1E293B] border border-white/10 text-xs text-[#94A3B8] space-y-1.5">
                <div className="font-semibold text-[#34D399]">Reservation Summary:</div>
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <span className="font-medium text-[#F8FAFC] truncate max-w-[220px]">{serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Slot:</span>
                  <span className="font-mono text-[#F8FAFC]">{date} at {timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests & Section:</span>
                  <span className="text-[#F8FAFC]">{guests} Guests ({diningArea})</span>
                </div>
              </div>

              {/* Form buttons: Emerald Green CTA */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3.5 px-4 rounded-xl text-[#94A3B8] bg-[#1E293B]/80 hover:bg-[#1E293B] hover:text-[#F8FAFC] text-xs sm:text-sm font-medium transition-colors cursor-pointer min-h-[48px]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-3.5 px-4 rounded-xl text-white font-bold bg-[#059669] hover:bg-[#047857] disabled:opacity-75 disabled:cursor-wait transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(5,150,105,0.45)] min-h-[48px] border border-emerald-400/30"
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span>{isSubmitting ? 'Syncing with Supabase...' : 'Confirm Reservation'}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Confirmation */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
              {toastMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg animate-in fade-in duration-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-medium">{toastMessage}</span>
                </div>
              )}

              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(16,185,129,0.3)]">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-[#F8FAFC]">
                  Reservation Received!
                </h4>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-sm mx-auto">
                  Thank you, <strong className="text-[#F8FAFC]">{confirmedBooking.customerName}</strong>.
                  Your reservation is registered live in our Supabase dining records.
                </p>
              </div>

              {/* Reference ID card with Emerald Green highlight */}
              <div className="p-4 rounded-2xl bg-[#1E293B] border border-[#10B981]/35 max-w-md mx-auto text-left space-y-3 shadow-lg">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs text-[#94A3B8]">Booking Reference</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#10B981] font-bold text-sm tracking-wider">
                      {confirmedBooking.id}
                    </span>
                    <button
                      onClick={copyBookingId}
                      className="p-1 rounded hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
                      title="Copy Reference ID"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#94A3B8]">Date:</span>
                    <div className="font-medium text-[#F8FAFC]">{confirmedBooking.date}</div>
                  </div>
                  <div>
                    <span className="text-[#94A3B8]">Time:</span>
                    <div className="font-medium text-[#F8FAFC] font-mono">{confirmedBooking.timeSlot}</div>
                  </div>
                  <div>
                    <span className="text-[#94A3B8]">Guests:</span>
                    <div className="font-medium text-[#F8FAFC]">{confirmedBooking.guests} People</div>
                  </div>
                  <div>
                    <span className="text-[#94A3B8]">Seating:</span>
                    <div className="font-medium text-[#F8FAFC] truncate">{confirmedBooking.diningArea}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 text-[11px] text-[#94A3B8]">
                  Address: {BUSINESS_INFO.address}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(
                    `Hello Pista House! I just reserved a table with reference ID ${confirmedBooking.id} for ${confirmedBooking.guests} guests on ${confirmedBooking.date} at ${confirmedBooking.timeSlot} under name ${confirmedBooking.customerName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs sm:text-sm transition-colors shadow-[0_4px_16px_rgba(5,150,105,0.4)]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send WhatsApp Confirmation</span>
                </a>

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-[#F8FAFC] text-xs sm:text-sm font-semibold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
