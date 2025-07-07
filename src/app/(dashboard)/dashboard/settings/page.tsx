import { redirect } from "next/navigation";
import DashboardHeader from "~/app/_components/DashboardHeader";
import { DashboardShell } from "~/app/_components/shell";
import UserNameForm from "~/app/_components/UserNameForm";
import { authOptions } from "~/server/auth";
import { api } from "~/trpc/server";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const user = await api.user.display.query();

  if (!user) {
    redirect("/");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm
          user={{
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
          }}
        />
      </div>
    </DashboardShell>
  );
}
