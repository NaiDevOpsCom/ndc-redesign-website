import { Globe, Linkedin, Instagram, Phone, Mail, Youtube, Facebook } from "lucide-react";
import React from "react";

interface SocialIconLinkProps {
  network: string;
  value: string;
  variant?: "circular" | "simple";
}

const SocialIconLink = ({ network, value, variant = "circular" }: SocialIconLinkProps) => {
  if (!value || typeof value !== "string") return null;

  let href = value;
  if (network === "phone") href = `tel:${value}`;
  else if (network === "email") href = `mailto:${value}`;

  const isCircular = variant === "circular";

  const commonClass = "h-5 w-5 transition-colors";

  const iconButtonClass = isCircular
    ? "w-12 h-12 rounded-full bg-primary hover:bg-white transition-all flex items-center justify-center group shadow-lg text-white hover:text-primary"
    : "text-foreground hover:text-primary transition-colors";

  let iconElement = <Globe className={commonClass} />;

  if (network === "phone") iconElement = <Phone className={commonClass} />;
  else if (network === "email") iconElement = <Mail className={commonClass} />;
  else if (network === "linkedin") iconElement = <Linkedin className={commonClass} />;
  else if (network === "instagram") iconElement = <Instagram className={commonClass} />;
  else if (network === "youtube") iconElement = <Youtube className={commonClass} />;
  else if (network === "facebook") iconElement = <Facebook className={commonClass} />;
  else if (network === "twitter" || network === "x") {
    iconElement = (
      <svg className={commonClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.53 2.477h3.924l-8.56 9.85 10.09 13.196h-7.98l-6.25-8.19-7.16 8.19H.07l9.13-10.51L0 2.477h8.13l5.77 7.57zm-1.13 17.03h2.17L7.1 4.36H4.8z" />
      </svg>
    );
  } else if (network === "whatsapp") {
    iconElement = (
      <svg className={commonClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.01L0 24l6.18-1.62A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.24-1.44l-.37-.22-3.67.97.98-3.58-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.99 2.43.01 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" />
      </svg>
    );
  }

  const isExternalWebLink = /^https?:\/\//i.test(href);

  return (
    <a
      href={href}
      target={isExternalWebLink ? "_blank" : undefined}
      rel={isExternalWebLink ? "noopener noreferrer" : undefined}
      aria-label={network}
      className={iconButtonClass}
    >
      {iconElement}
    </a>
  );
};

export default SocialIconLink;
