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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  ImageIcon,
  Loader2,
  MailIcon,
  SearchIcon,
  Trash2,
  XCircle,
  Eye,
} from "lucide-react";
import Image from "next/image";
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
import Link from "next/link";

interface Report {
  id: number;
  name: string;
  email: string;
  reason: string;
  details: string;
  imageUrl?: string;
  status: string;
  createdAt: string;
  userId: number;
  type: 'template' | 'component';
  item: {
    name: string;
    image: string;
    author: string;
  };
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

const ReportsTable = ({ 
  reports: initialReports, 
  type,
  onReportsChange 
}: { 
  reports: Report[]; 
  type: 'template' | 'component';
  onReportsChange: (reports: Report[]) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [status, setStatus] = useState("pending");
  const [adminMessage, setAdminMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [reports, setReports] = useState<Report[]>(initialReports);

  useEffect(() => {
    setReports(initialReports);
  }, [initialReports]);

  const totalPages = Math.ceil(reports.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedReports = reports.slice(startIndex, endIndex);

  const handleUpdateReport = async () => {
    if (!selectedReport) return;

    try {
      setIsUpdating(true);
      const response = await fetch(`/api/admin/reports/${selectedReport.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          adminMessage,
          type: selectedReport.type
        }),
      });

      if (!response.ok) throw new Error('Failed to update report');
      
      const updatedReport = await response.json();
      
      // Update the reports list locally
      const updatedReports = reports.map(report => 
        report.id === selectedReport.id ? { ...report, status, adminMessage } : report
      );
      setReports(updatedReports);
      onReportsChange(updatedReports);
      
      toast.success('Report updated successfully');
      setIsDialogOpen(false);
      setAdminMessage("");
    } catch (error) {
      toast.error('Failed to update report');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteReport = async () => {
    if (!reportToDelete) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/admin/reports/${reportToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: reportToDelete.type
        }),
      });

      if (!response.ok) throw new Error('Failed to delete report');
      
      // Update the reports list locally
      const updatedReports = reports.filter(report => report.id !== reportToDelete.id);
      setReports(updatedReports);
      onReportsChange(updatedReports);
      
      // If we deleted the last item on the page and not on the first page, go to previous page
      if (paginatedReports.length === 1 && currentPage > 1) {
        setCurrentPage(prev => Math.max(1, prev - 1));
      }
      
      toast.success('Report deleted successfully');
      setIsDeleteDialogOpen(false);
      setReportToDelete(null);
    } catch (error) {
      toast.error('Failed to delete report');
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteDialog = (report: Report) => {
    setReportToDelete(report);
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
                  <TableHead>Item</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Evidence</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="relative h-10 w-10 flex-shrink-0">
                          <Image
                            src={report.item?.image || '/placeholder.png'}
                            alt={report.item?.name || 'Item'}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <Link 
                            href={`/${report.type}s/${report.item?.name}`} 
                            className="font-medium hover:underline block truncate"
                          >
                            {report.item?.name}
                          </Link>
                          <p className="text-sm text-gray-500 truncate">{report.details}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{report.reason}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(report.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{report.item?.author}</TableCell>
                    <TableCell>
                      {report.imageUrl ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedImage(report.imageUrl || null)}
                          className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                        >
                          <ImageIcon className="h-4 w-4" />
                          <span>View</span>
                        </Button>
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedReport(report);
                            setStatus(report.status);
                            setAdminMessage(report.adminMessage || "");
                            setIsDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => openDeleteDialog(report)}
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
            {paginatedReports.map((report) => (
              <div key={report.id} className="border-b p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                      src={report.item?.image || '/placeholder.png'}
                      alt={report.item?.name || 'Item'}
                      fill
                      className="rounded object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <Link 
                      href={`/${report.type}s/${report.item?.name}`} 
                      className="font-medium hover:underline block truncate"
                    >
                      {report.item?.name}
                    </Link>
                    <p className="text-sm text-gray-500">By {report.item?.author}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Reason:</span>
                    <p className="text-sm">{report.reason}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {report.imageUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedImage(report.imageUrl || null)}
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 text-sm"
                    >
                      <ImageIcon className="h-4 w-4" />
                      <span>View Evidence</span>
                    </Button>
                  )}
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedReport(report);
                        setStatus(report.status);
                        setAdminMessage(report.adminMessage || "");
                        setIsDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(report)}
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
                      {Math.min(endIndex, reports.length)}
                    </span>{" "}
                    of <span className="font-medium">{reports.length}</span> results
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
            <DialogTitle>Review Report</DialogTitle>
            <DialogDescription>
              Update the status and provide feedback for this report.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">
                    <span className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      Pending
                    </span>
                  </SelectItem>
                  <SelectItem value="approved">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Approved
                    </span>
                  </SelectItem>
                  <SelectItem value="rejected">
                    <span className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      Rejected
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Message to User</label>
              <Textarea
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
                placeholder="Enter your response to the user..."
                className="min-h-[100px]"
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
              onClick={handleUpdateReport}
              disabled={isUpdating}
              className="gap-2"
            >
              {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
              {isUpdating ? 'Updating...' : 'Update Report'}
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
              This action cannot be undone. This will permanently delete the report and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteReport}
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

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl z-[70]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Evidence Image
            </DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative w-full aspect-video">
              <Image
                src={selectedImage}
                alt="Evidence"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchQuery, statusFilter]);

  const filterReports = () => {
    let filtered = [...reports];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        report =>
          report.name.toLowerCase().includes(query) ||
          report.email.toLowerCase().includes(query) ||
          report.reason.toLowerCase().includes(query) ||
          report.details.toLowerCase().includes(query) ||
          report.item.name.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    setFilteredReports(filtered);
  };

  const fetchReports = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch('/api/admin/reports');
      if (!response.ok) throw new Error('Failed to fetch reports');
      const data = await response.json();
      setReports(data);
      setFilteredReports(data);
    } catch (error) {
      setError('Failed to fetch reports. Please try again later.');
      toast.error('Failed to fetch reports');
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Report Management</h1>
        <p className="mt-2 text-sm text-gray-600">
          Review and manage user reports for templates and components
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
          {filteredReports.length === 0 ? (
            <Card className="bg-gray-50 border-dashed">
              <CardContent className="py-12">
                <div className="text-center">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No reports found</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {searchQuery || statusFilter !== 'all'
                      ? "Try adjusting your filters to find what you're looking for."
                      : 'There are no reports to review at this time.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <ReportsTable 
              reports={filteredReports} 
              type={filteredReports[0]?.type || 'template'} 
              onReportsChange={setFilteredReports}
            />
          )}
        </>
      )}
    </div>
  );
}
