import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
} from 'lucide-react';

export const NotifikasiPage: React.FC = () => {
  const { notifications } = useApp();

  const todayNotifications = notifications.filter((n) => n.section === 'Hari Ini');
  const yesterdayNotifications = notifications.filter((n) => n.section === 'Kemarin');

  const renderIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-blue-600 shrink-0" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-5 animate-fade-in">
      {/* Page Header (Matching Aintelligence - button removed) */}
      <div>
        <h1 className="text-xl font-bold text-blue-700 tracking-tight">100 Notifikasi</h1>
        <p className="text-xs text-slate-500 mt-1">
          Lihat dan kelola aktivitas sistem
        </p>
      </div>

      {/* Notifications Card (Matching Aintelligence layout) */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        {/* Section: Hari Ini */}
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Hari Ini</h2>
          <div className="space-y-3">
            {todayNotifications.map((notif) => (
              <div
                key={notif.id}
                className="flex items-center justify-between p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  {renderIcon(notif.status)}
                  <span className="text-xs font-medium text-slate-800 truncate sm:whitespace-normal">
                    {notif.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">{notif.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Kemarin */}
        <div className="p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Kemarin</h2>
          <div className="space-y-3">
            {yesterdayNotifications.map((notif) => (
              <div
                key={notif.id}
                className="flex items-center justify-between p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  {renderIcon(notif.status)}
                  <span className="text-xs font-medium text-slate-800 truncate sm:whitespace-normal">
                    {notif.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">{notif.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
