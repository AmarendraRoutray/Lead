import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Leads = () => {
  // Fake data (replace with API later)
  const [leads, setLeads] = useState([
    { id: 1, name: "John Doe", status: "New", contact: "9876543210" },
    { id: 2, name: "Jane Smith", status: "FollowUps", contact: "9988776655" },
    { id: 3, name: "Mark Johnson", status: "Site Visits", contact: "9123456789" },
    { id: 4, name: "Alice Brown", status: "Bookings/EOIs", contact: "9786543210" },
    { id: 5, name: "Chris Evans", status: "Dead", contact: "9234567890" },
  ]);

  const [activeTab, setActiveTab] = useState("All");

  const statuses = ["All", "New", "FollowUps", "Site Visits", "Bookings/EOIs", "Dead"];

  // Count logic
  const getCount = (status) => {
    if (status === "All") return leads.length;
    return leads.filter((lead) => lead.status === status).length;
  };

  const filteredLeads =
    activeTab === "All" ? leads : leads.filter((lead) => lead.status === activeTab);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4">Leads Manager</h1>

      <Card>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex flex-wrap gap-2 mb-4">
              {statuses.map((status) => (
                <TabsTrigger
                  key={status}
                  value={status}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  {status}
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs bg-gray-200 text-gray-700"
                  >
                    {getCount(status)}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            {statuses.map((status) => (
              <TabsContent key={status} value={status}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.length > 0 ? (
                      filteredLeads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell>{lead.id}</TableCell>
                          <TableCell>{lead.name}</TableCell>
                          <TableCell>{lead.contact}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                lead.status === "Dead"
                                  ? "bg-red-500"
                                  : lead.status === "Bookings/EOIs"
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                              }
                            >
                              {lead.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-500">
                          No leads found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leads;
