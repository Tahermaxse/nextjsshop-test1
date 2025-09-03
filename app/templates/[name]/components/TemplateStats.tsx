"use client";

import { Clock,Eyes,Pages } from "@/components/Svgs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Template } from "@/lib/types";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface TemplateStatsProps {
  template: Template;
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

export default function TemplateStats({ template: initialTemplate }: TemplateStatsProps) {
  const [template, setTemplate] = useState(initialTemplate);

  // Update local state when prop changes
  useEffect(() => {
    setTemplate(initialTemplate);
  }, [initialTemplate]);

  // Format the date string from the updated field
  const updatedAt = template.updatedAt;
  const formattedDate = updatedAt
    ? format(new Date(updatedAt), "MMM dd, yyyy")
    : "N/A";

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 dark:bg-inherit bg-white text-foreground p-4 border-t">
      <StatItem
        icon={
          <Avatar className="h-8 w-8">
            <AvatarImage src={template.authorUrl} alt={template.author} />

            <AvatarFallback>{template.author[0]}</AvatarFallback>
          </Avatar>
        }
        mainText={template.author}
        subText="Creator"
      />

      <StatItem
        icon={<Clock />}
        mainText={formattedDate}
        subText="Updated"
      />

      <StatItem
        icon={<Pages />}
        mainText={template.pages?.toString() ?? "-"}
        subText="Pages"
      />

      <div className="hidden md:block">
        <StatItem
          icon={<Eyes />}
          mainText={`${template.views}+`}
          subText="Views"
        />
      </div>
    </div>
  );
}
