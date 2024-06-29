import { Category as CategoryType } from '../lib/definitions';
import ThemePreview from './ThemePreview';

export default async function Category({ category }: { category: CategoryType }) {
  const { data: themes } = await category.themes();

  return (
    <div className="w-full text-4xl ">
      <h1>{category.name}</h1>
      <hr />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {themes.map((theme) => (
          <ThemePreview theme={theme} key={theme.id} />
        ))}
      </div>
    </div>
  );
}
