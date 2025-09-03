import 'next-auth';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }
}

export interface ImageType {
  src: string | StaticImport;
  alt: string;
}
export interface VideoType {
  src: string | StaticImport;
  alt: string;
}

export interface FeatureType {
  id: string;
  question: string;
  answer: string;
}

export interface TemplatePageClientProps {
  template: Template;
}
export interface Template {
  id: string;
  name: string;
  price: number;
  author: string;
  authorUrl: string;
  image: string;
  description: string;
  updatedAt: string;
  views: number;
  pages: number;
  categories: string[];
  pagesList: string[];
  preview: string;
  zip: string;
  paragraph1: string;
  paragraph2: string;
  urlname: string;
  purchaseId?: number;
  features?: FeatureType[];
  images?: ImageType[];
  videos?: VideoType[];
  url?: string;
  title?: string;
}
  

export interface Components {
  id: string;
  name: string;
  price: number;
  author: string;
  authorUrl: string;
  image: string;
  description: string;
  updatedAt: string;
  views: number;
  categories: string[];
  preview: string;
  zip: string;
  paragraph1: string;
  paragraph2: string;
  purchaseId?: number;
  pages?: number;
  downloads: number;
  pagesList: string[];
  createdAt: Date;
  supportLinks?: { url: string; title: string }[];
  images?: ImageType[];
  videos?: VideoType[];
  features?: FeatureType[];
  urlname: string;
}