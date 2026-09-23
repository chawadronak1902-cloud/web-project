import React, { useState, useEffect } from 'react';
import { X, Activity, Copy, Check, Trash2, Database, Table, Zap } from 'lucide-react';
import { useEcommerce } from '../context/EcommerceContext';
import { GA4EventRecord } from '../types/ecommerce';
import { subscribeToGA4Events, getGA4EventHistory, clearGA4EventHistory } from '../utils/analytics';

const TRACKING_PLAN = [
  {
    event: 'view_item',
    type: 'GA4 Recommended',
    trigger: 'When visitor views the Hoodie Hero or clicks any product recommendation',
    parameters: ['item_name', 'item_category', 'price', 'cashback_offered'],
    businessQuestion: 'Does displaying cashback reward upfront increase product engagement and conversion?',
  },
  {
    event: 'add_to_cart',
    type: 'GA4 Recommended',
    trigger: 'When visitor selects color/size and clicks Add to Cart',
    parameters: ['item_name', 'item_category', 'price', 'quantity', 'item_variant', 'cashback_offered'],
    businessQuestion: 'Which color and size variants yield the highest add-to-cart propensity with cashback incentives?',
  },
  {
    event: 'begin_checkout',
    type: 'GA4 Recommended',
    trigger: 'When customer clicks Proceed to Checkout from the Cart Drawer',
    parameters: ['items[]', 'value', 'currency (USD)', 'cashback_offered'],
    businessQuestion: 'What percentage of cart users advance to checkout when cashback earnings are forecasted in the bag?',
  },
  {
    event: 'purchase',
    type: 'GA4 Core Conversion',
    trigger: 'When order completes successfully on simulated payment',
    parameters: ['transaction_id', 'value', 'currency (USD)', 'items[]', 'cashback_earned'],
    businessQuestion: 'What is the blended ROAS and repeat purchase rate of the Welcome Back Cashback campaign?',
  },
  {
    event: 'cashback_earned',
    type: 'Custom Event',
    trigger: 'When cashback is credited into the customer’s AURA Wallet',
    parameters: ['amount', 'order_value', 'user_type ("returning" | "new")'],
    businessQuestion: 'What is the total cashback liability incurred across returning vs new visitor cohorts?',
  },
  {
    event: 'cashback_redeemed',
    type: 'Custom Event',
    trigger: 'When customer toggles "Apply Wallet Balance" at bag/checkout',
    parameters: ['amount_redeemed', 'remaining_balance'],
    businessQuestion: 'Does wallet balance redemption eliminate cart abandonment and accelerate reorder velocity?',
  },
  {
    event: 'welcome_back_banner_view',
    type: 'Custom Event',
    trigger: 'When the personalized Welcome Back banner is rendered to a returning visitor',
    parameters: ['user_type', 'current_balance'],
    businessQuestion: 'What is the reach and impressions count of the returning visitor banner segment?',
  },
  {
    event: 'welcome_back_banner_click',
    type: 'Custom Event',
    trigger: 'When visitor clicks "Claim on Hoodie" CTA in the Welcome Back banner',
    parameters: ['user_type', 'current_balance', 'cta_target'],
    businessQuestion: 'What is the CTR of returning visitor cashback reminder messaging?',
  },
];

