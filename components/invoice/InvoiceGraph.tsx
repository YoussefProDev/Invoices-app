import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { db } from "@/lib/db";
import { requireUserSession } from "@/utils/hooks";
import { Graph } from "../Graph";
import { parseDynamicCurrency } from "@/utils/formatCurrency";

async function getInvoices(userId: string) {
  const rawData = await db.invoice.findMany({
    where: {
      status: "PAID",
      userId: userId,
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Group and aggregate data by date
  const aggregatedData = rawData.reduce(
    (acc: { [key: string]: number }, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      acc[date] = (acc[date] || 0) + parseDynamicCurrency(curr.total);

      return acc;
    },
    {}
  );

  // Convert to array and sort by date
  const transformedData = Object.entries(aggregatedData)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date + ", " + new Date().getFullYear()),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({
      date,
      amount,
    }));

  return transformedData;
}

export async function InvoiceGraph() {
  const userSession = await requireUserSession();
  const data = await getInvoices(userSession?.id as string);

  return (
    <Card className="lg:col-span-2 overflow-hidden">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which have been paid in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full overflow-x-auto">
        <Graph data={data} />
      </CardContent>
    </Card>
  );
}
