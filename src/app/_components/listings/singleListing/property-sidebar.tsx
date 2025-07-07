import { Star, Car, Calendar, Shield } from "lucide-react"
import { Card, CardContent } from "../../ui/card"
import { Button } from "../../ui/button"
import type { SingleListing } from "../../ui/types"
import { AvatarImage } from "../../ui/avatar"


export default function PropertySidebar({listing} : {listing : SingleListing}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-lg font-medium">
            <AvatarImage src={listing?.createdBy.image ?? ""} />
            </div>
            <div className="text-lg font-medium">{listing?.createdBy.name}</div>
            <div className="text-lg font-medium">
              Price: <span className="font-bold">DZD {listing?.price}</span>
            </div>
            <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">Reserve your apartment stay</Button>
            <p className="text-xs text-center text-gray-500">{"You won't be charged yet"}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Property highlights</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-pink-500" />
              <div>
                <p>Top location: Highly rated by recent guests (8.7)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Car className="h-5 w-5 text-pink-500" />
              <div>
                <p>Free private parking available at the property</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-pink-500" />
              <div>
                <p>Free cancellation before April 20</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-pink-500" />
              <div>
                <p>Superhost with 4.9 rating</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
