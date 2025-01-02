import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { db } from "@/lib/db";
import { requireUserSession } from "@/utils/hooks";
import { formatCurrency, parseDynamicCurrency } from "@/utils/formatCurrency";

async function getData(userId: string) {
  const [data, openInvoices, paidinvoices] = await Promise.all([
    db.invoice.findMany({
      where: {
        userId: userId,
      },
      select: {
        total: true,
      },
    }),
    db.invoice.findMany({
      where: {
        userId: userId,
        status: "PENDING",
      },
      select: {
        id: true,
      },
    }),
    db.invoice.findMany({
      where: {
        userId: userId,
        status: "PAID",
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    data,
    openInvoices,
    paidinvoices,
  };
}

export async function DashboardBlocks() {
  const userSession = await requireUserSession();
  const { data, openInvoices, paidinvoices } = await getData(
    userSession?.id as string
  );

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm md:text-base font-medium">
            Total Revenue
          </CardTitle>
          <DollarSign className="w-6 h-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-xl md:text-2xl font-bold">
            {formatCurrency({
              amount: data.reduce(
                (acc, invoice) => acc + parseDynamicCurrency(invoice.total),
                0
              ),
              currency: "USD",
            })}
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            Based on total volume
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm md:text-base font-medium">
            Total Invoices Issued
          </CardTitle>
          <Users className="w-6 h-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-xl md:text-2xl font-bold">+{data.length}</h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            Total Invoices Issued
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm md:text-base font-medium">
            Paid Invoices
          </CardTitle>
          <CreditCard className="w-6 h-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-xl md:text-2xl font-bold">
            +{paidinvoices.length}
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            Total Invoices which have been paid
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm md:text-base font-medium">
            Pending Invoices
          </CardTitle>
          <Activity className="w-6 h-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-xl md:text-2xl font-bold">
            +{openInvoices.length}
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            Invoices which are currently pending
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
