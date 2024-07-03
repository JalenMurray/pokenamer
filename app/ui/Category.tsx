import { Category as CategoryType } from '../template_data/definitions';
import ThemePreview from './ThemePreview';

export default async function Category({ category }: { category: CategoryType }) {
  return (
    <div
      className={`w-full text-4xl rounded-2xl p-8`}
      style={{
        backgroundColor: `${category.bgColor}`,
        border: `${category.bgColor} 2`,
      }}
    >
      <div
        className={`rounded-2xl border-2 h-full p-4 bg-base-100 justify-center items-center text-center`}
        style={{
          border: `${category.bgColor} 2`,
        }}
      >
        <h1 className="p-4 text-3xl lg:text-6xl bg-base-100 border-2 border-neutral-content rounded-xl">
          {category.name}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {category.themes.map((theme) => (
            <ThemePreview theme={theme} key={theme.identifier} bgColor={category.bgColor} />
          ))}
        </div>
      </div>
    </div>
  );
}
