'use client';

export default function MessagesPage() {
    return (
        <div className="font-display bg-background-light text-slate-900 h-[calc(100vh-64px)] overflow-hidden flex flex-col">
            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar: Chat List */}
                <div className="w-80 lg:w-96 flex flex-col border-r border-slate-200 bg-white overflow-hidden">
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold">Discussions</h1>
                            <button className="flex items-center gap-1 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
                                <span className="material-symbols-outlined text-sm">edit_square</span>
                                Nouveau
                            </button>
                        </div>
                        {/* Search */}
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                            <input className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm" placeholder="Chef d'équipe ou ID Cas" type="text" />
                        </div>
                        {/* Filters */}
                        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                            <button className="px-3 py-1 bg-primary text-white rounded-full text-xs font-medium whitespace-nowrap">Tout</button>
                            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-medium whitespace-nowrap">Urgent</button>
                            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-medium whitespace-nowrap">Terrain</button>
                        </div>
                    </div>

                    {/* Chat Items */}
                    <div className="flex-1 overflow-y-auto">
                        {/* Active Chat Item */}
                        <div className="flex items-center gap-4 px-4 py-4 bg-primary/10 border-l-4 border-primary cursor-pointer">
                            <div className="relative shrink-0">
                                <span className="h-12 w-12 rounded-full bg-slate-300 flex items-center justify-center font-bold text-slate-600">JD</span>
                                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-0.5">
                                    <h3 className="text-sm font-semibold truncate">John Doe (Lead)</h3>
                                    <span className="text-[10px] text-slate-400">14:02</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-slate-500 truncate">Re: #CMP-8802 - En route vers le site...</p>
                                    <span className="bg-primary text-white text-[10px] px-1.5 rounded-full font-bold">2</span>
                                </div>
                            </div>
                        </div>
                        {/* Other Item */}
                        <div className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                            <div className="relative shrink-0">
                                <span className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">SM</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-0.5">
                                    <h3 className="text-sm font-semibold truncate">Sarah Miller</h3>
                                    <span className="text-[10px] text-slate-400">13:45</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">Intervention terminée secteur 7G.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Pane: Messaging Thread */}
                <div className="flex-1 flex flex-col bg-white relative">
                    {/* Thread Header */}
                    <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 shadow-sm z-10">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">JD</div>
                            <div>
                                <h2 className="text-base font-bold leading-none">John Doe</h2>
                                <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full"></span>
                                    Actif sur site
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                        {/* Message In */}
                        <div className="flex items-start gap-3 max-w-[80%]">
                            <div className="h-8 w-8 rounded-full bg-slate-300 mt-1 shrink-0 flex items-center justify-center text-xs font-bold">JD</div>
                            <div className="flex flex-col gap-1">
                                <div className="bg-white px-4 py-3 rounded-xl rounded-bl-none shadow-sm border border-slate-100">
                                    <p className="text-sm leading-relaxed">Je suis arrivé au périmètre. J'installe l'unité mobile.</p>
                                </div>
                                <span className="text-[10px] text-slate-400 ml-1">13:45</span>
                            </div>
                        </div>

                        {/* Message Out */}
                        <div className="flex items-start justify-end gap-3 ml-auto max-w-[80%]">
                            <div className="flex flex-col items-end gap-1">
                                <div className="bg-primary text-white px-4 py-3 rounded-xl rounded-br-none shadow-md">
                                    <p className="text-sm leading-relaxed">Bien reçu John. J'ai notifié le client.</p>
                                </div>
                                <div className="flex items-center gap-1 mr-1">
                                    <span className="text-[10px] text-slate-400">13:47</span>
                                    <span className="material-symbols-outlined text-sm text-primary">done_all</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 md:p-6 bg-white border-t border-slate-200">
                        <div className="flex items-end gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                            <button className="p-2 text-slate-400 hover:text-primary rounded-lg transition-colors">
                                <span className="material-symbols-outlined">add_circle</span>
                            </button>
                            <textarea className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-1 resize-none min-h-[40px] max-h-[120px]" placeholder="Écrivez votre message..." rows={1}></textarea>
                            <button className="h-10 w-10 flex items-center justify-center bg-primary text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-primary/20 transition-all active:scale-95">
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
