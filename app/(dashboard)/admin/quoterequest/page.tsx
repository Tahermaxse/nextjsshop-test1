"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog copy";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Loader2,
  SearchIcon,
  Trash2,
  XCircle,
  Eye,
  MailIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface QuoteRequest {
  id: number;
  name: string;
  email: string;
  company?: string;
  serviceType: string;
  otherService?: string;
  budget: string;
  projectInfo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId?: number;
  adminMessage?: string;
}

const ITEMS_PER_PAGE = 10;

const TableSkeleton = () => (
  <div className="space-y-4">
    {[...Array(4)].map((_, i) => (
      <Card key={i}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

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

const getBudgetLabel = (budget: string) => {
  switch (budget) {
    case 'under-5k':
      return 'Under $5,000';
    case '5k-10k':
      return '$5,000 - $10,000';
    case '10k-25k':
      return '$10,000 - $25,000';
    case '25k-50k':
      return '$25,000 - $50,000';
    case '50k-plus':
      return '$50,000+';
    default:
      return budget;
  }
};

const QuoteRequestsTable = ({ 
  requests: initialRequests, 
  onRequestsChange 
}: { 
  requests: QuoteRequest[];
  onRequestsChange: (requests: QuoteRequest[]) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);
  const [status, setStatus] = useState("pending");
  const [adminMessage, setAdminMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<QuoteRequest | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [requests, setRequests] = useState<QuoteRequest[]>(initialRequests);

  useEffect(() => {
    setRequests(initialRequests);
  }, [initialRequests]);

  const totalPages = Math.ceil(requests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRequests = requests.slice(startIndex, endIndex);

  const handleUpdateRequest = async () => {
    if (!selectedRequest) return;

    try {
      setIsUpdating(true);
      const response = await fetch(`/api/admin/quote-requests/${selectedRequest.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          adminMessage,
        }),
      });

      if (!response.ok) throw new Error('Failed to update quote request');
      
      const updatedRequest = await response.json();
      
      // Update the requests list locally
      const updatedRequests = requests.map(request => 
        request.id === selectedRequest.id ? { ...request, status, adminMessage } : request
      );
      setRequests(updatedRequests);
      onRequestsChange(updatedRequests);
      
      toast.success('Quote request updated successfully');
      setIsDialogOpen(false);
      setAdminMessage("");
    } catch (error) {
      toast.error('Failed to update quote request');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteRequest = async () => {
    if (!requestToDelete) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/admin/quote-requests/${requestToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete quote request');
      
      // Update the requests list locally
      const updatedRequests = requests.filter(request => request.id !== requestToDelete.id);
      setRequests(updatedRequests);
      onRequestsChange(updatedRequests);
      
      // If we deleted the last item on the page and not on the first page, go to previous page
      if (paginatedRequests.length === 1 && currentPage > 1) {
        setCurrentPage(prev => Math.max(1, prev - 1));
      }
      
      toast.success('Quote request deleted successfully');
      setIsDeleteDialogOpen(false);
      setRequestToDelete(null);
    } catch (error) {
      toast.error('Failed to delete quote request');
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteDialog = (request: QuoteRequest) => {
    setRequestToDelete(request);
    setIsDeleteDialogOpen(true);
  };

  // Generate page numbers for pagination
  const getPageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // If we have 5 or fewer pages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate start and end of visible page numbers
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the start
      if (currentPage <= 3) {
        endPage = 4;
      }
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis if needed before the middle pages
      if (startPage > 2) {
        pageNumbers.push('...');
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed after the middle pages
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <>
      <Card className="text-card-foreground shadow-sm bg-background bg-gradient-to-br from-sidebar/70 to-sidebar">
        <CardContent className="p-0">
          {/* Desktop View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="min-w-0">
                          <p className="font-medium">{request.name}</p>
                          <p className="text-sm text-gray-500">{request.company || 'No company'}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MailIcon className="h-4 w-4 text-gray-400" />
                        <span>{request.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">
                      {request.serviceType === 'other' ? request.otherService : request.serviceType}
                    </TableCell>
                    <TableCell>{getBudgetLabel(request.budget)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(request.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request);
                            setStatus(request.status);
                            setAdminMessage(request.adminMessage || "");
                            setIsDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => openDeleteDialog(request)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
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
                    <p className="font-medium">{request.name}</p>
                    <p className="text-sm text-gray-500">{request.company || 'No company'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MailIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{request.email}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Service Type:</span>
                    <p className="text-sm capitalize">
                      {request.serviceType === 'other' ? request.otherService : request.serviceType}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Budget:</span>
                    <p className="text-sm">{getBudgetLabel(request.budget)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRequest(request);
                        setStatus(request.status);
                        setAdminMessage(request.adminMessage || "");
                        setIsDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(request)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
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
                <div className="flex items-center gap-2">
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
                  
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
                      ) : (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page as number)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      )
                    ))}
                  </div>

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

      {/* Review Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Review Quote Request</DialogTitle>
            <DialogDescription>
              Update the status and provide feedback for this quote request.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Project Information</h3>
              <p className="text-sm text-gray-500 mt-1">{selectedRequest?.projectInfo}</p>
            </div>
            {selectedRequest?.adminMessage && (
              <div>
                <h3 className="font-medium">Previous Admin Message</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedRequest.adminMessage}</p>
              </div>
            )}
            <div>
              <h3 className="font-medium">Status</h3>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <h3 className="font-medium">Admin Message</h3>
              <Textarea
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
                placeholder="Add a message for the user..."
                className="mt-1"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                setAdminMessage("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateRequest}
              disabled={isUpdating}
              className="gap-2"
            >
              {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
              {isUpdating ? 'Updating...' : 'Update Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the quote request and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRequest}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default function AdminQuoteRequests() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, searchQuery, statusFilter]);

  const filterRequests = () => {
    let filtered = [...requests];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        request =>
          request.name.toLowerCase().includes(query) ||
          request.email.toLowerCase().includes(query) ||
          request.company?.toLowerCase().includes(query) ||
          request.serviceType.toLowerCase().includes(query) ||
          request.projectInfo.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    setFilteredRequests(filtered);
  };

  const fetchRequests = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch('/api/admin/quote-requests');
      if (!response.ok) throw new Error('Failed to fetch quote requests');
      const data = await response.json();
      setRequests(data);
      setFilteredRequests(data);
    } catch (error) {
      setError('Failed to fetch quote requests. Please try again later.');
      toast.error('Failed to fetch quote requests');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quote Request Management</h1>
        <p className="mt-2 text-sm text-gray-600">
          Review and manage user quote requests
        </p>
      </div>

      <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          {filteredRequests.length === 0 ? (
            <Card className="bg-gray-50 border-dashed">
              <CardContent className="py-12">
                <div className="text-center">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No quote requests found</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {searchQuery || statusFilter !== 'all'
                      ? "Try adjusting your filters to find what you're looking for."
                      : 'There are no quote requests to review at this time.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <QuoteRequestsTable 
              requests={filteredRequests}
              onRequestsChange={setFilteredRequests}
            />
          )}
        </>
      )}
    </div>
  );
}
