"use client"

interface OptionButtonProps {
  label: string
  value: string
  selected: boolean
  onClick: () => void
}

export default function OptionButton({ label, value, selected, onClick }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-6 py-5 rounded-xl border-2 transition-all duration-200 ${
        selected
          ? "border-primary bg-primary/5 text-foreground shadow-sm"
          : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-accent/50"
      }`}
    >
      <span className="text-sm md:text-base leading-relaxed">{label}</span>
    </button>
  )
}
