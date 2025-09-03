'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HiOutlineTemplate, 
  HiOutlineViewGrid 
} from "react-icons/hi";
import { 
  BiSolidLayerPlus, 
  BiLock 
} from "react-icons/bi";

import { Footer,Navbar,Grid,Cta,Login,Singup,Integration,Pricing,Contact,Faq,LogoCloud } from './Svgs';

const categories = [
  { name: 'Footer', icon: Footer },
  { name: 'Navbar', icon: Navbar },
  { name: 'CTA', icon: Cta },
  { name: 'Login', icon: Login },
  { name: 'Signup', icon: Singup },
  { name: 'Integration', icon: Integration },
  { name: 'Pricing', icon: Pricing },
  { name: 'Testimonials', icon: BiLock },
  {name :'Enterprise', icon: HiOutlineViewGrid},
  { name: 'LogoCloud', icon: LogoCloud },
  { name: 'FAQ', icon: Faq },
  { name: 'Contact', icon: Contact },
];

export function ComponentCategoryList() {
  const pathname = usePathname();

  return (
    <div className='w-full border-b bg-white dark:bg-background'>
      <div className="container mx-auto max-w-[1200px] p-4">
        <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
          <Link href="/components">
            <Button
              variant={pathname === "/components" ? "category" : "outline"}
              size="sm"
              className="rounded-lg shrink-0"
            >
              <Grid />
              All
            </Button>
          </Link>
          {categories.map((category) => {
            const categoryPath = `/components/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`;
            const isActive = pathname === categoryPath;
            const Icon = category.icon;

            return (
              <Link key={category.name} href={categoryPath}>
                <Button
                  variant={isActive ? "category" : "outline"}
                  size="sm"
                  className="rounded-lg shrink-0"
                >
                  <Icon className="mr-2" />
                  {category.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}