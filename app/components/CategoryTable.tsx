import { Category } from '../lib/definitions';
import ThemeCard from './ThemeCard';

export default function CategoryView({ category }: { category: Category }) {
  return (
    <div className="w-full text-4xl ">
      <h1>{category.name}</h1>
      <hr />
      <div className="flex gap-4 mt-4">
        {category.themes.map((theme) => (
          <ThemeCard key={theme.name} theme={theme} />
        ))}
      </div>
    </div>
  );
}
