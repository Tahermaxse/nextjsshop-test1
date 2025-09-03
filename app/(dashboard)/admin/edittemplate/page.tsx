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
  ChevronRight,
  Rocket
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Template {
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

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  // Launch template (send email to all users)
  const [launchingId, setLaunchingId] = useState<string | null>(null);

  // Fetch templates with optional search query and pagination
  const fetchTemplates = async (page = currentPage) => {
    setLoading(true);
    try {
      const skip = (page - 1) * itemsPerPage;
      const take = itemsPerPage;
      
      const response = await fetch('/api/templates', {
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
        throw new Error('Failed to fetch templates');
      }
      
      const data = await response.json();
      setTemplates(data);
      
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
      console.error('Error fetching templates:', error);
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTemplates();
  }, []);

  // Search templates
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchTemplates(1);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    fetchTemplates(newPage);
  };

  // Delete template
  const deleteTemplate = async (id: string) => {
    try {
      const response = await fetch(`/api/template/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete template');
      }
      
      setTemplates(templates.filter(template => template.id !== id));
      toast.success('Template deleted successfully');
      
      // Refresh the current page if we deleted the last item on the page
      if (templates.length === 1 && currentPage > 1) {
        handlePageChange(currentPage - 1);
      } else {
        fetchTemplates(currentPage);
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Failed to delete template');
    } finally {
      setIsDeleteDialogOpen(false);
      setTemplateToDelete(null);
    }
  };

  // Launch template (send email to all users)
  const launchTemplate = async (template: Template) => {
    setLaunchingId(template.id);
    try {
      const url = `${window.location.origin}/templates/${template.urlname}`;
      const response = await fetch('/api/templates/launch-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: template.id, name: template.name, url }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send launch email');
      toast.success('Launch email sent to all users!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send launch email');
    } finally {
      setLaunchingId(null);
    }
  };

  // Confirmation dialog for delete
  const openDeleteDialog = (id: string) => {
    setTemplateToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="container py-10 bg-background">
      <Card className="bg-gradient-to-br from-sidebar/60 to-sidebar">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-3xl">Templates</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search templates..."
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
                onClick={() => router.push('/templates/add')}
                className="flex gap-1 items-center"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => fetchTemplates(currentPage)}
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
          ) : templates.length > 0 ? (
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
                    {templates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{template.name}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {template.description}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          ${template.price.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {template.author}
                        </TableCell>
                        <TableCell>
                          {template.views.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {template.categories.slice(0, 2).map((category, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                              >
                                {category}
                              </span>
                            ))}
                            {template.categories.length > 2 && (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                                +{template.categories.length - 2}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(template.updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/templates/${template.urlname}`)}
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/admin/edittemplate/edit/${template.id}`)}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => launchTemplate(template)}
                              disabled={launchingId === template.id}
                              title="Send launch email to all users"
                            >
                              <Rocket className={launchingId === template.id ? 'animate-spin h-4 w-4' : 'h-4 w-4'} />
                              <span className="sr-only">Launch</span>
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => openDeleteDialog(template.id)}
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
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} templates
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
              <h3 className="text-xl font-semibold mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'No templates match your search criteria' : 'Start by adding a new template'}
              </p>
              {searchQuery ? (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                    fetchTemplates(1);
                  }}
                >
                  Clear search
                </Button>
              ) : (
                <Button onClick={() => router.push('/templates/add')}>
                  Add your first template
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
              This action cannot be undone. This will permanently delete the template and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => templateToDelete && deleteTemplate(templateToDelete)}
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