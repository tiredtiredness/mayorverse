import { useEffect } from 'react';

export function useClickOutside(ref, onClick) {
  useEffect(() => {
    const handler = event => {
      console.log('1');
      if (ref.current && !ref.current.contains(event.target)) {
        onClick();
      }
    };

    window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, [ref, onClick]);
}
