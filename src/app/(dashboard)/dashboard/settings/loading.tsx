import { CardSkeleton } from "~/app/_components/card-skeleton";
import DashboardHeader from "~/app/_components/DashboardHeader";
import { DashboardShell } from "~/app/_components/shell";

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
