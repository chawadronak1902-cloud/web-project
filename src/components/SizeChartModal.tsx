import React, { useState } from 'react';
import { X, Ruler, Check, HelpCircle } from 'lucide-react';
import { HOODIE_SIZE_CHART } from '../data/products';
import { useEcommerce } from '../context/EcommerceContext';

export const SizeChartModal: React.FC = () => {
  const { isSizeChartOpen, setIsSizeChartOpen } = useEcommerce();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [selectedFit, setSelectedFit] = useState<'regular' | 'oversized'>('oversized');

  if (!isSizeChartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSizeChartOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-amber-700" />
            <div>
              <h3 className="text-lg font-bold text-neutral-900 font-display">Size Guide & Fit Chart</h3>
              <p className="text-xs text-neutral-500">Heavyweight Studio Hoodie (Unisex Engineered Fit)</p>
            </div>
          </div>
          <button
            onClick={() => setIsSizeChartOpen(false)}
            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Fit Selector & Unit Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-50 p-3 rounded-xl border border-neutral-200/70">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-600">Intended Fit:</span>
              <div className="inline-flex p-0.5 bg-neutral-200/70 rounded-lg text-xs">
                <button
                  onClick={() => setSelectedFit('oversized')}
                  className={`px-3 py-1 font-medium rounded-md transition-colors ${
                    selectedFit === 'oversized'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Signature Boxy (Relaxed)
                </button>
                <button
                  onClick={() => setSelectedFit('regular')}
                  className={`px-3 py-1 font-medium rounded-md transition-colors ${
                    selectedFit === 'regular'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Standard Fit (Size Down)
                </button>
              </div>
            </div>

            {/* Metric / Imperial toggle */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs font-semibold text-neutral-600">Units:</span>
              <div className="inline-flex p-0.5 bg-neutral-200/70 rounded-lg text-xs">
                <button
                  onClick={() => setUnit('in')}
                  className={`px-3 py-1 font-medium rounded-md transition-colors ${
                    unit === 'in' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Inches (in)
                </button>
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1 font-medium rounded-md transition-colors ${
                    unit === 'cm' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Centimeters (cm)
                </button>
              </div>
            </div>
          </div>

          {/* Model info callout */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-950">
            <span className="font-semibold px-2 py-0.5 bg-amber-200/70 rounded text-[11px] uppercase tracking-wider text-amber-900">
              Fit Note
            </span>
            <p className="leading-relaxed">
              Model is <strong>6&apos;1&quot; (185 cm)</strong> with a 38&quot; chest and is wearing size <strong>L</strong> for a relaxed streetwear drape. For a snug, traditional fit, we recommend taking one size smaller than your standard size.
            </p>
          </div>

          {/* Size Measurement Table */}
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-100/80 text-neutral-700 text-xs uppercase tracking-wider border-b border-neutral-200">
                <tr>
                  <th className="py-3 px-4 font-semibold">Size</th>
                  <th className="py-3 px-4 font-semibold">Chest Width</th>
                  <th className="py-3 px-4 font-semibold">Body Length</th>
                  <th className="py-3 px-4 font-semibold">Shoulder</th>
                  <th className="py-3 px-4 font-semibold">Sleeve Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono text-xs">
                {HOODIE_SIZE_CHART.map((row) => (
                  <tr key={row.size} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3 px-4 font-sans font-bold text-neutral-900 text-sm">{row.size}</td>
                    <td className="py-3 px-4 text-neutral-700">
                      {unit === 'in' ? row.chestIn : row.chestCm}
                    </td>
                    <td className="py-3 px-4 text-neutral-700">
                      {unit === 'in' ? row.lengthIn : row.lengthCm}
                    </td>
                    <td className="py-3 px-4 text-neutral-700">
                      {unit === 'in' ? row.shoulderIn : row.shoulderCm}
                    </td>
                    <td className="py-3 px-4 text-neutral-700">
                      {unit === 'in' ? row.sleeveIn : row.sleeveCm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to measure */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
              How to Measure For The Best Fit
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-600">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="font-semibold text-neutral-900 block mb-1">1. Chest</span>
                Measure around the fullest part of your chest, keeping the tape horizontal under your armpits.
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="font-semibold text-neutral-900 block mb-1">2. Length</span>
                Measure from the highest point of the shoulder seam straight down to the bottom hem.
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="font-semibold text-neutral-900 block mb-1">3. Sleeve</span>
                Measure from the center back of your neck across shoulder point down to outer wrist.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-100 bg-[#FAF9F6] flex justify-end">
          <button
            onClick={() => setIsSizeChartOpen(false)}
            className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Done & Select Size
          </button>
        </div>
      </div>
    </div>
  );
};
