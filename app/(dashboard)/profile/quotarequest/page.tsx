"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState as EmptyStateIcon } from "@/components/Svgs";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface QuoteRequest {
  id: number;
  name: string;
  email: string;
  company?: string;
  serviceType: string;
  otherService?: string;
  projectInfo: string;
  budget?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ITEMS_PER_PAGE = 5;

export default function QuoteRequestPage() {
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchQuoteRequests() {
      try {
        setError(null);
        const response = await fetch("/api/quote-requests");
        if (!response.ok) {
          throw new Error("Failed to fetch quote requests");
        }
        const data = await response.json();
        setQuoteRequests(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load quote requests. Please try again later.");
        toast.error("Failed to fetch quote requests");
      } finally {
        setLoading(false);
      }
    }

    fetchQuoteRequests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const TableSkeleton = () => (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );

  const QuoteRequestsTable = ({ requests }: { requests: QuoteRequest[] }) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedRequests = requests.slice(startIndex, endIndex);
    const totalPages = Math.ceil(requests.length / ITEMS_PER_PAGE);

    return (
      <Card className="text-card-foreground shadow-sm bg-background bg-gradient-to-br from-sidebar/70 to-sidebar">
        <CardContent className="p-0">
          {/* Desktop View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="capitalize">{request.serviceType}</TableCell>
                    <TableCell>{request.company || '-'}</TableCell>
                    <TableCell>{request.budget || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(request.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            {paginatedRequests.map((request) => (
              <div key={request.id} className="border-b p-4 space-y-3">
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Service Type:</span>
                    <p className="text-sm capitalize">{request.serviceType}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Company:</span>
                    <p className="text-sm">{request.company || '-'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Budget:</span>
                    <p className="text-sm">{request.budget || '-'}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                >
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(endIndex, requests.length)}
                    </span>{" "}
                    of <span className="font-medium">{requests.length}</span> results
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="sm"
                    className="gap-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const EmptyState = () => (
    <div className="text-center py-12 px-4">
      <div className="mx-auto h-20 w-20 text-gray-400 mb-4">
        <EmptyStateIcon />
      </div>
      <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-2">No quote requests</h3>
      <p className="text-gray-500 max-w-sm mx-auto">
        You haven't submitted any quote requests yet. When you do, they'll appear here.
      </p>
    </div>
  );

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold dark:text-white text-gray-900">My Quote Requests</h1>
        <p className="mt-2 text-sm text-gray-600">
          Track and manage your submitted quote requests
        </p>
      </div>
      
      {loading ? (
        <TableSkeleton />
      ) : quoteRequests.length > 0 ? (
        <QuoteRequestsTable requests={quoteRequests} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
