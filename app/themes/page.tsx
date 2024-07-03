import Navbar from '../ui/Navbar';
import { categories } from '../template_data/template_data';
import Category from '../ui/Category';

export default function Page() {
  const sortedCategories = categories.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <main className="flex min-h-screen w-full flex-col gap-12 p-12 xl:p-24">
        <h1 className="text-7xl">Categories</h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-8">
          {sortedCategories?.map((category) => {
            return <Category category={category} key={category.name} />;
          })}
        </div>
      </main>
    </>
  );
}
