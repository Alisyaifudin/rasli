import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children?: React.ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const [portal, setPortal] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    setMounted(true);
    const portal = document.querySelector('#myportal') as HTMLDivElement;
    if (portal) setPortal(portal);
    return () => setMounted(false);
  }, []);

  return mounted && portal ? createPortal(children, portal) : null;
};

export default Portal;
