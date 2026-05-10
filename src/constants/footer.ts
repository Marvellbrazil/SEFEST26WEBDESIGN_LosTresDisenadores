import { FaInstagram, FaTwitter, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FooterLinks, SocialLink } from '../types/footer';

export const footerLinks: FooterLinks = {
  Platform: [
    { label: 'Browse Bags', href: '#' },
    { label: 'How It Works', href: '#' },
    { label: 'Impact Tracker', href: '#' },
    { label: 'Download App', href: '#' },
    { label: 'Gift Cards', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Our Mission', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press Kit', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'FAQs', href: '#' },
    { label: 'Report Issue', href: '#' },
    { label: 'Partner Support', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Data Rights', href: '#' },
  ],
};

export const socials: SocialLink[] = [
  { icon: FaInstagram, label: 'Instagram', href: '#' },
  { icon: FaTwitter, label: 'Twitter', href: '#' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: '#' },
  { icon: FaTiktok, label: 'TikTok', href: '#' },
  { icon: FaYoutube, label: 'YouTube', href: '#' },
];
