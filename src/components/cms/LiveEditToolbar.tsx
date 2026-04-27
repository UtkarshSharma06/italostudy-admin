import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Eye, Save, Loader2, Pencil, Globe } from 'lucide-react';
import { useLiveEdit } from '@/contexts/LiveEditContext';
import { useAuth } from '@/lib/auth';

export default function LiveEditToolbar() {
    const { user, profile } = useAuth();
    const {
        isEditMode, pendingCount, saving,
        toggleEditMode, saveAll,
        syncToAllPages, setSyncToAllPages
    } = useLiveEdit();

    // Only show for admins
    const isAdmin = profile?.role === 'admin' || profile?.role === 'sub_admin';
    if (!user || !isAdmin) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2 pointer-events-none select-none">

            {/* Sync badge (shown when edit mode is on) */}
            <AnimatePresence>
                {isEditMode && (
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 border border-slate-700 rounded-full px-4 py-1.5 shadow-xl"
                    >
                        <Globe className={`w-3.5 h-3.5 ${syncToAllPages ? 'text-emerald-400' : 'text-slate-500'}`} />
                        <span className="text-[10px] text-slate-400 font-bold">Sync to all pages</span>
                        <button
                            onClick={() => setSyncToAllPages(!syncToAllPages)}
                            className={`relative w-9 h-5 rounded-full transition-all duration-200 ${syncToAllPages ? 'bg-emerald-500' : 'bg-slate-700'}`}
                        >
                            <span
                                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${syncToAllPages ? 'translate-x-4' : 'translate-x-0'}`}
                            />
                        </button>
                        {syncToAllPages && (
                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-wider">All regions</span>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main toolbar */}
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="pointer-events-auto flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-full shadow-2xl shadow-black/40 px-2 py-1.5"
            >
                {/* Label */}
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">CMS</span>
                <div className="w-px h-5 bg-slate-700" />

                {/* Toggle */}
                <button
                    onClick={toggleEditMode}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${isEditMode
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                >
                    {isEditMode ? (
                        <><Edit3 className="w-3.5 h-3.5" /> Editing</>
                    ) : (
                        <><Eye className="w-3.5 h-3.5" /> Preview</>
                    )}
                </button>

                {/* Pending + Save All */}
                <AnimatePresence>
                    {isEditMode && pendingCount > 0 && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 'auto', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="flex items-center gap-1 overflow-hidden"
                        >
                            <button
                                onClick={saveAll}
                                disabled={saving}
                                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-xs font-bold transition-colors"
                            >
                                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                Save {pendingCount}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Hint */}
                {isEditMode && pendingCount === 0 && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-1 text-[10px] text-indigo-400 font-bold px-3"
                    >
                        <Pencil className="w-3 h-3" />
                        Double-click to edit · 🎨 color/gradient available
                    </motion.span>
                )}
            </motion.div>
        </div>
    );
}
