'use client';
import { useState, useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import { Location } from '../types/navbar';
import { locations } from '../constants/navbar';

export const useNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribeScroll = scrollY.on("change", (latest) => setIsScrolled(latest > 50));
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      unsubscribeScroll();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scrollY]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileOpen]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return {
    isScrolled,
    isMobileOpen,
    setIsMobileOpen,
    isSearchOpen,
    setIsSearchOpen,
    activeDropdown,
    handleDropdownEnter,
    handleDropdownLeave,
    selectedLocation,
    setSelectedLocation,
    searchQuery,
    setSearchQuery,
    searchInputRef
  };
};
