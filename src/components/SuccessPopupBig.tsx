import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
    open: boolean;
    onClose: () => void;
    onExited?: () => void;
    title?: string;
    message?: string | React.ReactNode;
    order_number?: string;
    autoHideMs?: number | null;
    primaryAction?: { label: string; onClick: () => void };
};

export default function SuccessPopupBig({
    open,
    onClose,
    onExited,
    title = "Sukces!",
    message = "Operacja zakończona powodzeniem.",
    order_number = '',
    autoHideMs = null,
    primaryAction,
}: Props) {
    // auto-hide
    useEffect(() => {
        if (!open || !autoHideMs) return;
        const id = setTimeout(onClose, autoHideMs);
        return () => clearTimeout(id);
    }, [open, autoHideMs, onClose]);

    // ESC
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    return (
        <AnimatePresence onExitComplete={onExited}>
            {open && (
                <div className="fixed inset-0 z-[1000]">
                    {/* Tło */}
                    <motion.div
                        className="absolute inset-0 bg-black/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    {/* Karta */}
                    <div className="absolute inset-0 flex items-center justify-center px-4">
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            className="relative w-full max-w-5xl rounded-3xl bg-white p-8 sm:p-12 shadow-2xl ring-1 ring-black/5"
                            initial={{ opacity: 0, y: -16, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 16, scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 260, damping: 24 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Zamknij (X) */}
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 rounded-md p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                                aria-label="Zamknij"
                            >
                                <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 8.586 4.293 2.879A1 1 0 1 0 2.879 4.293L8.586 10l-5.707 5.707a1 1 0 1 0 1.414 1.414L10 11.414l5.707 5.707a1 1 0 0 0 1.414-1.414L11.414 10l5.707-5.707A1 1 0 0 0 15.707 2.88L10 8.586Z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {/* Ikona */}
                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                                <svg className="h-12 w-12 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M16.704 5.29a1 1 0 0 1 0 1.414l-7.2 7.2a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414l2.293 2.293 6.493-6.493a1 1 0 0 1 1.414 0Z" clipRule="evenodd" />
                                </svg>
                            </div>

                            {/* Treść */}
                            <h3 className="text-center text-3xl sm:text-4xl font-semibold text-gray-900">{title}</h3>
                            <div className="mt-4 text-center text-lg sm:text-xl text-gray-600">{message}</div>
                            <div className="mt-4 text-center text-lg sm:text-xl text-gray-600">Numer Twojego zamówienia: 
                                <a className="font-black ms-5">{order_number}</a>
                            </div>
                            {/* Akcje */}
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                                {primaryAction && (
                                    <button
                                        onClick={primaryAction.onClick}
                                        className="rounded-2xl bg-green-600 px-7 py-3.5 text-lg text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                                    >
                                        {primaryAction.label}
                                    </button>
                                )}
                                <button
                                    onClick={onClose}
                                    className="rounded-2xl border border-gray-300 bg-white px-7 py-3.5 text-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                                >
                                    Zamknij
                                </button>
                            </div>

                            {autoHideMs && (
                                <div className="mt-8">
                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                                        <motion.div
                                            key={open ? "progress-open" : "progress-closed"}
                                            initial={{ width: "100%" }}
                                            animate={{ width: "0%" }}
                                            transition={{ duration: (autoHideMs ?? 0) / 1000, ease: "linear" }}
                                            className="h-full bg-green-500"
                                        />
                                    </div>
                                    <p className="mt-2 text-center text-xs text-gray-500">

                                    </p>
                                </div>
                            )}

                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
