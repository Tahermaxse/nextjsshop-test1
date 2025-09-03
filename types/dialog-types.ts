export interface ChangelogItem {
    version: string;
    date: string;
    changes: {
      type: "added" | "changed" | "fixed" | "removed";
      description: string;
    }[];
  }
  
  export interface UserProfileFormValues {
    name: string;
    email: string;
    bio: string;
    avatar: string;
    website?: string;
    location?: string;
  }
  
  export interface WizardStep {
    id: string;
    title: string;
    description?: string;
    component: React.ReactNode;
    canProceed: boolean;
  }
  
  export interface SettingsTab {
    id: string;
    label: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
  }
  
  export interface CookieCategory {
    id: string;
    name: string;
    description: string;
    required?: boolean;
  }
  
  export interface SubscriptionPlan {
    id: string;
    name: string;
    description: string;
    price: {
      monthly: number;
      yearly: number;
      currency: string;
    };
    features: string[];
    popular?: boolean;
  }
  