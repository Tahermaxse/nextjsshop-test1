'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { 
  Pencil, 
  Trash2, 
  Search, 
  PlusCircle, 
  RefreshCw, 
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Component {
  id: string;
  urlname: string;
  name: string;
  price: number;
  author: string;
  views: number;
  description: string;
  categories: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ComponentsPage() {
  const router = useRouter();
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [componentToDelete, setComponentToDelete] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  // Fetch components with optional search query and pagination
  const fetchComponents = async (page = currentPage) => {
    setLoading(true);
    try {
      const skip = (page - 1) * itemsPerPage;
      const take = itemsPerPage;
      
      const response = await fetch('/api/components', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search: searchQuery,
          skip,
          take
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch components');
      }
      
      const data = await response.json();
      setComponents(data);
      
      // For a real implementation, the API would return total count
      // For now, we'll estimate based on the current page and items received
      if (data.length === itemsPerPage) {
        // If we got a full page, assume there are more
        setTotalItems(page * itemsPerPage + 1);
        setTotalPages(Math.ceil((page * itemsPerPage + 1) / itemsPerPage));
      } else {
        // If we got less than a full page, this is the last page
        setTotalItems((page - 1) * itemsPerPage + data.length);
        setTotalPages(page);
      }
    } catch (error) {
      console.error('Error fetching components:', error);
      toast.error('Failed to load components');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchComponents();
  }, []);

  // Search components
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchComponents(1);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    fetchComponents(newPage);
  };

  // Delete component
  const deleteComponent = async (id: string) => {
    try {
      const response = await fetch(`/api/component/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete component');
      }
      
      setComponents(components.filter(component => component.id !== id));
      toast.success('Component deleted successfully');
      
      // Refresh the current page if we deleted the last item on the page
      if (components.length === 1 && currentPage > 1) {
        handlePageChange(currentPage - 1);
      } else {
        fetchComponents(currentPage);
      }
    } catch (error) {
      console.error('Error deleting component:', error);
      toast.error('Failed to delete component');
    } finally {
      setIsDeleteDialogOpen(false);
      setComponentToDelete(null);
    }
  };

  // Confirmation dialog for delete
  const openDeleteDialog = (id: string) => {
    setComponentToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="container py-10 bg-background">
      <Card className="bg-gradient-to-br from-sidebar/60 to-sidebar">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-3xl">Components</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64"
              />
              <Button type="submit" variant="secondary" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex gap-2">
              <Button 
                variant="default" 
                onClick={() => router.push('/admin/addcomponent')}
                className="flex gap-1 items-center"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => fetchComponents(currentPage)}
                className="flex gap-1 items-center"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Refresh</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin" />
            </div>
          ) : components.length > 0 ? (
            <>
              <div className="rounded-md border bg-background overflow-hidden overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {components.map((component) => (
                      <TableRow key={component.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{component.name}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {component.description}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          ${component.price.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {component.author}
                        </TableCell>
                        <TableCell>
                          {component.views.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {component.categories.slice(0, 2).map((category, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                              >
                                {category}
                              </span>
                            ))}
                            {component.categories.length > 2 && (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                                +{component.categories.length - 2}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(component.updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/components/${component.urlname}`)}
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/admin/editcomponent/edit/${component.id}`)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => openDeleteDialog(component.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination Controls */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} components
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous Page</span>
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next Page</span>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 text-5xl">🏝️</div>
              <h3 className="text-xl font-semibold mb-2">No components found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'No components match your search criteria' : 'Start by adding a new component'}
              </p>
              {searchQuery ? (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                    fetchComponents(1);
                  }}
                >
                  Clear search
                </Button>
              ) : (
                <Button onClick={() => router.push('/components/add')}>
                  Add your first component
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the component and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => componentToDelete && deleteComponent(componentToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}