import { MapPin, Star } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/_components/ui/card";
import { api } from "~/trpc/server";


const LocationCardGroup = async () => {

  const listings = await api.listing.all.query({ amount: 4 });

  return (
    <div className="w-full overflow-x-scroll md:overflow-x-hidden">
      <div className="grid w-[800vw] grid-cols-8 gap-4 sm:w-[400vw] md:w-full md:grid-cols-4 md:px-5">
        {listings.map((data) => {
          return (
            <Link key={data.id} href={`/listings/${data.id}`}>
              <Card  className="col-span-1 border-none bg-gray-100 shadow-none">
                <CardHeader className="h-[13rem] w-full p-0">
                  <img
                    className="h-full w-full rounded-sm object-cover"
                    src={data.images[0]?.url}
                  />
                </CardHeader>
                <CardContent className="grid w-full gap-y-1 px-0 py-3">
                  <h1 className="text-md font-bold capitalize">{data.name}</h1>
                  <div className="flex">
                    <MapPin className="mr-1 w-[18px] text-gray-400" />
                    <p className="">{data.province}</p>
                  </div>
                  <div className="flex">
                    <Star className="mr-1 w-[18px] text-gray-400" />
                    <p className="">{"4.7 (540 reviews)"}</p>
                  </div>
                </CardContent>
                <CardFooter className="grid w-full px-0">
                  <h1 className="text-xl font-bold">DZD {" "}{data.price},00</h1>
                  <p className="text-xs text-gray-500">includes fees and taxs</p>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LocationCardGroup;