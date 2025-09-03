'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import toast from "react-hot-toast";

// Define the validation schema using Zod
const featureSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
});

const videoSchema = z.object({
  src: z.string().url('Must be a valid URL'),
  alt: z.string().min(1, 'Alt text is required'),
});

const imageSchema = z.object({
  src: z.string().url('Must be a valid URL'),
  alt: z.string().min(1, 'Alt text is required'),
});

const formSchema = z.object({
  urlname: z.string().min(1, 'URL name is required'),
  name: z.string().min(1, 'Name is required'),
  price: z.coerce.number().min(0, 'Price must be non-negative'),
  author: z.string().min(1, 'Author is required'),
  authorUrl: z.string().url('Author URL must be a valid URL'),
  image: z.string().url('Image must be a valid URL'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  views: z.coerce.number().int().min(0, 'Views must be a non-negative integer'),
  pages: z.coerce.number().int().min(1, 'Must have at least one page'),
  categoriesInput: z.string().min(1, 'At least one category is required'),
  pagesListInput: z.string().min(1, 'At least one page is required'),
  preview: z.string().url('Preview URL must be a valid URL'),
  zip: z.string().url('Zip URL must be a valid URL'),
  paragraph1: z.string().min(10, 'Paragraph 1 must be at least 10 characters'),
  paragraph2: z.string().min(10, 'Paragraph 2 must be at least 10 characters'),
  features: z.array(featureSchema).min(1, 'At least one feature is required'),
  videos: z.array(videoSchema).optional().default([]),
  images: z.array(imageSchema).min(1, 'At least one image is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddComponentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      urlname: '',
      name: '',
      price: 0,
      author: '',
      authorUrl: '',
      image: '',
      description: '',
      views: 0,
      pages: 1,
      categoriesInput: '',
      pagesListInput: '',
      preview: '',
      zip: '',
      paragraph1: '',
      paragraph2: '',
      features: [{ question: '', answer: '' }],
      videos: [],
      images: [{ src: '', alt: '' }],
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: 'features',
  });

  const { fields: videoFields, append: appendVideo, remove: removeVideo } = useFieldArray({
    control,
    name: 'videos',  // Fixed: was using wrong field name
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: 'images',  // Fixed: was using wrong field name
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Filter out empty videos before validation/submission
      const filteredVideos = (data.videos || []).filter(
        v => v.src.trim() !== '' && v.alt.trim() !== ''
      );
      // Process categories and pagesList from comma-separated strings to arrays
      const categories = data.categoriesInput.split(',').map(item => item.trim()).filter(Boolean);
      const pagesList = data.pagesListInput.split(',').map(item => item.trim()).filter(Boolean);
      
      // Prepare the data for the API using object destructuring
      const { categoriesInput, pagesListInput, ...apiData } = data;
      
      // Add the processed arrays to the API data
      const finalApiData = {
        ...apiData,
        categories,
        pagesList,
        videos: filteredVideos, // Use filtered videos here
      };
      
      const response = await fetch('/api/addcomponent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalApiData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to add template');
      }
      toast.success("Component added successfully");
      
      router.push('/components'); // Redirect to templates list
    } catch (error) {
      console.error('Error adding template:', error);
      toast.error(`${error instanceof Error ? error.message : 'Something went wrong'} `);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-10 bg-background">
      <h1 className="text-3xl font-bold mb-6">Add New Component</h1>
      
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Card className='bg-background bg-gradient-to-br from-sidebar/60 to-sidebar'>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="urlname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Name</FormLabel>
                      <FormControl>
                        <Input placeholder="newcomponent" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Component Name</FormLabel>
                      <FormControl>
                        <Input placeholder="New Component" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="15" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={control}
                name="authorUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/author" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A brief description of the template..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card className='bg-gradient-to-br from-sidebar/60 to-sidebar'>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="views"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Views</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="200" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name="pages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Pages</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="7" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={control}
                name="categoriesInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories (comma-separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="SaaS, Startup, AI" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name="pagesListInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pages List (comma-separated)</FormLabel>
                    <FormControl>
                      <Input placeholder="Home, About, Contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name="preview"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preview URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/preview" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip File URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/template.zip" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name="paragraph1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paragraph 1</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Detailed description of the template..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name="paragraph2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paragraph 2</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Additional information about the template..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card className='bg-gradient-to-br from-sidebar/60 to-sidebar'>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Features</span>
                <Button type="button" variant="outline" onClick={() => appendFeature({ question: '', answer: '' })}>
                  Add Feature
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {featureFields.map((field, index) => (
                <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start relative">
                  <FormField
                    control={control}
                    name={`features.${index}.question`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Feature Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Responsive Design" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={control}
                    name={`features.${index}.answer`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Feature Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Modern and minimal design..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {featureFields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="mt-8"
                      onClick={() => removeFeature(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className='bg-gradient-to-br from-sidebar/60 to-sidebar'>
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span>Videos</span>
        <Button type="button" variant="outline" onClick={() => appendVideo({ src: '', alt: '' })}>
          Add Video
        </Button>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {videoFields.map((field, index) => (  // Fixed: was using imageFields
        <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start relative">
          <FormField
            control={control}
            name={`videos.${index}.src`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Video URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/video.mp4" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name={`videos.${index}.alt`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Video Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description of the video" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {videoFields.length > 1 && (  // Fixed: was using imageFields
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="mt-8"
              onClick={() => removeVideo(index)}  // Fixed: was using removeImage
            >
              Remove
            </Button>
          )}
        </div>
      ))}
    </CardContent>
  </Card>

  <Card className='bg-gradient-to-br from-sidebar/60 to-sidebar'>
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span>Images</span>
        <Button type="button" variant="outline" onClick={() => appendImage({ src: '', alt: '' })}>
          Add Image
        </Button>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {imageFields.map((field, index) => (
        <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start relative">
          <FormField
            control={control}
            name={`images.${index}.src`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name={`images.${index}.alt`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Image Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description of the image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {imageFields.length > 1 && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="mt-8"
              onClick={() => removeImage(index)}
            >
              Remove
            </Button>
          )}
        </div>
      ))}
    </CardContent>
  </Card>
          
          <div className="flex justify-end">
            <Button type="submit" className="min-w-[150px]" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Add Component'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}