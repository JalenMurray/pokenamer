import { useState } from 'react';
import { getSpriteURL } from '../pokemon_data/queries';

export default function PokemonGif({ name }: { name: string }) {
  const [src, setSrc] = useState(getSpriteURL(name));
  const fallbackSrc = 'https://play.pokemonshowdown.com/sprites/substitutes/gen5/substitute.png';

  function handleError() {
    setSrc(fallbackSrc);
  }

  return <img src={src} alt={name.charAt(0).toUpperCase() + name.slice(1)} onError={handleError} />;
}
