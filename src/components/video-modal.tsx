import { createPortal } from "react-dom";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
} & (
  | {
      channel: "youtube";
      videoId: string;
    }
  | {
      channel?: "custom";
      src: string;
    }
);

export default function VideoModal({ isOpen, onClose, ...props }: PropsType) {
  // Bloqueia o scroll do body enquanto o modal está aberto
  if (typeof window !== "undefined") {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
  if (!isOpen) return null;

  let src = "";

  if (props.channel === "youtube") {
    src = `https://www.youtube.com/embed/${props.videoId}`;
  } else {
    src = props.src;
  }

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/80"
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full max-w-4xl bg-gray-900">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-4 translate-x-full text-7xl leading-none text-white"
        >
          <span className="sr-only">Close modal</span>
          &times;
        </button>
        <iframe width="100%" height="500" src={src} allowFullScreen />
      </div>
    </div>,
    document.body,
  );
}
