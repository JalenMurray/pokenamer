export default function SelectPokemonSearchHelpModal() {
  return (
    <dialog id={`select_pokemon_help_modal`} className="modal">
      <div className="modal-box min-w-[30vw] h-[30vh]">
        <h3 className="font-bold text-lg py-8">Select Pokemon Search Tips</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Search Games</h1>
            <p className="text-sm">
              You can search pokemon that are in a games regional dex. Games until Scarlet + Violet
              are supported. Regional Forms like alolan are not supported
            </p>
            <p className="text-sm">If you search multiple games only the first will count</p>
            <p>Examples:</p>
            <i>game:heartgold</i>
            <i>game:letsgopikachu</i>
            <i>game:emerald</i>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Search Types</h1>
            <p className="text-sm">You can search pokemon that have a specific type.</p>
            <p className="text-sm">
              If you search multiple types it will show pokemon that include one or the other, not
              both types
            </p>
            <p>Examples:</p>
            <i>type:water</i>
            <i>type:ghost</i>
            <i>type:fire</i>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <h1 className="text-2xl">Compound searches</h1>
          <p className="text-sm">You can compound multiple searches using a space.</p>
          <p className="text-sm">
            Only the first game will be used, but any number of types or names/ids can be added.
          </p>
          <p>Examples</p>
          <p>
            Every Water or Fire Type in Emerald:{' '}
            <i className="ml-2">game:emerald type:water type:fire</i>
          </p>
          <p>
            Every Water or Ghost Type in X with &apos;ba&apos; in it&apos;s name:{' '}
            <i className="ml-2">game:x type:water type:ghost ba</i>
          </p>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
