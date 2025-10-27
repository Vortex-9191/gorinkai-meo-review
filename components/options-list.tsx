"use client"

import OptionButton from "./option-button"

interface Option {
  label: string
  value: string
}

interface OptionsListProps {
  options: Option[]
  value: string | null
  onChange: (value: string) => void
}

export default function OptionsList({ options, value, onChange }: OptionsListProps) {
  return (
    <div className="flex flex-col gap-3 max-w-md mx-auto">
      {options.map((option) => (
        <OptionButton
          key={option.value}
          label={option.label}
          value={option.label}
          selected={value === option.label}
          onClick={() => onChange(option.label)}
        />
      ))}
    </div>
  )
}
