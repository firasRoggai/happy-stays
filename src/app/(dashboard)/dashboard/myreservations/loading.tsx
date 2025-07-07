import { CardSkeleton } from "~/app/_components/card-skeleton";
import DashboardHeader from "~/app/_components/DashboardHeader";
import { DashboardShell } from "~/app/_components/shell";

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Reservations"
        text="Browse Your reservations."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
