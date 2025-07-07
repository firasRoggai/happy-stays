//import { redirect } from "next/navigation";

//import { BillingForm } from "./billing-form";
import DashboardHeader from "~/app/_components/DashboardHeader";
import { Icons } from "~/app/_components/icons";
import { DashboardShell } from "~/app/_components/shell";
import { Alert, AlertDescription, AlertTitle } from "~/app/_components/ui/alert";

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
};

export default async function BillingPage() {
  /* const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId,
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }
*/
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-8">
        <Alert className="!pl-14">
          <Icons.warning />
          <AlertTitle>This is a demo app.</AlertTitle>
          <AlertDescription>
            Happy Stays is a demo app and does not process payments yet.
          </AlertDescription>
        </Alert>
        {/*        <BillingForm
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled,
          }}
        />
        */}
      </div>
    </DashboardShell>
  );
}
