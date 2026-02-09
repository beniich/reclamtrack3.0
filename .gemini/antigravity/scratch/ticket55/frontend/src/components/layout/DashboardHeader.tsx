'use client';

export default function DashboardHeader() {
    return (
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-1.5 rounded-lg text-white" style={{ backgroundColor: '#2424eb' }}>
                        <span className="material-symbols-outlined block text-xl">account_balance</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold leading-none tracking-tight">Rabat-Salé</h1>
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Utility Services</span>
                    </div>
                </div>
                <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 w-80">
                    <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
                    <input
                        className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 outline-none px-2"
                        placeholder="Search complaint ID, location..."
                        type="text"
                    />
                </div>
                <a href="/system-info" className="hidden lg:block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary ml-4">
                    System Info
                </a>
            </div>
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">notifications</span>
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                </button>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">settings</span>
                </button>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-semibold">Ahmed Mansouri</p>
                        <p className="text-[10px] text-slate-500 uppercase">Ops Manager</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center overflow-hidden">
                        <span className="text-sm font-bold text-blue-600">AM</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
