import { DashboardShell } from "~/app/_components/shell";
import DashboardHeader from "~/app/_components/DashboardHeader";
import { UsersRow } from "~/app/_components/AdminUser";
import { Suspense } from "react";
import Loading from "~/app/(editor)/editor/[listingId]/loading";

export default function reservations() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Manage Users." />
      <Suspense fallback={<Loading />}>
      <UsersRow />
      </Suspense>
    </DashboardShell>
  );
}
