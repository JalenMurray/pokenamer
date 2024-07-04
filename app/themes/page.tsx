import Navbar from '../ui/Navbar';
import { categories } from '../template_data/template_data';
import Category from '../ui/Category';

export default function Page() {
  const sortedCategories = categories.sort((a, b) => a.name.localeCompare(b.name));
  const firstHalf = sortedCategories.slice(0, sortedCategories.length / 2);
  const secondHalf = sortedCategories.slice(sortedCategories.length / 2);

  return (
    <>
      <main className="flex min-h-screen w-full flex-col gap-12 p-4 xl:p-24 justify-center items-center">
        <h1 className="text-4xl lg:text-7xl">Categories</h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-8">
          <div className="flex flex-col gap-4 xl:gap-8">
            {firstHalf.map((category) => {
              return <Category category={category} key={category.name} />;
            })}
          </div>
          <div className="flex flex-col gap-4 xl:gap-8">
            {secondHalf.map((category) => {
              return <Category category={category} key={category.name} />;
            })}
          </div>
        </div>
      </main>
    </>
  );
}
