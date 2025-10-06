import { client } from '@/lib/sanity';
import Link from 'next/link';

// Simple slugify function for Japanese titles
function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

async function getAllCategories(): Promise<Array<{ _id: string, title: string }>> {
  const query = `
    *[_type == "category"]{
      _id,
      title
    }
  `;
  const categories = await client.fetch(query);
  return categories;
}

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">カテゴリー一覧</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${slugify(category.title)}`}
            className="bg-blue-100 text-blue-800 text-lg font-medium px-4 py-2 rounded-full hover:bg-blue-200 transition-colors"
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
