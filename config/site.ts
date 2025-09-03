import { Metadata, Viewport } from "next";

export const siteConfig = {
  name: "Nextjsshop",
  url: "https://nextjsshop.com",
  ogImage: "https://nextjsshop.com/og-image.png",
  description:
    "Welcome to Nextjsshop - your source for 100+ premium UI components and 50+ responsive website templates. Build stunning web projects with ease.",
  links: {
    twitter: "https://twitter.com/nextjsshop",
  },
}

export type SiteConfig = typeof siteConfig

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

// Viewport Configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: META_THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: META_THEME_COLORS.dark },
  ],
};

// SEO Keywords Configuration
export const SEO_KEYWORDS = {
  primary: [
    "Next.js templates",
    "Tailwind CSS components", 
    "React UI components",
    "Next.js app router templates",
    "modern UI components",
    "responsive templates",
    "Nextjsshop"
  ],
  secondary: [
    "premium React templates",
    "Next.js dashboard templates", 
    "Tailwind templates",
    "React component library",
    "Next.js landing page templates",
    "UI kit",
    "web development templates",
    "frontend components"
  ],
  technical: [
    "TypeScript templates",
    "server-side rendering templates",
    "Next.js 14 templates",
    "Next.js 15 templates", 
    "SaaS templates",
    "ecommerce templates",
    "professional UI components",
    "copy-paste components"
  ],
  longTail: [
    "Next.js app router dashboard templates",
    "Tailwind CSS responsive components",
    "modern React dashboard templates",
    "Next.js TypeScript templates",
    "professional landing page templates",
    "copy-paste Tailwind components",
    "ready-to-use React components",
    "premium Next.js UI kit"
  ]
}

// Generate complete keywords string
export const getAllKeywords = (): string => {
  return [
    ...SEO_KEYWORDS.primary,
    ...SEO_KEYWORDS.secondary, 
    ...SEO_KEYWORDS.technical,
    ...SEO_KEYWORDS.longTail
  ].join(", ");
}

// Default SEO Metadata
export const defaultSEO: Metadata = {
  title: `${siteConfig.name} - Premium Next.js Templates & Tailwind CSS Components`,
  description: `Download 100+ premium Next.js app router templates and Tailwind CSS components. Modern, responsive UI kits for React developers. Build faster with our professional templates and ready-to-use components.`,
  keywords: getAllKeywords(),
  
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: siteConfig.url,
  },

  authors: [
    { name: "Taher Hathi - Fullstack Developer(Founder)", url: "https://taherhathi.vercel.app" },
    { name: "Karansinh Chauhan - Fullstack Developer(Co-founder)", url: "https://karansinhchauhan.vercel.app" },
  ],

  creator: "Nextjsshop Team",
  publisher: "Nextjsshop",
  category: "Technology",
  classification: "Web Development Templates and Components",

  openGraph: {
    title: `${siteConfig.name} - Premium Next.js Templates & Tailwind Components`,
    description: `Transform your web development with 100+ Next.js app router templates and Tailwind CSS components. Professional, modern, and responsive designs for React developers and designers.`,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Next.js Templates and Tailwind CSS Components Preview`,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Next.js Templates & Tailwind Components`,
    description: `100+ Next.js app router templates & Tailwind CSS components. Build modern, responsive websites faster with our premium UI kit.`,
    images: [siteConfig.ogImage],
    creator: "@nextjsshop",
    site: "@nextjsshop",
  },

  other: {
    "google-site-verification": "your-verification-code", // Replace with actual code
    "msvalidate.01": "your-bing-verification-code", // Replace with actual code
  },
}

// Structured Data for JSON-LD
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": siteConfig.name,
  "description": "Premium Next.js templates and Tailwind CSS components for modern web development",
  "url": siteConfig.url,
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "image": siteConfig.ogImage,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "category": "Digital Product"
  },
  "creator": [
    {
      "@type": "Person",
      "name": "Taher Hathi",
      "url": "https://taherhathi.vercel.app",
      "jobTitle": "Fullstack Developer(Founder)"
    },
    {
      "@type": "Person", 
      "name": "Karansinh Chauhan",
      "url": "https://karansinhchauhan.vercel.app",
      "jobTitle": "Fullstack Developer(Co-founder)"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Developer"
      },
      "reviewBody": "Amazing collection of Next.js templates and Tailwind components!"
    }
  ]
}

