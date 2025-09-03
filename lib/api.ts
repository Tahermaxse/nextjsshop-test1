function getBaseUrl() {
  // During build/SSR
  if (typeof window === "undefined") {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    if (baseUrl.includes("localhost")) {
      return "http://localhost:3000"; // Return full URL instead of empty string
    }
    return baseUrl;
  }
  // Client-side
  return "";
}

export async function getTemplates(query: string = "", skip: number = 0) {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/templates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        search: query,
        skip: skip,
        take: 12
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text(); // First get the raw text
      try {
        const errorData = JSON.parse(errorText);
        console.error('Error fetching templates:', errorData);
        throw new Error(errorData.error || 'Failed to fetch templates');
      } catch (parseError) {
        console.error('Error parsing error response:', errorText);
        throw new Error('Failed to fetch templates: Invalid response format');
      }
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing response:', text);
      throw new Error('Invalid JSON response from server');
    }
  } catch (error) {
    console.error("Error in getTemplates:", error);
    throw error;
  }
}

export async function getTemplateByName(name: string) {
  if (!name) {
    throw new Error("Template name is required");
  }

  const baseUrl = getBaseUrl();
  const encodedName = encodeURIComponent(name);
  const url = `${baseUrl}/api/templates/${encodedName}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      try {
        const errorData = JSON.parse(errorText);
        console.error('Error fetching template by name:', errorData);
        throw new Error(errorData.error || 'Failed to fetch template');
      } catch (parseError) {
        console.error('Error parsing error response:', errorText);
        throw new Error('Failed to fetch template: Template not found');
      }
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing response:', text);
      throw new Error('Invalid JSON response from server');
    }
  } catch (error) {
    console.error("Error in getTemplateByName:", error);
    throw error;
  }
}

export async function getComponents(query: string = "", skip: number = 0) {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/components`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        search: query,
        skip: skip,
        take: 12
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text(); // First get the raw text
      try {
        const errorData = JSON.parse(errorText);
        console.error('Error fetching Components:', errorData);
        throw new Error(errorData.error || 'Failed to fetch Components');
      } catch (parseError) {
        console.error('Error parsing error response:', errorText);
        throw new Error('Failed to fetch Components: Invalid response format');
      }
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing response:', text);
      throw new Error('Invalid JSON response from server');
    }
  } catch (error) {
    console.error("Error in getComponents:", error);
    throw error;
  }
}

export async function getComponentByName(name: string) {
  if (!name) {
    throw new Error("Name is required");
  }

  const baseUrl = getBaseUrl();
  const encodedName = encodeURIComponent(name);
  const url = `${baseUrl}/api/components/${encodedName}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      try {
        const errorData = JSON.parse(errorText);
        console.error('Error fetching component by name:', errorData);
        throw new Error(errorData.error || 'Failed to fetch component');
      } catch (parseError) {
        console.error('Error parsing error response:', errorText);
        throw new Error('Failed to fetch component: Component not found');
      }
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing response:', text);
      throw new Error('Invalid JSON response from server');
    }
  } catch (error) {
    console.error("Error in getComponentByName:", error);
    throw error;
  }
}

export async function getRecentTemplates() {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/recenttemplates`, {
      cache: "no-store",
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const errorText = await res.text(); // First get the raw text
      try {
        const errorData = JSON.parse(errorText);
        console.error('Error fetching Recent templates:', errorData);
        throw new Error(errorData.error || 'Failed to fetch Recent templates');
      } catch (parseError) {
        console.error('Error parsing error response:', errorText);
        throw new Error('Failed to fetch Recent templates: Invalid response format');
      }
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing response:', text);
      throw new Error('Invalid JSON response from server');
    }
  } catch (error) {
    console.error("Error in getRecentTemplates:", error);
    throw error;
  }
}

export async function getRecentComponents() {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/recentcomponents`, {
      cache: "no-store",
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const errorText = await res.text(); // First get the raw text
      try {
        const errorData = JSON.parse(errorText);
        console.error('Error fetching Recent components:', errorData);
        throw new Error(errorData.error || 'Failed to fetch Recent components');
      } catch (parseError) {
        console.error('Error parsing error response:', errorText);
        throw new Error('Failed to fetch Recent components: Invalid response format');
      }
    }

    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Error parsing response:', text);
      throw new Error('Invalid JSON response from server');
    }
  } catch (error) {
    console.error("Error in getRecentComponents:", error);
    throw error;
  }
}

export async function getTemplatesByCategory(category: string, skip: number = 0) {
  if (!category) {
    throw new Error("Category is required");
  }

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/templates/category`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        category: category.toLowerCase(),
        skip,
        take: 12,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();

      if (!errorText) {
        throw new Error(`Failed to fetch templates: ${res.status} ${res.statusText} (Empty response)`);
      }
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || `Failed to fetch templates: ${res.status} ${res.statusText}`);
      } catch (parseError) {
        throw new Error(`Failed to fetch templates: ${res.status} ${res.statusText} (Non-JSON response)`);
      }
    }

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return data;
    } catch (parseError) {
      throw new Error("Invalid JSON response from server");
    }
  } catch (error) {
    console.error("Error in getTemplatesByCategory:", error);
    throw error;
  }
}

export async function getComponentsByCategory(category: string, skip: number = 0) {
  if (!category) {
    throw new Error("Category is required");
  }

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/components/category`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        category: category.toLowerCase(),
        skip,
        take: 12,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();

      if (!errorText) {
        throw new Error(`Failed to fetch components: ${res.status} ${res.statusText} (Empty response)`);
      }
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || `Failed to fetch components: ${res.status} ${res.statusText}`);
      } catch (parseError) {
        throw new Error(`Failed to fetch components: ${res.status} ${res.statusText} (Non-JSON response)`);
      }
    }

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return data;
    } catch (parseError) {
      throw new Error("Invalid JSON response from server");
    }
  } catch (error) {
    console.error("Error in getComponentsByCategory:", error);
    throw error;
  }
}