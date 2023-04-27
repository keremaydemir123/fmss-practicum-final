import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useStarships } from '../context/StarshipContext';
import SearchIcon from '../icons/SearchIcon';
import { Starship } from '../types';

function SearchInput() {
  const [inputVal, setInputVal] = useState('');
  const [focused, setFocused] = useState(false);
  const [searchIndex, setSearchIndex] = useState(0);

  const searchResultsDiv = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { starships } = useStarships();
  const arrowUpPressed = useKeyDown('ArrowUp');
  const arrowDownPressed = useKeyDown('ArrowDown');

  const LINK_HEIGHT = 46;
  const LINK_MARGIN = 6;

  const filteredStarships: Starship[] = useMemo(
    () =>
      starships.filter((starship) => {
        return (
          starship.name.toLowerCase().includes(inputVal.toLowerCase()) ||
          starship.model.toLowerCase().includes(inputVal.toLowerCase())
        );
      }),
    [inputVal, starships]
  );

  useEffect(() => {
    // move with arrow keys
    if (!searchResultsDiv.current) return;

    if (arrowUpPressed) {
      if (searchIndex !== 0) {
        setSearchIndex((prev) => prev - 1);
      }
    }

    if (arrowDownPressed) {
      if (searchIndex !== filteredStarships.length - 1) {
        setSearchIndex((prev) => prev + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrowUpPressed, arrowDownPressed]);

  useEffect(() => {
    // if results are changed, reset the search index to 0
    setSearchIndex(0);
  }, [filteredStarships]);

  useEffect(() => {
    // when moving with arrow keys arrange the scroll position
    const linkHeight = LINK_HEIGHT + LINK_MARGIN;
    const divPosition = searchIndex * linkHeight;
    searchResultsDiv.current?.scrollTo({
      top: divPosition,
      behavior: 'smooth',
    });
  }, [searchIndex]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // if the user clicks on the search results, don't blur
    if (!e.relatedTarget?.classList.contains('search-results__link')) {
      setFocused(false);
    } else searchInputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/starship/${filteredStarships[searchIndex].id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="search-input">
      <div className="w-full flex items-center rounded-md">
        <input
          type="text"
          ref={searchInputRef}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="search-input__input"
          placeholder="Search for a starship..."
          onFocus={() => setFocused(true)}
          onBlur={(e) => handleBlur(e)}
        />
        <SearchIcon className="w-6 h-6 ml-2" />
      </div>
      {focused && inputVal && filteredStarships.length > 0 && (
        <div tabIndex={0} className="search-results">
          <div className="overflow-y-auto pr-2" ref={searchResultsDiv}>
            {filteredStarships.map((starship, index) => {
              return (
                <Link
                  to={`/starship/${starship.id}`}
                  key={starship.id}
                  style={{
                    height: LINK_HEIGHT,
                    marginBottom: LINK_MARGIN,
                    marginTop: LINK_MARGIN,
                  }}
                  className={`${
                    searchIndex === index ? 'bg-base-200' : ''
                  } search-results__link`}
                >
                  <span className="font-semibold text-base text-base-content/90">
                    {starship.name}
                  </span>{' '}
                  <span className="text-sm text-base-content/60">
                    {starship.model}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </form>
  );
}

export default SearchInput;

const useKeyDown = (targetKey: 'ArrowUp' | 'ArrowDown') => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    // If pressed key is our target key then set to true
    // on release set to false
    const downHandler = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        e.preventDefault();
        setKeyPressed(true);
      }
    };

    const upHandler = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        e.preventDefault();
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};
