import {
  faDollarSign,
  faEnvelope,
  faEye,
  faHandshake,
  faLocationDot,
  faPhone,
  faTruck,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
  dollar: faDollarSign,
  envelope: faEnvelope,
  eye: faEye,
  handshake: faHandshake,
  location: faLocationDot,
  phone: faPhone,
  truck: faTruck,
  users: faUsers,
} as const;

export type SiteIconName = keyof typeof icons;

export function SiteIcon({ name, className }: { name: SiteIconName; className?: string }) {
  const [width, height, , , pathData] = icons[name].icon;
  const path = Array.isArray(pathData) ? pathData.join(" ") : pathData;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} fill="currentColor" aria-hidden="true" className={className}>
      <path d={path} />
    </svg>
  );
}
