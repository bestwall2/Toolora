import type { Tool } from '@/data/tools';

export interface SearchResult {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
}

export function searchTools(tools: Tool[], query: string): SearchResult[] {
  if (!query || query.trim().length === 0) return [];

  const q = query.toLowerCase().trim();

  return tools
    .filter((tool) => {
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q))
      );
    })
    .slice(0, 12)
    .map((tool) => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      category: tool.category,
    }));
}