"use client"

import { useState } from "react"
import ListingCard from "./listing-card"
import type { Listing } from "@prisma/client"
import { FiltredListing } from "../ui/types"

interface ListingsGridProps {
  listings: FiltredListing[]
}

export default function ListingsGrid({ listings }: ListingsGridProps) {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          isFavorite={favorites.includes(listing.id)}
          onFavoriteToggle={() => toggleFavorite(listing.id)}
        />
      ))}
    </div>
  )
}