// Organization structured data
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": siteConfig.name,
  "url": siteConfig.url,
  "logo": `${siteConfig.url}/logo.png`,
  "sameAs": [
    siteConfig.links.twitter,
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "English"
  }
}

// Website structured data
export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteConfig.name,
  "url": siteConfig.url,
  "description": siteConfig.description,
  "publisher": {
    "@type": "Organization",
    "name": siteConfig.name,
    "logo": `${siteConfig.url}/logo.png`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
}

// Page-specific SEO generators
export const generatePageSEO = (
  title: string,
  description: string,
  path: string = "",
  keywords: string[] = []
): Metadata => {
  const pageUrl = `${siteConfig.url}${path}`;
  const allKeywords = [...SEO_KEYWORDS.primary, ...keywords].join(", ");
  
  return {
    ...defaultSEO,
    title: `${title} | ${siteConfig.name}`,
    description,
    keywords: allKeywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      ...defaultSEO.openGraph,
      title: `${title} | ${siteConfig.name}`,
      description,
      url: pageUrl,
    },
    twitter: {
      ...defaultSEO.twitter,
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  }
}

// Template-specific SEO
export const templateSEO = generatePageSEO(
  "Next.js Templates - Premium App Router Templates",
  "Browse 50+ premium Next.js app router templates. Modern, responsive designs for dashboards, landing pages, SaaS apps, and more. Ready-to-use with TypeScript support.",
  "/templates",
  ["Next.js dashboard templates", "landing page templates", "SaaS templates", "ecommerce templates"]
);

export const componentSEO = generatePageSEO(
  "Tailwind CSS Components - Premium UI Components",
  "Discover 100+ premium Tailwind CSS components. Copy-paste ready components for forms, navigation, cards, buttons, and more. Modern, accessible, and responsive.",
  "/components", 
  ["Tailwind CSS components", "React UI components", "copy-paste components", "premium UI components"]
);

// Blog SEO
export const blogSEO = generatePageSEO(
  "Blog - Next.js and React Development Tips",
  "Learn Next.js, React, and Tailwind CSS through our comprehensive tutorials and guides. Stay updated with the latest web development trends and best practices.",
  "/blog",
  ["Next.js tutorial", "React development", "Tailwind CSS guide", "web development blog"]
);

