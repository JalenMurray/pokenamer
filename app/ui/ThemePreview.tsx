import Link from 'next/link';
import { Theme } from '../template_data/definitions';
import { getPreviewNames } from '../template_data/queries';

export default function ThemePreview({ theme, bgColor }: { theme: Theme; bgColor: string }) {
  return (
    <Link
      href={`/theme/${theme.identifier}`}
      className="w-5/6 mx-auto text-lg rounded-3xl border-4 cursor-pointer border-neutral-content flex flex-col p-4 text-center"
    >
      <h1 className="text-2xl">{theme.name}</h1>
      <hr />
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 min-[2200px]:grid-cols-4 gap-2 text-center justify-center items-center my-2">
        {getPreviewNames(theme.identifier).map((name, i) => (
          <p key={i} className="text-sm md:text-base">
            {name}
          </p>
        ))}
      </div>
    </Link>
  );
}
