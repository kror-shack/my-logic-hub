import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * This component ensures that the page starts at the top when the route changes.
 *
 * @returns null
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
