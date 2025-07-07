import DashboardHeader from "~/app/_components/DashboardHeader";
import { Listingcreatebutton } from "~/app/_components/listing-create-button";
import { ListingItem } from "~/app/_components/listing-item";
import { DashboardShell } from "~/app/_components/shell";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Manage Users.">
        <Listingcreatebutton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <ListingItem.Skeleton />
        <ListingItem.Skeleton />
        <ListingItem.Skeleton />
        <ListingItem.Skeleton />
        <ListingItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
