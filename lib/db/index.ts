import prisma from "@/lib/prisma";
import { Template, Components } from "@/lib/types";

export async function getUserPurchases(userId: number, page: number = 1, limit: number = 4) {
  try {
    // Calculate offset for pagination
    const offset = (page - 1) * limit;
    
    // Use Promise.all to run queries in parallel
    const [templatePurchases, componentPurchases, totalTemplates, totalComponents] = await Promise.all([
      // Fetch template purchases with pagination
      prisma.templatePurchase.findMany({
        where: {
          userId: userId,
        },
        include: {
          template: {
            select: {
              id: true,
              name: true,
              image: true,
              price: true,
              author: true,
              description: true,
              urlname: true,
            },
          },
        },
        orderBy: {
          purchaseDate: 'desc',
        },
        skip: offset,
        take: limit,
      }),
      
      // Fetch component purchases with pagination
      prisma.componentPurchase.findMany({
        where: {
          userId: userId,
        },
        include: {
          component: {
            select: {
              id: true,
              name: true,
              image: true,
              price: true,
              author: true,
              description: true,
            },
          },
        },
        orderBy: {
          purchaseDate: 'desc',
        },
        skip: offset,
        take: limit,
      }),
      
      // Get total counts for pagination
      prisma.templatePurchase.count({
        where: { userId: userId }
      }),
      
      prisma.componentPurchase.count({
        where: { userId: userId }
      })
    ]);

    // Transform the data to include purchase dates and IDs
    const templates = templatePurchases.map((purchase) => ({
      ...purchase.template,
      purchaseDate: purchase.purchaseDate,
      purchaseId: purchase.id,
      type: 'template' as const,
    }));

    const components = componentPurchases.map((purchase) => ({
      ...purchase.component,
      purchaseDate: purchase.purchaseDate,
      purchaseId: purchase.id,
      type: 'component' as const,
    }));

    // Calculate if there are more items to load
    const hasMoreTemplates = totalTemplates > offset + templates.length;
    const hasMoreComponents = totalComponents > offset + components.length;

    return {
      templates: templates,
      components: components,
      hasMore: hasMoreTemplates || hasMoreComponents,
    };
  } catch (error) {
    console.error("Error in getUserPurchases:", error);
    throw new Error("Failed to fetch user purchases");
  }
}

export async function checkUserPurchase(userId: number, itemId: string, type: 'template' | 'component') {
  try {
    if (type === 'template') {
      const purchase = await prisma.templatePurchase.findUnique({
        where: {
          userId_templateId: {
            userId: userId,
            templateId: itemId,
          },
        },
      });
      return !!purchase;
    } else {
      const purchase = await prisma.componentPurchase.findUnique({
        where: {
          userId_componentId: {
            userId: userId,
            componentId: itemId,
          },
        },
      });
      return !!purchase;
    }
  } catch (error) {
    console.error("Error in checkUserPurchase:", error);
    throw new Error("Failed to check user purchase");
  }
}


