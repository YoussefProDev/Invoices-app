import { ClientList } from "@/components/ClientList";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

const ClientsPage = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Clients</CardTitle>
            <CardDescription>Manage your Clients right here</CardDescription>
          </div>
          <Link href="/dashboard/clients/create" className={buttonVariants()}>
            <PlusIcon /> Add Client
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
          <ClientList />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default ClientsPage;
