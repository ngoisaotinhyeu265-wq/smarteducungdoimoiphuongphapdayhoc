/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Trash2, AlertTriangle, X, Check } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemName?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  dangerLevel?: 'normal' | 'high';
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Xác nhận xóa',
  itemName,
  description = 'Thầy cô có chắc chắn muốn xóa mục này không? Thao tác này sẽ xóa vĩnh viễn khỏi kho lưu trữ.',
  confirmText = 'Xóa vĩnh viễn',
  cancelText = 'Hủy bỏ',
  dangerLevel = 'normal'
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-rose-100 overflow-hidden transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Trash2 className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-fredoka font-bold text-lg text-white tracking-wide">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 bg-rose-50/80 p-3.5 rounded-2xl border border-rose-200/70">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-rose-950 font-medium leading-relaxed">
              {description}
            </p>
          </div>

          {itemName && (
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Mục được chọn xóa:
              </div>
              <div className="font-fredoka font-bold text-sm text-gray-800 line-clamp-2">
                "{itemName}"
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 bg-gray-50/90 border-t border-gray-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-gray-700 font-fredoka font-bold text-xs border border-gray-200 shadow-xs transition-all cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-fredoka font-bold text-xs shadow-md shadow-rose-500/30 flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
