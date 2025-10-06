import { client } from '@/lib/sanity';
import Link from 'next/link';

async function getCategories(): Promise<Array<{
  _id: string;
  title: string;
  slug: { current: string };
}>> {
  const query = `
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
    }
  `;
  const categories = await client.fetch(query);
  return categories;
}

export default async function CategoriesPage() {
  console.log("CategoriesPage is being processed!");
  const categories = await getCategories();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">カテゴリー一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link href={`/categories/${category.slug.current}`} key={category._id} className="block p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <h2 className="text-xl font-semibold">{category.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}