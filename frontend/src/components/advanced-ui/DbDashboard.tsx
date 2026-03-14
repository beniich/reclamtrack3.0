"use client";

import { useAuditLogs } from '../../hooks/useDbFeatures';

export default function DbDashboard() {
  const { logs, isLoading, isError } = useAuditLogs();

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Advanced DB Engine Dashboard</h1>

      <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
        <h2 className="text-xl font-semibold mb-4 text-slate-700 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Unified Audit Logs
        </h2>

        {isLoading && (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}
        {isError && <p className="text-sm text-red-500 p-4 bg-red-50 rounded">Erreur lors de la récupération des logs.</p>}

        {!isLoading && !isError && (
          <div className="overflow-x-auto rounded-md border border-slate-200">
            <table className="min-w-full text-sm text-left text-slate-600">
              <thead className="text-xs text-slate-700 uppercase bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Context (Table & Row)</th>
                  <th className="px-6 py-4">User ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-400">Aucun log d'audit trouvé</td>
                  </tr>
                ) : (
                  logs.map((log: any) => (
                    <tr key={log.id} className="bg-white hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 select-none">{new Date(log.created_at).toLocaleString()}</td>
                      <td className="px-6 py-4 font-mono">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold
                          ${log.action === 'INSERT' ? 'bg-green-100 text-green-700' :
                            log.action === 'DELETE' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{log.table_name}</div>
                        <div className="text-xs text-slate-500 font-mono mt-1">ID: {log.row_id}</div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs">{log.user_id || 'System'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
