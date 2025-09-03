import { getComponents, getTemplates } from "@/lib/api";
import { getBlogPosts } from "@/utils/mdx";
import { siteConfig } from "@/config/site";

const staticItems = [
  { name: "Accordion", href: "/components/free/accordion" },
  { name: "Alert", href: "/components/free/alert" },
  { name: "Avatar", href: "/components/free/avatar" },
  { name: "Auth Card", href: "/components/free/auth-card" },
  { name: "Banner", href: "/components/free/banner" },
  { name: "Breadcrumb", href: "/components/free/breadcrumb" },
  { name: "Button", href: "/components/free/button" },
  { name: "Date Picker", href: "/components/free/datepicker" },
  { name: "Components", href: "/components" },
  { name: "Templates", href: "/templates" },
  { name: "About", href: "/about" },
  { name: "Brand", href: "/brand" },
  { name: "Docs", href: "/docs" },
  { name: "Changelog", href: "/resources/changelog" },
  { name: "Blog", href: "/resources/blog" },
  { name: "Faqs", href: "/resources/faqs" },
  { name: "Support", href: "/contact/support" },
  { name: "Contact", href: "/contact"},
  { name: "Privacy Policy", href: "/legal/privacy" },
  { name: "Terms of Service", href: "/legal/terms" },
  { name: "Security", href: "/legal/security" },
  { name: "404", href: "/404" },
];

export async function GET() {
  const components = await getComponents();
  const templates = await getTemplates();
  const blogPosts = await getBlogPosts();

  const allCategories = components.flatMap((component: { categories: string[] }) => component.categories || []);
  const categories: string[] = [];
  allCategories.forEach((category: string) => {
    if (category && !categories.includes(category)) {
      categories.push(category);
    }
  });

  const allTemplatesCategories = templates.flatMap((template: { categories: string[] }) => template.categories || []);
  const templateCategories: string[] = [];
  allTemplatesCategories.forEach((category: string) => {
    if (category && !templateCategories.includes(category)) {
      templateCategories.push(category);
    }
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Home Page -->
    <url>
      <loc>${siteConfig.url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>

    <!-- Templates Main Page -->
    <url>
      <loc>${siteConfig.url}/templates</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>

    <!-- Individual Templates -->
    ${templates.map((template: { name: string; updatedAt: string }) => `
      <url>
        <loc>${siteConfig.url}/templates/${template.name.toLowerCase().replace(/\s+/g, "-")}</loc>
        <lastmod>${new Date(template.updatedAt).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `).join("")}

    <!-- Components Main Page -->
    <url>
      <loc>${siteConfig.url}/components</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>

    <!-- Individual Components -->
    ${components.map((component: { name: string; updatedAt: string }) => `
      <url>
        <loc>${siteConfig.url}/components/${component.name.toLowerCase().replace(/\s+/g, "-")}</loc>
        <lastmod>${new Date(component.updatedAt).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `).join("")}

    <!-- Category Pages -->
    ${categories.map((category: string) => `
      <url>
        <loc>${siteConfig.url}/components/${category.toLowerCase().replace(/\s+/g, "-")}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
    `).join("")}

    <!-- Templates Category Pages -->
     ${templateCategories.map((category: string) => `
      <url>
        <loc>${siteConfig.url}/templates/${category.toLowerCase().replace(/\s+/g, "-")}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>
    `).join("")}

    <!-- Blog Main Page -->
    <url>
      <loc>${siteConfig.url}/resources/blog</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>

    <!-- Individual Blog Posts -->
    ${blogPosts.map((post: { slug: string; date: string }) => `
      <url>
        <loc>${siteConfig.url}/resources/blog/${post.slug}</loc>
        <lastmod>${new Date(post.date).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `).join("")}

    <!-- Static Component Pages -->
    ${staticItems.map((item) => `
      <url>
        <loc>${siteConfig.url}${item.href}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `).join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}