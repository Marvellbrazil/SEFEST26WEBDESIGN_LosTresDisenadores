import { NavLink, Location } from '../types/navbar';

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/', hasDropdown: false },
  { 
    label: 'Explore', 
    href: '/explore',
    hasDropdown: true,
    dropdownItems: [
      { label: 'Browse Bags', href: '/browse', icon: '🛍️', desc: 'Find surplus food near you' },
      { label: 'Categories', href: '/categories', icon: '🍕', desc: 'Browse by food type' },
      { label: 'Top Rated', href: '/top-rated', icon: '⭐', desc: 'Best reviewed stores' },
      { label: 'New Arrivals', href: '/new', icon: '🆕', desc: 'Recently added stores' },
    ]
  },
  { label: 'Impact', href: '/impact', hasDropdown: false },
  { label: 'Partnership', href: '/partnership', hasDropdown: false },
  { label: 'About', href: '/about', hasDropdown: false },
];

export const locations: Location[] = [
  { name: 'Surabaya', code: 'SBY' },
  { name: 'Jakarta', code: 'JKT' },
  { name: 'Bandung', code: 'BDG' },
];
