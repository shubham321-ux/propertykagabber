import { FiX } from "react-icons/fi";

export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade">
      {/* Modal box */}
      <div className="bg-white rounded-2xl shadow-modal w-full max-w-lg mx-4 relative animate-slide 
                      flex flex-col max-h-[90vh]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-dark hover:text-primary transition"
        >
          <FiX size={22} />
        </button>

        {/* Header */}
        {title && (
          <h2 className="text-xl font-heading text-primary p-6 pb-2">{title}</h2>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {/* Fixed footer with buttons */}
        {footer && (
          <div className="border-t px-6 py-4 bg-white flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
