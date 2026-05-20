import { IconType } from 'react-icons';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinks {
  [category: string]: FooterLink[];
}

export interface SocialLink {
  icon: IconType;
  label: string;
  href: string;
}