// Dynamic Templates Page SEO Generator
export const generateTemplatesSEO = async (templates: any[]): Promise<Metadata> => {
  const canonicalUrl = `${siteConfig.url}/templates/${templates[0].name}`;
  
  try {
    const totalTemplates = templates.length;
    const categories = Array.from(
      new Set(templates.flatMap((t: any) => t.categories || []))
    ).join(', ');

    return {
      // Core Metadata
      title: `Premium Responsive Website Templates - ${siteConfig.name}`,
      description: `Explore ${totalTemplates} premium Next.js, Tailwind CSS templates to create beautiful, responsive websites effortlessly with ${siteConfig.name}.`,
      keywords: `website templates, responsive templates, ${siteConfig.name}, Next.js templates, Tailwind CSS templates, premium templates, web design, modern templates, ${categories}, ${getAllKeywords()}`,

      // Icons
      icons: {
        icon: "/favicon.png",
        apple: "/apple-touch-icon.png",
        shortcut: "/favicon-16x16.png",
      },

      // Robots Directives
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },

      // Canonical URL
      alternates: {
        canonical: `${canonicalUrl}`,
      },

      // Authors
      authors: [
        { name: 'Taher Hathi - Fullstack Developer(Founder)', url: 'https://taherhathi.vercel.app' },
        { name: 'Karansinh Chauhan - Fullstack Developer(Co-Founder)', url: 'https://karansinhchauhan.vercel.app' },
      ],

      creator: "Nextjsshop Team",
      publisher: "Nextjsshop",
      category: "Technology",
      classification: "Web Development Templates",

      // Open Graph
      openGraph: {
        title: `Premium Website Templates - ${siteConfig.name}`,
        description: `Discover a curated selection of ${totalTemplates} responsive Next.js & Tailwind CSS templates to kickstart your next project with ${siteConfig.name}.`,
        url: canonicalUrl,
        siteName: siteConfig.name,
        type: 'website',
        locale: 'en_US',
        images: [
          {
            url: `${siteConfig.url}/${templates[0].image || 'og-image.png'}`,
            width: 1200,
            height: 630,
            alt: `${siteConfig.name} Templates Collection - ${totalTemplates} Premium Templates`,
            type: 'image/png',
          },
        ],
      },

      // Twitter Cards
      twitter: {
        card: 'summary_large_image',
        title: `Premium Website Templates - ${siteConfig.name}`,
        description: `Check out ${totalTemplates} responsive Next.js & Tailwind CSS templates on ${siteConfig.name} to build stunning websites.`,
        images: [`${siteConfig.url}/${templates[0].image || 'og-image.png'}`],
        creator: '@nextjsshop',
        site: '@nextjsshop',
      },

      // Additional SEO Enhancements
      applicationName: siteConfig.name,
      generator: 'Next.js',
      
      other: {
        "google-site-verification": "your-verification-code",
        "msvalidate.01": "your-bing-verification-code",
      },
    };
  } catch (error) {
    console.error('Error generating templates metadata:', error);
    return {
      title: `Error Loading Templates - ${siteConfig.name}`,
      description: 'An error occurred while loading the templates page. Please refresh the page or try again later.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
};

// Dynamic Components Page SEO Generator  
export const generateComponentsSEO = async (components: any[]): Promise<Metadata> => {
  const canonicalUrl = `${siteConfig.url}/components/${components[0].name}`;
  
  try {
    const totalComponents = components.length;
    const categories = Array.from(
      new Set(components.flatMap((c: any) => c.categories || []))
    ).join(', ');

    return {
      // Core Metadata
      title: `Premium Tailwind CSS Components - ${siteConfig.name}`,
      description: `Browse ${totalComponents} premium Tailwind CSS & React components. Copy-paste ready UI components for modern web development with ${siteConfig.name}.`,
      keywords: `Tailwind CSS components, React UI components, ${siteConfig.name}, premium components, copy-paste components, UI library, web components, ${categories}, ${getAllKeywords()}`,

      // Icons
      icons: {
        icon: "/favicon.png", 
        apple: "/apple-touch-icon.png",
        shortcut: "/favicon-16x16.png",
      },

      // Robots Directives
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },

      // Canonical URL
      alternates: {
        canonical: canonicalUrl,
      },

      // Authors
      authors: [
        { name: 'Taher Hathi - Fullstack Developer(Founder)', url: 'https://taherhathi.vercel.app' },
        { name: 'Karansinh Chauhan - Fullstack Developer(Co-Founder)', url: 'https://karansinhchauhan.vercel.app' },
      ],

      creator: "Nextjsshop Team",
      publisher: "Nextjsshop", 
      category: "Technology",
      classification: "UI Components Library",

      // Open Graph
      openGraph: {
        title: `Premium Tailwind CSS Components - ${siteConfig.name}`,
        description: `Discover ${totalComponents} premium Tailwind CSS & React components. Ready-to-use, copy-paste UI components for modern web development.`,
        url: canonicalUrl,
        siteName: siteConfig.name,
        type: 'website',
        locale: 'en_US',
        images: [
          {
            url: `${siteConfig.url}/${components[0].image || 'og-image.png'}`, 
            width: 1200,
            height: 630,
            alt: `${siteConfig.name} Components Library - ${totalComponents} Premium Components`,
            type: 'image/png, image/webp, image/jpg, image/jpeg',
          },
        ],
      },

      // Twitter Cards
      twitter: {
        card: 'summary_large_image',
        title: `Premium Tailwind CSS Components - ${siteConfig.name}`,
        description: `Explore ${totalComponents} premium Tailwind CSS & React components. Copy-paste ready for your next project.`,
        images: [`${siteConfig.url}/${components[0].image || 'og-image.png'}`],
        creator: '@nextjsshop',
        site: '@nextjsshop',
      },

      // Additional SEO Enhancements
      applicationName: siteConfig.name,
      generator: 'Next.js',
      
      other: {
        "google-site-verification": "your-verification-code",
        "msvalidate.01": "your-bing-verification-code",
      },
    };
  } catch (error) {
    console.error('Error generating components metadata:', error);
    return {
      title: `Error Loading Components - ${siteConfig.name}`,
      description: 'An error occurred while loading the components page. Please refresh the page or try again later.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
};

// Individual Template SEO Generator
export const generateSingleTemplateSEO = (template: any): Metadata => {
  const canonicalUrl = `${siteConfig.url}/templates/${template.name}`;
  const categories = template.categories?.join(', ') || '';
  
  return {
    title: `${template.name} - Premium Next.js Template | ${siteConfig.name}`,
    description: `Download ${template.name}, a premium Next.js template. ${template.description || 'Modern, responsive design perfect for your next project.'} ${template.paragraph1} ${template.paragraph2} Built with Tailwind CSS.`,
    keywords: `${template.name}, Next.js template, Tailwind CSS, premium template, ${categories}, responsive design, ${siteConfig.name}, web template, ${getAllKeywords()}`,
    
    // Icons
    icons: {
      icon: "/favicon.png",
      apple: "/apple-touch-icon.png", 
      shortcut: "/favicon-16x16.png",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    alternates: {
      canonical: canonicalUrl,
    },

    authors: [
      { name: 'Taher Hathi - Fullstack Developer(Founder)', url: 'https://taherhathi.vercel.app' },
      { name: 'Karansinh Chauhan - Fullstack Developer(Co-founder)', url: 'https://karansinhchauhan.vercel.app' },
    ],

    openGraph: {
      title: `${template.name} - Premium Next.js Template`,
      description: `${template.description || 'Premium Next.js template with modern design'} ${template.paragraph1} ${template.paragraph2} - Available at ${siteConfig.name}`,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: template.image || `${siteConfig.url}/template-default.png`,
          width: 1200,
          height: 630,
          alt: `${template.name} Template Preview`,
          type: 'image/png',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: `${template.name} - Premium Next.js Template`,
      description: `${template.description || 'Premium Next.js template'} - Get it at ${siteConfig.name}`,
      images: [template.image || `${siteConfig.url}/template-default.png`],
      creator: '@nextjsshop',
      site: '@nextjsshop',
    },

    applicationName: siteConfig.name,
    generator: 'Next.js',
  };
};

export const generateSingleComponentSEO = (component: any): Metadata => {
  const canonicalUrl = `${siteConfig.url}/components/${component.name}`;
  const categories = component.categories?.join(', ') || '';

  return {
    title: `${component.name} - Premium Tailwind CSS Component | ${siteConfig.name}`,
    description: `Download ${component.name}, a premium Tailwind CSS/React component. ${component.description || 'Modern, responsive, and ready to use.'} ${component.paragraph1 || ''} ${component.paragraph2 || ''}`,
    keywords: `${component.name}, Tailwind CSS component, React UI, premium component, ${categories}, ${siteConfig.name}, web component, ${getAllKeywords()}`,

    icons: {
      icon: "/favicon.png",
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon-16x16.png",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    alternates: {
      canonical: canonicalUrl,
    },

    authors: [
      { name: 'Taher Hathi - Fullstack Developer(Founder)', url: 'https://taherhathi.vercel.app' },
      { name: 'Karansinh Chauhan - Fullstack Developer(Co-founder)', url: 'https://karansinhchauhan.vercel.app' },
    ],

    openGraph: {
      title: `${component.name} - Premium Tailwind CSS Component`,
      description: `${component.description || 'Premium Tailwind CSS component with modern design.'} ${component.paragraph1 || ''} ${component.paragraph2 || ''} - Available at ${siteConfig.name}`,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: component.image || `${siteConfig.url}/component-default.png`,
          width: 1200,
          height: 630,
          alt: `${component.name} Component Preview`,
          type: 'image/png',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: `${component.name} - Premium Tailwind CSS Component`,
      description: `${component.description || 'Premium Tailwind CSS component'} - Get it at ${siteConfig.name}`,
      images: [component.image || `${siteConfig.url}/component-default.png`],
      creator: '@nextjsshop',
      site: '@nextjsshop',
    },

    applicationName: siteConfig.name,
    generator: 'Next.js',
  };
};

export const generateCategoryTemplatesSEO = (category: string, templates: any[]): Metadata => {
  const canonicalUrl = `${siteConfig.url}/templates/category/${category}`;
  const totalTemplates = templates.length;
  const categories = Array.from(
    new Set(templates.flatMap((t: any) => t.categories || []))
  ).join(', ');

  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Templates - Premium Next.js & Tailwind CSS | ${siteConfig.name}`,
    description: `Explore ${totalTemplates} premium ${category} templates for Next.js and Tailwind CSS. Build modern, responsive websites with our curated ${category} template collection at ${siteConfig.name}.`,
    keywords: `${category} templates, Next.js ${category} templates, Tailwind CSS ${category} templates, premium ${category} templates, ${categories}, ${siteConfig.name}, web templates, ${getAllKeywords()}`,

    icons: {
      icon: "/favicon.png",
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon-16x16.png",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    alternates: {
      canonical: canonicalUrl,
    },

    authors: [
      { name: 'Taher Hathi - Fullstack Developer(Founder)', url: 'https://taherhathi.vercel.app' },
      { name: 'Karansinh Chauhan - Fullstack Developer(Co-founder)', url: 'https://karansinhchauhan.vercel.app' },
    ],

    openGraph: {
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Templates - Premium Next.js & Tailwind CSS` ,
      description: `Discover ${totalTemplates} premium ${category} templates for Next.js and Tailwind CSS. Modern, responsive, and ready to use for your next project.`,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: templates[0]?.image || `${siteConfig.url}/template-default.png`,
          width: 1200,
          height: 630,
          alt: `${category} Templates Preview`,
          type: 'image/png',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Templates - Premium Next.js & Tailwind CSS` ,
      description: `Explore ${totalTemplates} premium ${category} templates for Next.js and Tailwind CSS at ${siteConfig.name}.`,
      images: [templates[0]?.image || `${siteConfig.url}/template-default.png`],
      creator: '@nextjsshop',
      site: '@nextjsshop',
    },

    applicationName: siteConfig.name,
    generator: 'Next.js',
  };
};

export const generateComponentCategorySEO = (category: string, components: any[]): Metadata => {
  const canonicalUrl = `${siteConfig.url}/components/category/${category}`;
  const totalComponents = components.length;
  const categories = Array.from(
    new Set(components.flatMap((c: any) => c.categories || []))
  ).join(', ');

  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Components - Premium Tailwind CSS & React | ${siteConfig.name}`,
    description: `Explore ${totalComponents} premium ${category} components for Tailwind CSS and React. Build modern, responsive UIs with our curated ${category} component collection at ${siteConfig.name}.`,
    keywords: `${category} components, Tailwind CSS ${category} components, React ${category} components, premium ${category} components, ${categories}, ${siteConfig.name}, UI components, ${getAllKeywords()}`,

    icons: {
      icon: "/favicon.png",
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon-16x16.png",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    alternates: {
      canonical: canonicalUrl,
    },

    authors: [
      { name: 'Taher Hathi - Fullstack Developer(Founder)', url: 'https://taherhathi.vercel.app' },
      { name: 'Karansinh Chauhan - Fullstack Developer(Co-founder)', url: 'https://karansinhchauhan.vercel.app' },
    ],

    openGraph: {
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Components - Premium Tailwind CSS & React` ,
      description: `Discover ${totalComponents} premium ${category} components for Tailwind CSS and React. Modern, responsive, and ready to use for your next project.`,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: components[0]?.image || `${siteConfig.url}/component-default.png`,
          width: 1200,
          height: 630,
          alt: `${category} Components Preview`,
          type: 'image/png',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Components - Premium Tailwind CSS & React` ,
      description: `Explore ${totalComponents} premium ${category} components for Tailwind CSS and React at ${siteConfig.name}.`,
      images: [components[0]?.image || `${siteConfig.url}/component-default.png`],
      creator: '@nextjsshop',
      site: '@nextjsshop',
    },

    applicationName: siteConfig.name,
    generator: 'Next.js',
  };
};