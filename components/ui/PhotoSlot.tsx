export const photoSlotLabel = "*buraya fotograf*";

export function PhotoSlot({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-line/50 px-2 text-center text-xs text-muted ${className}`}
    >
      {photoSlotLabel}
    </div>
  );
}
