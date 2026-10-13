/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, Bell, CheckCircle2, Trash2, Sparkles, ShieldCheck, 
  Gamepad2, BookOpen, Clock, AlertCircle, UserCheck, Check
} from 'lucide-react';
import { sounds } from '../lib/audio';

export interface NotificationItem {
  id: string;
  type: 'ai' | 'security' | 'game' | 'system' | 'permission_request';
  title: string;
  content: string;
  time: string;
  isRead: boolean;
  requestDetails?: {
    requesterName: string;
    requesterSchool?: string;
    targetTitle?: string;
  };
}

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onClearAll: () => void;
  onApproveRequest?: (notifId: string) => void;
  onRejectRequest?: (notifId: string) => void;
}

export default function NotificationCenterModal({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onClearAll,
  onApproveRequest,
  onRejectRequest
}: NotificationCenterModalProps) {
  const [filterType, setFilterType] = useState<string>('all');

  if (!isOpen) return null;

  const filtered = notifications.filter(n => {
    if (filterType === 'unread') return !n.isRead;
    if (filterType === 'ai') return n.type === 'ai';
    if (filterType === 'permission') return n.type === 'permission_request' || n.type === 'security';
    if (filterType === 'games') return n.type === 'game';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'ai':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'security':
      case 'permission_request':
        return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
      case 'game':
        return <Gamepad2 className="w-5 h-5 text-pink-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-left">
      <div className="bg-white rounded-[36px] w-full max-w-2xl overflow-hidden shadow-2xl border-4 border-indigo-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white flex items-center justify-between relative overflow-hidden">
          <div className="flex items-center gap-3.5 z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/30">
              🔔
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-fredoka font-black text-2xl text-white">
                  Trung Tâm Thông Báo
                </span>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white font-extrabold text-xs px-2.5 py-0.5 rounded-full animate-bounce">
                    {unreadCount} mới
                  </span>
                )}
              </div>
              <p className="text-xs text-indigo-100 font-medium">
                Cập nhật hoạt động AI, tiến độ học sinh và yêu cầu cấp quyền chỉnh sửa
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer font-bold z-10 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills & Actions Bar */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: `Tất cả (${notifications.length})` },
              { id: 'unread', label: `Chưa đọc (${unreadCount})` },
              { id: 'ai', label: '🤖 AI Soạn đề' },
              { id: 'permission', label: '🔒 Quyền & Bảo mật' },
              { id: 'games', label: '🎮 Game & Lớp học' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick();
                  setFilterType(tab.id);
                }}
                className={`px-3 py-1 rounded-full text-xs font-fredoka font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filterType === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-gray-200/70 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                onMarkAllRead();
              }}
              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Đánh dấu đã đọc
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onClearAll();
              }}
              className="text-[11px] font-bold text-red-500 hover:text-red-700 cursor-pointer flex items-center gap-1 ml-2"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa tất cả
            </button>
          </div>
        </div>

        {/* Notifications List Body */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-indigo-50 flex items-center justify-center text-2xl">
                ✨
              </div>
              <p className="font-fredoka font-bold text-gray-700 text-sm">Không có thông báo nào trong mục này</p>
              <p className="text-xs text-gray-400">Cô giáo đã xem hết tất cả thông báo rồi nhé!</p>
            </div>
          ) : (
            filtered.map(item => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 text-left ${
                  !item.isRead
                    ? 'bg-indigo-50/40 border-indigo-200 shadow-xs ring-1 ring-indigo-200/50'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="p-2.5 bg-white rounded-2xl shadow-xs border border-gray-100 shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="font-fredoka font-bold text-xs text-gray-900 leading-snug">
                      {item.title}
                    </h5>
                    <span className="text-[10px] text-gray-400 font-semibold whitespace-nowrap flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.time}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    {item.content}
                  </p>

                  {/* Special Permission Request Action Buttons */}
                  {item.type === 'permission_request' && item.requestDetails && onApproveRequest && (
                    <div className="pt-2 mt-2 border-t border-indigo-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-indigo-700 font-bold">
                        👤 {item.requestDetails.requesterName} ({item.requestDetails.requesterSchool || 'Giáo viên'})
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onApproveRequest(item.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-fredoka font-bold cursor-pointer transition-all flex items-center gap-1 shadow-xs"
                        >
                          <Check className="w-3 h-3" /> Cấp quyền sửa
                        </button>
                        {onRejectRequest && (
                          <button
                            onClick={() => onRejectRequest(item.id)}
                            className="px-2.5 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-[11px] font-fredoka font-bold cursor-pointer transition-all"
                          >
                            Từ chối
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">Hệ thống thông báo đồng bộ thời gian thực</span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-fredoka font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
