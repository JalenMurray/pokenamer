import { categories } from '@/data';
import Navbar from '../ui/Navbar';
import { cookiesClient } from '../utils/amplify-utils';
import Category from '../ui/Category';

async function getCategories() {
  const { data, errors } = await cookiesClient.models.Category.list();

  // for (let i = 0; i < data.length; i++) {
  //   const { data: themes } = await data[i].themes();
  //   const categoryId = data[i].id;

  //   const categoryThemes = categories.filter((elem) => elem.name === data[i].name)[0].themes;

  // for (let j = 0; j < themes.length; j++) {
  //   const { data: names } = await themes[j].names();
  //   const themeId = themes[j].id;

  //   if (names.length === 0) {
  //     const themeNames = categoryThemes.filter(
  //       (elem) => elem.identifier === themes[j].identifier
  //     )[0].names;

  //     for (let k = 0; k < themeNames.length; k++) {
  //       const name = themeNames[k];

  //       const { data: newName, errors } = await cookiesClient.models.Name.create({
  //         name,
  //         themeId,
  //       });
  //       console.log('Created new Name', newName);
  //     }
  //   }
  // }
  // }

  // const categoryList = Object.values(categories);

  // if (data.length === 0) {
  //   for (let i = 0; i < categoryList.length; i++) {
  //     const category = categoryList[i];

  //     const themes = category.themes;
  //     for (let j = 0; j < themes.length; j++) {
  //       const theme = themes[j];
  //       console.log('Attempting to create theme', theme.name);
  //     }
  //   }
  // }

  if (!errors) {
    return data;
  } else {
    console.log(errors);
  }
}

export default async function Page() {
  const categories = await getCategories();

  const sortedCategories = categories?.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen w-full flex-col gap-12 p-24">
        <h1 className="text-4xl">Categories</h1>
        <div className="grid grid-cols-2 gap-8">
          {sortedCategories?.map((category) => {
            return <Category category={category} key={category.id} />;
          })}
        </div>
      </main>
    </>
  );
}
