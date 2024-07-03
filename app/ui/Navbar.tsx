import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 gap-4">
        <Link href={'/themes'} className="btn btn-ghost text-3xl font-title h-20">
          PokeNamer
        </Link>
        <Link href={'/games'} className="btn btn-ghost text-xl h-16">
          Games
        </Link>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle h-20 w-20 items-center justify-center"
          >
            <div className="flex justify-center items-center">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://play.pokemonshowdown.com/sprites/xyani/mudkip.gif"
                className="h-full"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
