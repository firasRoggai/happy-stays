"use client";
import { File, ListFilter } from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/_components/ui/tabs";
import { DashboardShell } from "~/app/_components/shell";
import ReservationsTableAdmin from "~/app/_components/ReservationsTableAdmin";
import { useEffect, useState } from "react";
import SelectedReservation from "~/app/_components/SelectedReservation";
import { api } from "~/trpc/react";
import { type SingleReservation } from "~/app/_components/ui/types";
import { AdminMonth, AdminWeek } from "~/app/_components/Numbers";
import DashboardHeader from "~/app/_components/DashboardHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/app/_components/ui/card";
import { Progress } from "@radix-ui/react-progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "~/app/_components/ui/button";
import { DropdownMenuCheckboxItem, DropdownMenuSeparator } from "~/app/_components/ui/dropdown-menu";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "~/app/_components/ui/table";

export default function Reservations() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentSelectedReservation, setcurrentSelectedReservation] =
    useState<SingleReservation | null>(null);

  const { data: reservation } =
    api.reservation.getSingleReservationDetails.useQuery(selectedId);

  useEffect(() => {
    const refetch = () => {
      if (selectedId) {
        setcurrentSelectedReservation(reservation);
      }
    };
    refetch();
  }, [selectedId, reservation]);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Reservations"
        text="Manage and accept Reservations  ."
      />
      <main className="grid items-start gap-4 sm:py-0">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Reservations</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Click on the individual reservation to view more details.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">
                  DZD <AdminWeek />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">
                  DZD <AdminMonth />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +10% from last month
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={12} aria-label="12% increase" />
              </CardFooter>
            </Card>
          </div>
          <Tabs defaultValue="week">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Fulfilled
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Declined
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Refunded
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
              </div>
            </div>
            <TabsContent value="week">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7"></CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Date
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <ReservationsTableAdmin
                        setSelectedId={setSelectedId}
                        selectedId={selectedId}
                      />
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
        <div>
          
          <SelectedReservation
            currentSelectedReservation={currentSelectedReservation}
          />
        </div>
    </DashboardShell>
  );
}
