import React from 'react';
import { User } from '../../types';
import { Pencil, Trash2 } from 'lucide-react';

interface UsersTableProps {
  users: User[];
  currentUser: User;
  onToggleStatus: (userId: string) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  currentUser,
  onToggleStatus,
  onEditUser,
  onDeleteUser,
}) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold text-slate-600">
            <tr>
              <th className="py-3 px-4 sm:px-6 font-semibold">Nama & Email</th>
              <th className="py-3 px-4 font-semibold">Peran Akses</th>
              <th className="py-3 px-4 font-semibold">Status Akun</th>
              <th className="py-3 px-4 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {users.length > 0 ? (
              users.map((user) => {
                const isCurrentUser = currentUser.email === user.email || currentUser.name === user.name;
                return (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Nama & Email */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">
                            {user.name}
                            {isCurrentUser && (
                              <span className="text-slate-500 font-normal ml-1">(Anda)</span>
                            )}
                          </p>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Peran Akses */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {user.role === 'admin' ? 'Administrator' : 'Editor'}
                      </span>
                    </td>

                    {/* Status Akun (Toggle for Editor, Permanent Active for Admin) */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {user.role === 'admin' ? (
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Aktif
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => onToggleStatus(user.id)}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                              user.status === 'active' ? 'bg-[#1866EF]' : 'bg-slate-200'
                            }`}
                            role="switch"
                            aria-checked={user.status === 'active'}
                            title={user.status === 'active' ? 'Nonaktifkan Akun' : 'Aktifkan Akun'}
                          >
                            <span
                              aria-hidden="true"
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                user.status === 'active' ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                          <span
                            className={`text-xs font-medium ${
                              user.status === 'active' ? 'text-emerald-600' : 'text-slate-400'
                            }`}
                          >
                            {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Aksi (Pencil & Trash2 buttons - Trash2 hanya untuk Editor) */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onEditUser(user)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer"
                          title="Edit Pengguna"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        {user.role !== 'admin' && (
                          <button
                            onClick={() => onDeleteUser(user)}
                            className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Hapus Pengguna"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-500">
                  <p className="font-semibold text-slate-700">Pengguna tidak ditemukan</p>
                  <p className="text-xs mt-1">Coba sesuaikan kata kunci atau filter pencarian</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>Menampilkan 1-5 dari 42 data</span>
          <div className="relative">
            <select className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700 cursor-pointer">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors cursor-pointer">
            Sebelumnya
          </button>
          <button className="w-8 h-8 rounded-md bg-[#1866EF] text-white font-semibold text-xs">
            1
          </button>
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors cursor-pointer">
            2
          </button>
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors cursor-pointer">
            3
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 text-xs transition-colors cursor-pointer">
            10
          </button>
          <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-medium text-slate-700 transition-colors cursor-pointer">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};
