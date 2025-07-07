"use client"

import { Heart } from "lucide-react"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import type { FiltredListing } from "../ui/types"
import Link from "next/link"

interface ListingCardProps {
  listing: FiltredListing
  isFavorite: boolean
  onFavoriteToggle: () => void
}

/**
 * Check if listing is new (no older than 30 days)
 * @param createdAt 
 * @returns boolean
 */
function isListingNew(createdAt: Date) {
  if (createdAt) {
    const now = new Date()
    const diff = now.getTime() - createdAt.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    return days < 30
  }
  return false
}

export default function ListingCard({ listing, isFavorite, onFavoriteToggle }: ListingCardProps) {
  const createdAtDate = listing.createdAt = new Date(listing.createdAt)

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Image
          src={listing.images[0]?.url ?? "/placeholder.svg"}
          alt={"city image"}
          width={500}
          height={300}
          className="w-full h-48 object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
          onClick={onFavoriteToggle}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-pink-500 text-pink-500" : "text-gray-600"}`} />
          <span className="sr-only">Toggle favorite</span>
        </Button>
        {isListingNew(createdAtDate) && <Badge className="absolute top-2 left-2 bg-pink-500">New</Badge>}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{listing.name}</h3>
          <span className="font-bold text-pink-500">${listing.price}/night</span>
        </div>

        <div className="text-gray-500 mb-2">
          <span>{listing.city}, {listing.province}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="outline" className="text-xs">
            {5} {"bedrooms"}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {2} {"bathrooms"}
          </Badge>
          {listing.Amenties.slice(0, 4).map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
        {/* <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="outline" className="text-xs">
            {listing.bedrooms} {listing.bedrooms === 1 ? "bedroom" : "bedrooms"}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {listing.bathrooms} {listing.bathrooms === 1 ? "bathroom" : "bathrooms"}
          </Badge>
          {listing.features.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div> */}

        <div className="text-sm line-clamp-2 text-gray-600 mb-3">{listing.description}</div>

        <Link target="_blank" href={`/listings/${listing.id}`}>
          <Button className="w-full bg-pink-500 hover:bg-pink-600">View Details</Button>
        </Link>
      </div>
    </div>
  )
}
