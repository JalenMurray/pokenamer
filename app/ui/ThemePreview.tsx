import { themes } from '@/data';
import { ThemeTemplate } from '../lib/definitions';
import { getRandomItems } from '../utils/utils';
import Link from 'next/link';
import { cookiesClient } from '../utils/amplify-utils';
import { CfnNetworkPerformanceMetricSubscription } from 'aws-cdk-lib/aws-ec2';

async function getNames(theme: ThemeTemplate) {
  if (theme.identifier === 'emotions') {
    console.log(theme.id);
    const { data: currNames } = await theme.names();

    const currNamesSet = new Set(currNames.map((obj) => obj.name));
    const correctNames = themes[theme.identifier].names;
    console.log('Processing Emotion Theme');
    console.log('Current Names', currNames.length);
    console.log('Correct Names', correctNames.length);
    const missingNames = correctNames.filter((name) => !currNamesSet.has(name));
    console.log('Missing Names', missingNames);
    const addNames = missingNames.map((elem) => {
      const toAdd = { name: elem, themeId: theme.id };
      return cookiesClient.models.Name.create(toAdd)
        .then(({ data: newName, errors }) => {
          errors
            ? console.error(errors)
            : console.log('Successfully Created New Name', newName?.id, newName?.name);
        })
        .catch((err) => console.error('Error creating name', err));
    });

    await Promise.all(addNames);
    // if (currNames.length !== correctNames.length) {
    //   for (let i = 0; i < correctNames.length + 1; i++) {
    //     if (currNames.filter((name) => name.name === correctNames[i]).length === 0) {
    //       const { data: newName, errors } = await cookiesClient.models.Name.create({
    //         name: correctNames[i],
    //         themeId: theme.id,
    //       });
    //       if (errors) {
    //         console.error('Error adding the name', correctNames[i], errors);
    //       } else {
    //         console.log('New Name Added', newName);
    //       }
    //     }
    //   }
    // }
  } else {
    return [];
  }
}

export default async function ThemePreview({ theme }: { theme: ThemeTemplate }) {
  const names = await getNames(theme);

  return (
    <Link
      href={`/theme/${theme.identifier}`}
      className="w-96 text-lg rounded-2xl border-2 cursor-pointer border-white flex flex-col p-4 text-center"
    >
      <h1 className="text-2xl">{theme.name}</h1>
      <hr />
      <div className="grid grid-cols-3 gap-2 text-center justify-center items-center">
        <p>test</p>
      </div>
    </Link>
  );
}
