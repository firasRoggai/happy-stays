import { CardSkeleton } from "~/app/_components/card-skeleton";
import DashboardHeader from "~/app/_components/DashboardHeader";
import { DashboardShell } from "~/app/_components/shell";

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
