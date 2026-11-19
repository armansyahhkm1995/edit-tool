import React from 'react';
import { Users, UserCheck } from 'lucide-react';

interface UsersKpiCardsProps {
  totalCount: number;
  adminCount: number;
  editorCount: number;
  activeCount: number;
  inactiveCount: number;
}

export const UsersKpiCards: React.FC<UsersKpiCardsProps> = ({
  totalCount,
  adminCount,
  editorCount,
  activeCount,
  inactiveCount,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Card 1 */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Total Akun Terdaftar
          </p>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{totalCount} Pengguna</p>
          <p className="text-xs text-slate-500 mt-0.5">
            {adminCount} Admin • {editorCount} Editor
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
          <UserCheck className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Status Akun Aktif
          </p>
          <p className="text-xl font-bold text-slate-900 mt-0.5">
            {activeCount} Aktif / {inactiveCount} Dinonaktifkan
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Log perubahan tersimpan di Audit Log</p>
        </div>
      </div>
    </div>
  );
};
