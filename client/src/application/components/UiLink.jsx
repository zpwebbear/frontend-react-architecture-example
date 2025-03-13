import { Link } from "wouter"

export const UiLink = ({ children, href, className }) => {
  return (
    <Link
      href={href}
      className={(active) => (active ? "*:text-yellow-500!" : "") + " " + className}
    >
      {children}
    </Link>
  );
}