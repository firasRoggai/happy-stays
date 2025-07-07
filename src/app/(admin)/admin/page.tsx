"use client";
import DashboardHeader from "~/app/_components/DashboardHeader";
import { EmptyPlaceholder } from "~/app/_components/empty-placeholder";
import { ListingItem } from "~/app/_components/listing-item";
import { DashboardShell } from "~/app/_components/shell";
import { api } from "~/trpc/react";

export default function DashboardPage() {
  const { data: listings } = api.listing.adminAllUserListings.useQuery();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Listings"
        text="Manage All User's Listings."
      ></DashboardHeader>
      <div>
        {listings?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {listings.map((listing) => (
              <ListingItem
                key={listing.id}
                listing={listing}
                Author={listing.Author}
              />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No listing created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              No Listings Yet.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
