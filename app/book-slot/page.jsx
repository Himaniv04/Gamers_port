"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Gamepad2, Calendar as CalendarIcon, Clock, CreditCard, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

export default function BookSlotPage() {
  const searchParams = useSearchParams();
  const initialStationId = searchParams.get("stationId") || "";

  // State
  const [stations, setStations] = useState([]);
  const [loadingStations, setLoadingStations] = useState(true);
  const [selectedStationId, setSelectedStationId] = useState(initialStationId);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [duration, setDuration] = useState(1);
  const [slots, setSlots] = useState([]);
  const [isClosedDay, setIsClosedDay] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [playerCount, setPlayerCount] = useState(1);
  const [minHours, setMinHours] = useState(1);
  const [maxHours, setMaxHours] = useState(4);

  // Customer Details Form
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  // Booking & Lock State
  const [lockedBooking, setLockedBooking] = useState(null);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch Stations on load
  useEffect(() => {
    async function fetchStations() {
      setLoadingStations(true);
      try {
        const res = await fetch("/api/stations");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setStations(data);
          setSelectedStationId((prev) => (prev ? prev : String(data[0].id)));
        }
      } catch (err) {
        console.error("Failed to load stations", err);
      } finally {
        setLoadingStations(false);
      }
    }
    fetchStations();
  }, []);

  // Fetch Slots whenever Station, Date, or Duration changes
  useEffect(() => {
    if (!selectedStationId || !selectedDate) return;

    async function fetchSlots() {
      setLoadingSlots(true);
      setErrorMsg("");
      setSelectedSlot(null);
      setIsClosedDay(false);
      try {
        const res = await fetch(
          `/api/slots/available?date=${selectedDate}&stationId=${selectedStationId}&duration=${duration}`
        );
        const data = await res.json();
        if (data.isClosed) {
          setIsClosedDay(true);
          setSlots([]);
        } else if (data.slots) {
          setIsClosedDay(false);
          setSlots(data.slots);
          // Update duration limits from operating hours
          const min = data.operatingHours?.minBookingHours ?? 1;
          const max = data.operatingHours?.maxBookingHours ?? 4;
          setMinHours(min);
          setMaxHours(max);
          // Clamp current duration to new limits
          setDuration((prev) => Math.min(max, Math.max(min, prev)));
        } else if (data.error) {
          setErrorMsg(data.error);
        }
      } catch (err) {
        setErrorMsg("Failed to check slot availability");
      } finally {
        setLoadingSlots(false);
      }
    }

    fetchSlots();
  }, [selectedStationId, selectedDate, duration]);

  // Lock countdown timer
  useEffect(() => {
    if (!lockedBooking?.lockExpiresAt) return;

    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((new Date(lockedBooking.lockExpiresAt).getTime() - Date.now()) / 1000)
      );
      setLockTimeRemaining(remaining);

      if (remaining === 0) {
        setLockedBooking(null);
        setErrorMsg("Reservation lock expired. Please select your slot again.");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockedBooking]);

  // Handle Step 1: Lock Slot for 10 mins
  const handleLockSlot = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      setErrorMsg("Please select an available time slot");
      return;
    }
    if (!userName || !userEmail || !userPhone) {
      setErrorMsg("Please fill in your name, email, and phone number");
      return;
    }

    setErrorMsg("");
    setIsProcessingPayment(true);

    try {
      const lockRes = await fetch("/api/bookings/lock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stationId: selectedStationId,
          // Use slot.bookingDate — overnight continuation slots store under previous day's date
          bookingDate: selectedSlot.bookingDate || selectedDate,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          durationHours: duration,
          playerCount,
          userName,
          userEmail,
          userPhone,
        }),
      });

      const lockData = await lockRes.json();

      if (!lockRes.ok) {
        throw new Error(lockData.error || "Failed to reserve slot");
      }

      setLockedBooking(lockData);
      setLockTimeRemaining(600); // 10 minutes

      // Immediately trigger Razorpay Order Creation
      handleCheckout(lockData.bookingId, lockData.totalAmount);
    } catch (err) {
      setErrorMsg(err.message);
      setIsProcessingPayment(false);
    }
  };

  // Handle Step 2: Open Razorpay Modal & Verify
  const handleCheckout = async (bookingId, amountInRupees) => {
    try {
      // 1. Call Backend Order Creation (/api/create-order)
      const amountInPaise = Math.round((amountInRupees || 100) * 100);

      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `rcpt_${bookingId}_${Date.now()}`,
          bookingId,
        }),
      });

      const contentType = orderRes.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await orderRes.text();
        throw new Error(`Server returned non-JSON response (${orderRes.status}): ${text.slice(0, 100)}`);
      }

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to create Razorpay payment order");
      }

      const selectedStation = stations.find((s) => String(s.id) === String(selectedStationId));

      // 2. Configure Razorpay Standard Checkout Options
      const options = {
        key: orderData.key_id || orderData.key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_TQsiWoDT3leCLG",
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Gamer's Port Lounge",
        description: `Booking ${selectedStation?.name || "Gaming Rig"} on ${selectedDate} (${selectedSlot?.startTime}-${selectedSlot?.endTime})`,
        order_id: orderData.order_id || orderData.orderId,
        handler: async function (response) {
          try {
            // 3. Send payment details to Verify Signature Endpoint (/api/verify-payment)
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId,
              }),
            });

            const vContentType = verifyRes.headers.get("content-type");
            let verifyData;
            if (vContentType && vContentType.includes("application/json")) {
              verifyData = await verifyRes.json();
            } else {
              const text = await verifyRes.text();
              throw new Error(`Verification server returned non-JSON response (${verifyRes.status}): ${text.slice(0, 100)}`);
            }

            if (verifyRes.ok && verifyData.success) {
              setBookingSuccess({
                userName,
                userEmail,
                bookingDate: selectedDate,
                startTime: selectedSlot.startTime,
                endTime: selectedSlot.endTime,
                durationHours: duration,
                totalAmount: amountInRupees,
                razorpayPaymentId: response.razorpay_payment_id,
              });
              setLockedBooking(null);
            } else {
              setErrorMsg(verifyData.error || "Payment signature verification failed!");
            }
          } catch (vErr) {
            setErrorMsg("Payment verification network error: " + vErr.message);
          } finally {
            setIsProcessingPayment(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessingPayment(false);
            setErrorMsg("Payment process was cancelled by the user.");
          },
        },
        prefill: {
          name: userName,
          email: userEmail,
          contact: userPhone,
        },
        theme: {
          color: "#00f7ff",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        
        // Handle payment failure event
        rzp.on("payment.failed", function (response) {
          setIsProcessingPayment(false);
          setErrorMsg(
            `Payment Failed! Reason: ${response.error?.description || "Transaction failed"}`
          );
        });

        rzp.open();
      } else {
        throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
      }
    } catch (err) {
      setErrorMsg(err.message);
      setIsProcessingPayment(false);
    }
  };

  const activeStation = stations.find((s) => String(s.id) === String(selectedStationId));

  // ── Live Pricing Calculation (mirrors server logic) ────────────────────────
  const baseCost    = activeStation ? activeStation.hourlyRate * duration : 0;
  const extraPlayers = Math.max(0, playerCount - 1);
  const extraCost   = activeStation ? activeStation.extraPlayerFee * extraPlayers * Math.ceil(duration) : 0;
  const liveTotal   = Math.round((baseCost + extraCost) * 100) / 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-wider">
          REAL-TIME <span className="text-cyan-400">SLOT BOOKING ENGINE</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Select your station, date, and time slot. Operating hours are managed by the admin. Instant anti-double-booking protection.
        </p>
      </div>

      {bookingSuccess ? (
        <div className="max-w-2xl mx-auto glass-panel p-10 rounded-3xl border border-emerald-500/40 text-center space-y-6">
          <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto animate-bounce" />
          <h2 className="text-3xl font-extrabold text-white">BOOKING CONFIRMED!</h2>
          <p className="text-gray-300">
            Thank you, <span className="text-cyan-400 font-bold">{bookingSuccess.userName}</span>! Your gaming session has been locked and confirmed.
          </p>

          <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 text-left space-y-3 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Station:</span>
              <span className="text-white font-bold">{activeStation?.name || "Gaming Station"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date:</span>
              <span className="text-white">{bookingSuccess.bookingDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time Slot:</span>
              <span className="text-cyan-400 font-bold">
                {bookingSuccess.startTime} - {bookingSuccess.endTime} ({bookingSuccess.durationHours} hr)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Amount Paid:</span>
              <span className="text-emerald-400 font-bold">₹{bookingSuccess.totalAmount}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-800 text-xs text-gray-400">
              <span>Payment ID:</span>
              <span>{bookingSuccess.razorpayPaymentId || "Verified"}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setBookingSuccess(null);
              setSelectedSlot(null);
            }}
            className="px-8 py-3 rounded-xl bg-cyan-500 text-black font-bold font-display hover:bg-cyan-400 transition-all"
          >
            Book Another Session
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT 2 COLUMNS: SELECTION PANEL */}
          <div className="lg:col-span-2 space-y-8">
            {/* STEP 1: CHOOSE STATION */}
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-cyan-400" /> 1. Select Gaming Station
              </h2>
              {loadingStations ? (
                <div className="py-6 text-center text-cyan-400 animate-pulse font-mono">
                  Loading gaming stations...
                </div>
              ) : stations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {stations.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setSelectedStationId(String(st.id))}
                      className={`p-4 rounded-xl text-left border transition-all duration-200 ${
                        String(selectedStationId) === String(st.id)
                          ? "bg-cyan-500/10 border-cyan-400 neon-border-cyan"
                          : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
                      }`}
                    >
                      <div className="text-xs font-mono font-bold text-cyan-400 mb-1">{st.type}</div>
                      <div className="font-bold text-white text-sm mb-2">{st.name}</div>
                      <div className="text-xs text-emerald-400 font-bold font-display">
                        ₹{st.hourlyRate}/hr
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-4 text-center text-gray-400">
                  No gaming stations available. Please refresh or contact admin.
                </div>
              )}
            </div>

            {/* STEP 2: CHOOSE DATE & DURATION */}
            <div className="glass-panel p-6 rounded-2xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-cyan-400" /> Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" /> Duration
                  </label>
                  {/* Stepper: − [value] + */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      id="duration-decrease"
                      onClick={() => setDuration((d) => Math.max(minHours, parseFloat((d - 0.5).toFixed(1))))}
                      disabled={duration <= minHours}
                      className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 text-gray-200 font-bold text-xl hover:bg-gray-800 hover:border-cyan-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                    >−</button>
                    <div className="flex-1 text-center">
                      <div className="text-2xl font-extrabold text-white font-display">{duration}h</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{minHours}h min · {maxHours}h max</div>
                    </div>
                    <button
                      type="button"
                      id="duration-increase"
                      onClick={() => setDuration((d) => Math.min(maxHours, parseFloat((d + 0.5).toFixed(1))))}
                      disabled={duration >= maxHours}
                      className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 text-gray-200 font-bold text-xl hover:bg-gray-800 hover:border-cyan-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                    >+</button>
                  </div>
                </div>
              </div>

              {/* Player Count Selector */}
              {activeStation && activeStation.maxPlayers > 1 && (
                <div className="space-y-3 pt-2 border-t border-gray-800">
                  <label className="text-sm font-bold text-gray-300">
                    👥 Number of Players
                    <span className="ml-2 text-xs font-normal text-gray-500">
                      ({activeStation.minPlayers}–{activeStation.maxPlayers} allowed)
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(
                      { length: activeStation.maxPlayers - activeStation.minPlayers + 1 },
                      (_, i) => i + activeStation.minPlayers
                    ).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setPlayerCount(n)}
                        className={`w-12 h-12 rounded-xl font-bold text-base transition-all ${
                          playerCount === n
                            ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20"
                            : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  {activeStation.extraPlayerFee > 0 && playerCount > 1 && (
                    <p className="text-xs text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-2">
                      ₹{activeStation.extraPlayerFee}/hr × {playerCount - 1} extra player(s) × ⌈{duration}⌉ hrs = <strong>₹{extraCost}</strong> surcharge
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* STEP 3: AVAILABLE SLOTS GRID */}
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" /> 3. Available Time Slots
              </h2>

              {loadingSlots ? (
                <div className="py-12 text-center text-cyan-400 animate-pulse font-mono">
                  Checking real-time slot availability...
                </div>
              ) : isClosedDay ? (
                <div className="py-10 text-center space-y-2">
                  <div className="text-4xl">🔒</div>
                  <p className="text-red-400 font-bold">Shop is Closed</p>
                  <p className="text-gray-500 text-sm">No slots available on this day. Try another date.</p>
                </div>
              ) : slots.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {slots.map((slot, idx) => (
                    <button
                      key={idx}
                      disabled={!slot.isAvailable}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        !slot.isAvailable
                          ? "bg-red-950/20 border-red-900/30 text-gray-600 cursor-not-allowed"
                          : selectedSlot?.startTime === slot.startTime && selectedSlot?.bookingDate === slot.bookingDate
                          ? "bg-cyan-500 text-black font-bold border-cyan-400 shadow-lg shadow-cyan-500/20"
                          : "bg-gray-900/80 border-gray-800 text-gray-200 hover:border-cyan-500/50"
                      }`}
                    >
                      <div className="font-mono text-sm">{slot.displayStartTime || slot.startTime}</div>
                      <div className="font-mono text-xs text-gray-400">→ {slot.displayEndTime || slot.endTime}</div>
                      <div className="text-[10px] mt-1 uppercase font-sans">
                        {!slot.isAvailable ? "Booked" : "Available"}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-400">
                  Select a station and date to view available slots.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: CUSTOMER FORM & CHECKOUT SUMMARY */}
          <div className="space-y-6">
            <form onSubmit={handleLockSlot} className="glass-panel p-6 rounded-2xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" /> Reservation Details
              </h2>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* LOCK TIMED WARNING */}
              {lockedBooking && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs space-y-1 animate-pulse">
                  <div className="font-bold flex justify-between">
                    <span>Temporary Lock Active:</span>
                    <span className="font-mono text-sm">{Math.floor(lockTimeRemaining / 60)}:{(lockTimeRemaining % 60).toString().padStart(2, "0")}</span>
                  </div>
                  <p>Slot is reserved for 10 minutes. Complete payment to confirm.</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="gamer@example.com"
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-400 mt-1"
                  />
                </div>
              </div>

              {/* ORDER SUMMARY */}
              <div className="pt-4 border-t border-gray-800 space-y-2 text-sm font-mono">
                <div className="flex justify-between text-gray-400">
                  <span>Station:</span>
                  <span className="text-white">{activeStation?.name || "None"}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Time Slot:</span>
                  <span className="text-cyan-400">
                    {selectedSlot ? `${selectedSlot.displayStartTime || selectedSlot.startTime} – ${selectedSlot.displayEndTime || selectedSlot.endTime}` : "None"}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Duration:</span>
                  <span className="text-white">{duration} Hour(s)</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Players:</span>
                  <span className="text-white">{playerCount}</span>
                </div>

                {/* Pricing Breakdown */}
                <div className="pt-2 space-y-1.5 border-t border-gray-800">
                  <div className="flex justify-between text-gray-500 text-xs">
                    <span>Base (₹{activeStation?.hourlyRate || 0} × {duration}h):</span>
                    <span className="text-gray-300">₹{baseCost.toFixed(2)}</span>
                  </div>
                  {extraCost > 0 && (
                    <div className="flex justify-between text-purple-400 text-xs">
                      <span>Extra players ({playerCount - 1} × ₹{activeStation?.extraPlayerFee}/hr × ⌈{duration}⌉h):</span>
                      <span>₹{extraCost.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-2 text-lg font-bold font-display text-white border-t border-gray-800">
                  <span>Total Amount:</span>
                  <span className="text-emerald-400">₹{liveTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedSlot || isProcessingPayment}
                className={`w-full py-4 rounded-xl font-display font-bold text-base transition-all duration-300 ${
                  !selectedSlot || isProcessingPayment
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-400 to-blue-600 text-black hover:from-cyan-300 hover:to-blue-500 neon-glow-cyan"
                }`}
              >
                {isProcessingPayment ? "Processing Payment..." : "Confirm & Pay Now"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
