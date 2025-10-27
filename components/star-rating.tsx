"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  value: number
  onChange: (rating: number) => void
}

export default function StarRating({ value, onChange }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex gap-4 justify-center my-12">
      {[1, 2, 3, 4, 5].map((rating) => {
        const isActive = rating <= (hoverRating || value)

        return (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            onMouseEnter={() => setHoverRating(rating)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <Star
              className={`w-12 h-12 md:w-14 md:h-14 transition-colors ${
                isActive ? "fill-primary text-primary" : "fill-muted text-muted"
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
