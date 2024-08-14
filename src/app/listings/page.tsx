"use client";

import { AirVent, ChevronRight, DollarSign, Heart, Home, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "~/_components/ui/button";
import { Skeleton } from "~/_components/ui/skeleton";
import { api } from "~/trpc/react";
import { type FiltredListing } from "~/types";
import SearchBar from "../_components/SearchBar";

const ListingDisplay = ({ listing }: { listing: FiltredListing }) => {
  return (
    <div className="rounded bg-gray-100 shadow-lg p-3 md:flex">
      <div className="md:w-[35%] relative">
        <Button className="absolute right-2 top-2" variant={"outline"} size={"icon"}>
          <Heart />
        </Button>
        {listing.images.length > 0 ? (
          <Image
            className="h-full w-full rounded object-cover"
            alt="city image"
            width={300}
            height={300}
            src={listing.images[0]?.url ?? "/placeholder.jpg"}
          />
        ) : (
          <></>
        )}
      </div>

      <div className="p-2 w-full">
        <h1 className="py-3 text-2xl font-bold capitalize">{listing.name}</h1>
        <h2 className="text-md flex gap-x-1 py-1">
          <MapPin className="text-md" /> {listing.city} {listing.province}{" "}
          {listing.street}
        </h2>
        <h2 className="text-md flex gap-x-1 py-1">
          <Home className="text-md" /> {listing.type}
        </h2>
        <h2 className="text-md flex gap-x-1 py-1">
          <DollarSign className="text-md" /> {listing.price}.00 DZD
        </h2>
        <h2 className="text-md flex gap-x-1 py-1">
          <AirVent /> Amenities Available
        </h2>
        <div className="flex justify-end w-full gap-y-1 py-3">
          <Link href={`/listings/${listing.id}`}>
            <Button size={"lg"} className="bg-pink-500 hover:bg-pink-600 flex gap-3 px-3">Check property <ChevronRight /></Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const searchParams = useSearchParams();

  const { data, isLoading } = api.listing.filteredListings.useQuery({
    location: searchParams.get("location") ?? "",
  });

  console.log(data);

  return (
    <div className="mx-auto w-11/12">
      <SearchBar />
      <div>
        <h1 className="text-3xl font-bold">Search Results:</h1>
        <p className="px-1 pb-4">Found {data?.length} results</p>
      </div>
      <div className="space-y-4 mb-8">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-[80px] w-full" />
            <Skeleton className="h-[80px] w-full" />
            <Skeleton className="h-[80px] w-full" />
          </div>
        ) : (
          data?.map((listing) => {
            return <ListingDisplay key={listing.id} listing={listing} />;
          })
        )}
      </div>
    </div>
  );
};

export default Page;
