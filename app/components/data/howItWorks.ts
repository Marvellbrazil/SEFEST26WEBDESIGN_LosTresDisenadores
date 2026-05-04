'use client';

export type StepIcon = 'smartphone' | 'shoppingBag' | 'clock' | 'barChart3' | 'package' | 'bell' | 'trendingUp' | 'building2';

export interface Step {
  id: string;
  title: string;
  desc: string;
  img: string;
  icon: StepIcon;
  stat: string;
  statLabel: string;
}

export const consumerSteps: Step[] = [
  { 
    id: "01", 
    title: "Discover Surplus", 
    desc: "Browse nearby restaurants, cafes, and bakeries with surplus food at 50-70% off regular prices.",
    img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800",
    icon: "smartphone",
    stat: "50-70%",
    statLabel: "Discount"
  },
  { 
    id: "02", 
    title: "Reserve Your Meal", 
    desc: "Secure your meal with one tap. Pay securely and get instant confirmation for pickup.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800",
    icon: "shoppingBag",
    stat: "Instant",
    statLabel: "Confirmation"
  },
  { 
    id: "03", 
    title: "Pickup & Enjoy", 
    desc: "Collect your rescued meal at the scheduled time. Show your digital receipt and enjoy!",
    img: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=800",
    icon: "clock",
    stat: "Zero",
    statLabel: "Contact"
  },
  { 
    id: "04", 
    title: "Track Your Impact", 
    desc: "See your environmental impact: CO₂ saved, water preserved, and meals rescued.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    icon: "barChart3",
    stat: "Real-time",
    statLabel: "Tracking"
  }
];

export const businessSteps: Step[] = [
  { 
    id: "01", 
    title: "Register Your Store", 
    desc: "Sign up your restaurant, cafe, or bakery in minutes. No complicated setup required.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800",
    icon: "building2",
    stat: "Free",
    statLabel: "Registration"
  },
  { 
    id: "02", 
    title: "List Surplus Food", 
    desc: "Easily post your end-of-day surplus with photos, prices, and pickup windows.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800",
    icon: "package",
    stat: "50-70%",
    statLabel: "Discount Range"
  },
  { 
    id: "03", 
    title: "Manage Orders", 
    desc: "Receive instant notifications when customers reserve your surplus food.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800",
    icon: "bell",
    stat: "Real-time",
    statLabel: "Notifications"
  },
  { 
    id: "04", 
    title: "Track Business Impact", 
    desc: "See how much waste you've prevented and CO₂ emissions you've saved.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    icon: "trendingUp",
    stat: "Analytics",
    statLabel: "Dashboard"
  }
];