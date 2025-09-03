'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Grid,SaaS,Splash,Web3, Display, Film, App, Ai, Blog, RulerAndPencil, Business, CheckCircle, Documentation, ShoppingCart, Education, Microphone, Food, Gift, Heart, LandingPage, Membership, Minimal, Modern, Star, News, User, Camera, Podcast, Gallery, Chair, Sidebar, Zap, Tech, CreditCard } from '@/components/Svgs';

const categories = [
  { name: 'Agency', icon: Display },
  { name: 'Animated', icon: Film },
  { name: 'App', icon: App },
  { name: 'AI', icon: Ai },
  { name: 'Blog', icon: Blog },
  { name: 'Brand Guidelines', icon: RulerAndPencil },
  { name: 'Business', icon: Business },
  { name: 'Changelog', icon: CheckCircle },
  { name: 'Documentation', icon: Documentation },
  { name: 'Ecommerce', icon: ShoppingCart },
  { name: 'Education', icon: Education },
  { name: 'Entertainment', icon: Microphone },
  { name: 'Food', icon: Food },
  { name: 'Free', icon: Gift },
  { name: 'Health', icon: Heart },
  { name: 'Landing Page', icon: LandingPage },
  { name: 'Membership', icon: CreditCard },
  { name: 'New', icon: Star },
  { name: 'News', icon: News },
  { name: 'Personal', icon: User },
  { name: 'Photography', icon: Camera },
  { name: 'Portfolio', icon: Gallery },
  { name: 'Real Estate', icon: Chair },
  { name: 'Restaurant', icon: Food },
  { name: 'Resume', icon: User },
  { name: 'SaaS', icon: SaaS },
  { name: 'Sidebar', icon: Sidebar },
  { name: 'Startup', icon: Zap },

];

export function CategoryList() {
  const pathname = usePathname();

  return (
    <div className='w-full border-b bg-white dark:bg-background'>
      <div className="container mx-auto max-w-[1200px] p-4">
        <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
          <Link href="/templates">
            <Button
              variant={pathname === "/templates" ? "category" : "outline"}
              size="sm"
              className="rounded-lg flex items-center p-4"
            >
              <Grid />
              All
            </Button>
          </Link>
          {categories.map(({ name, icon: Icon }) => {
            const categoryPath = `/templates/category/${name.toLowerCase().replace(/\s+/g, '-')}`;
            const isActive = pathname === categoryPath;

            return (
              <Link key={name} href={categoryPath}>
                <Button
                  variant={isActive ? "category" : "outline"}
                  size="sm"
                  className="rounded-lg flex items-center p-4"
                >
                  <Icon /> 
                  {name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}