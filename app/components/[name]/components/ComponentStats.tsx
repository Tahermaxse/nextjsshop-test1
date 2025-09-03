"use client";

import { Clock,Eyes,Pages } from "@/components/Svgs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Components } from "@/lib/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface ComponentStatsProps {
  Component: Components;
}

interface StatItemProps {
  icon: React.ReactNode;
  mainText: string;
  subText: string;
}

function StatItem({ icon, mainText, subText }: StatItemProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-1 text-center dark:bg-opacity-10 p-2 rounded-lg">
      <div className="mb-2">{icon}</div>
      <span className="text-sm font-medium">{mainText}</span>
      <span className="text-xs text-muted-foreground">{subText}</span>
    </div>
  );
}

export default function ComponentStats({ Component: initialComponent }: ComponentStatsProps) {
  const [component, setComponent] = useState(initialComponent);

  // Update local state when prop changes
  useEffect(() => {
    setComponent(initialComponent);
  }, [initialComponent]);

  // Increment view count when component is loaded
  useEffect(() => {
    const incrementView = async () => {
      try {
        const response = await fetch(`/api/components/${component.urlname}/increment-view`, {
          method: 'POST',
        });
        if (response.ok) {
          const data = await response.json();
          // Update the local component state with the new view count
          setComponent(prev => ({
            ...prev,
            views: data.views
          }));
        }
      } catch (error) {
        console.error('Error incrementing view count:', error);
      }
    };

    incrementView();
  }, [component.urlname]);

  // Format the date string from the updated field
  const updatedAt = component.updatedAt;
  const formattedDate = updatedAt
    ? format(new Date(updatedAt), "MMM dd, yyyy")
    : "N/A";

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 dark:bg-inherit bg-white text-foreground p-4 border-t">
      <StatItem
        icon={
          <Avatar className="h-8 w-8">
            <AvatarImage src={component.authorUrl} alt={component.author} />

            <AvatarFallback>{component.author[0]}</AvatarFallback>
          </Avatar>
        }
        mainText={component.author}
        subText="Creator"
      />

      <StatItem
        icon={<Clock />}
        mainText={formattedDate}
        subText="Updated"
      />

      <StatItem
        icon={<Pages />}
        mainText={component.pages?.toString() ?? "-"}
        subText="Pages"
      />

      <div className="hidden md:block">
        <StatItem
          icon={<Eyes />}
          mainText={`${component.views}+`}
          subText="Views"
        />
      </div>
    </div>
  );
}