export const GA4InspectorModal: React.FC = () => {
  const { isGA4InspectorOpen, setIsGA4InspectorOpen } = useEcommerce();
  const [events, setEvents] = useState<GA4EventRecord[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<GA4EventRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'stream' | 'plan'>('stream');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setEvents(getGA4EventHistory());
    const unsubscribe = subscribeToGA4Events((newEvent) => {
      setEvents((prev) => [newEvent, ...prev.slice(0, 49)]);
      if (!selectedEvent) {
        setSelectedEvent(newEvent);
      }
    });
    return unsubscribe;
  }, [selectedEvent]);

  if (!isGA4InspectorOpen) return null;

  const handleCopyPayload = (evt: GA4EventRecord) => {
    navigator.clipboard.writeText(JSON.stringify(evt.payload, null, 2));
    setCopiedId(evt.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleClear = () => {
    clearGA4EventHistory();
    setEvents([]);
    setSelectedEvent(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsGA4InspectorOpen(false)}
      />

      {/* Modal Window */}
      <div className="relative w-full max-w-4xl bg-neutral-900 text-white rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-display">GA4 dataLayer Live Inspector</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                  ● ACTIVE
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Verifying window.dataLayer.push({`{...}`}) in real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch */}
            <div className="flex bg-neutral-800 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setActiveTab('stream')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'stream' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Zap className="w-3 h-3" />
                Live Stream ({events.length})
              </button>
              <button
                onClick={() => setActiveTab('plan')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'plan' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Table className="w-3 h-3" />
                Tracking Plan
              </button>
            </div>

            <button
              onClick={() => setIsGA4InspectorOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors ml-2"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        {activeTab === 'stream' ? (
          <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[420px]">
            {/* Left: Event Stream List (5 cols) */}
            <div className="md:col-span-5 border-r border-neutral-800 flex flex-col overflow-hidden bg-neutral-950/60">
              <div className="p-3 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>Recent Events ({events.length})</span>
                {events.length > 0 && (
                  <button
                    onClick={handleClear}
                    className="hover:text-red-400 flex items-center gap-1 transition-colors text-[11px]"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-neutral-800/60">
                {events.length === 0 ? (
                  <div className="p-6 text-center text-xs text-neutral-500">
                    No events pushed yet. Browse products or add items to trigger dataLayer pushes.
                  </div>
                ) : (
                  events.map((evt) => {
                    const isSelected = selectedEvent?.id === evt.id;
                    const isCustom = evt.event.startsWith('cashback') || evt.event.startsWith('welcome');
                    return (
                      <button
                        key={evt.id}
                        onClick={() => setSelectedEvent(evt)}
                        className={`w-full text-left p-3.5 transition-colors flex flex-col gap-1 ${
                          isSelected
                            ? 'bg-amber-500/15 border-l-2 border-amber-400 text-white'
                            : 'hover:bg-neutral-900/80 text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-mono text-xs font-bold ${
                              isCustom ? 'text-amber-400' : 'text-emerald-400'
                            }`}
                          >
                            {evt.event}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">{evt.timestamp}</span>
                        </div>
                        <div className="text-[11px] text-neutral-400 truncate">
                          {evt.payload.item_name || evt.payload.transaction_id || evt.payload.user_type || 'Event fired'}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right: Selected Event Payload (7 cols) */}
            <div className="md:col-span-7 flex flex-col overflow-hidden bg-neutral-900">
              {selectedEvent ? (
                <>
                  <div className="p-3 border-b border-neutral-800 flex items-center justify-between text-xs bg-neutral-950">
                    <div className="flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-mono text-amber-300 font-bold">{selectedEvent.event}</span>
                    </div>

                    <button
                      onClick={() => handleCopyPayload(selectedEvent)}
                      className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-[11px] flex items-center gap-1.5 transition-colors"
                    >
                      {copiedId === selectedEvent.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied JSON</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Payload</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-neutral-200">
                    <pre className="whitespace-pre-wrap leading-relaxed">
                      {JSON.stringify(selectedEvent.payload, null, 2)}
                    </pre>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8 text-neutral-500 text-xs">
                  Select an event on the left to inspect its parameters.
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Tab 2: Full GA4 Tracking Plan Table */
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-950">
            <div>
              <h4 className="text-sm font-bold text-white font-display">
                GA4 Custom Event & Parameter Tracking Plan
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Specification mapping each GA4/custom event to required parameters and underlying business hypotheses.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900 text-neutral-300 text-[11px] uppercase tracking-wider border-b border-neutral-800">
                  <tr>
                    <th className="py-3 px-3 font-semibold">Event Name</th>
                    <th className="py-3 px-3 font-semibold">Type</th>
                    <th className="py-3 px-3 font-semibold">Trigger Condition</th>
                    <th className="py-3 px-3 font-semibold">Required Parameters</th>
                    <th className="py-3 px-3 font-semibold">Business Question Answered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 font-sans">
                  {TRACKING_PLAN.map((row) => (
                    <tr key={row.event} className="hover:bg-neutral-900/50 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-amber-400 whitespace-nowrap">
                        {row.event}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            row.type.includes('Core')
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : row.type.includes('Custom')
                              ? 'bg-purple-500/20 text-purple-300'
                              : 'bg-blue-500/20 text-blue-300'
                          }`}
                        >
                          {row.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-neutral-300 max-w-xs">{row.trigger}</td>
                      <td className="py-3 px-3 font-mono text-neutral-300 text-[11px] max-w-xs">
                        {row.parameters.join(', ')}
                      </td>
                      <td className="py-3 px-3 text-neutral-400 max-w-sm italic">
                        {row.businessQuestion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs text-neutral-400">
          <span>All events fire synchronously into <code className="text-amber-400 font-mono">window.dataLayer</code></span>
          <button
            onClick={() => setIsGA4InspectorOpen(false)}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors font-medium"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

export const FloatingInspectorTrigger: React.FC = () => {
  const { setIsGA4InspectorOpen } = useEcommerce();

  return (
    <button
      onClick={() => setIsGA4InspectorOpen(true)}
      className="fixed bottom-5 right-5 z-40 bg-neutral-950 text-white hover:bg-neutral-800 border border-neutral-700 shadow-xl px-3.5 py-2.5 rounded-full flex items-center gap-2 text-xs font-semibold cursor-pointer group hover:scale-105 transition-all"
      aria-label="Open GA4 Tracking Inspector"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <Activity className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
      <span>GA4 dataLayer</span>
    </button>
  );
};
