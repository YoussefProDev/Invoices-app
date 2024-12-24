import { Suspense } from "react";
import { DashboardBlocks } from "@/components/DashboardBlocks";
import { EmptyState } from "@/components/EmptyState";
import { InvoiceGraph } from "@/components/InvoiceGraph";
import { RecentInvoices } from "@/components/RecentInvoices";

import { requireUser } from "@/utils/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";

async function getData(userId: string) {
  const data = await db.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  return data;
}

export default async function DashboardRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No invoices found"
          description="Create an invoice to see it right here"
          buttontext="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <Suspense fallback={<Skeleton className="w-full h-full flex-1" />}>
          <DashboardBlocks />
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <InvoiceGraph />
            <RecentInvoices />
          </div>
        </Suspense>
      )}
    </>
  );
}
