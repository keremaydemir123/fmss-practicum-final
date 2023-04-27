import { useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import SearchInput from './SearchInput';
import BackIcon from '../icons/BackIcon';

function Navbar() {
  const { id } = useParams();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    // on scroll add background color to navbar
    const onWindowScroll = () => {
      const nav = navRef.current;
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        nav?.classList.add('navbar--scrolled');
      } else {
        nav?.classList.remove('navbar--scrolled');
      }
    };

    window.addEventListener('scroll', onWindowScroll);

    return () => {
      window.removeEventListener('scroll', onWindowScroll);
    };
  }, []);

  return (
    <nav ref={navRef} className="navbar">
      <div
        className={`${
          !id ? 'grid grid-cols-1' : 'flex justify-between'
        } container w-full gap-3 lg:grid-cols-2`}
      >
        {id ? (
          <Link to={'/'} className="btn w-max btn-primary hover:scale-105">
            <BackIcon className="w-5 h-5" />
          </Link>
        ) : (
          <Link to="/" className="brand text-center lg:text-start">
            Starships
          </Link>
        )}
        <SearchInput />
      </div>
    </nav>
  );
}

export default Navbar;
