import { useEffect } from "react";

type Props = {
  open: boolean;
  message: string;
  onClose: () => void;
  autoHideMs?: number; // domyślnie auto-zamyka po czasie
};

export default function SuccessPopup({
  open,
  message,
  onClose,
  autoHideMs = 2500,
}: Props) {
  // auto-hide
  useEffect(() => {
    if (!open || !autoHideMs) return;
    const id = setTimeout(onClose, autoHideMs);
    return () => clearTimeout(id);
  }, [open, autoHideMs, onClose]);

  // ESC do zamykania
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={[
        "fixed inset-0 z-[100] flex items-center justify-center px-4",
        "transition-opacity duration-200",
        open ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      {/* Tło */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Karta */}
      <div
        role="status"
        aria-live="polite"
        className={[
          "relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5",
          "transition-all duration-200",
          open ? "scale-100 translate-y-0" : "scale-95 -translate-y-2",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 5.29a1 1 0 0 1 0 1.414l-7.2 7.2a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414l2.293 2.293 6.493-6.493a1 1 0 0 1 1.414 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h3 className="text-center text-lg font-semibold text-gray-900">
          Sukces
        </h3>
        <p className="mt-2 text-center text-gray-600">{message}</p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            OK
          </button>
        </div>

        {/* X w rogu */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1 text-gray-400 hover:text-gray-600"
          aria-label="Zamknij"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 8.586 4.293 2.879A1 1 0 1 0 2.879 4.293L8.586 10l-5.707 5.707a1 1 0 1 0 1.414 1.414L10 11.414l5.707 5.707a1 1 0 0 0 1.414-1.414L11.414 10l5.707-5.707A1 1 0 0 0 15.707 2.88L10 8.586Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
