import { Trash2, BadgeDollarSign } from 'lucide-react';
import { 
  RiUserSmileLine, 
  RiHeartLine, 
  RiStarSFill, 
} from 'react-icons/ri';
import { TrustBadge, StatCard } from '../types/hero';

export const trustBadges: TrustBadge[] = [
  { icon: RiUserSmileLine, text: '10,000+ Happy Rescuers' },
  { icon: RiHeartLine, text: '200+ Partner Stores' },
  { icon: RiStarSFill, text: '4.9 Rating' },
];

export const statCards: StatCard[] = [
  { icon: Trash2, label: 'Food Waste Saved', numericValue: 50000, suffix: '+', sub: 'Meals rescued from landfill', rotation: '4deg', color: '#F28F3B' },
  { label: 'CO₂ Prevented', numericValue: 125000, suffix: 'kg', sub: 'Carbon emissions prevented', rotation: '-3deg', color: '#10B981' }, 
  { icon: BadgeDollarSign, label: 'Partner Revenue', numericValue: 150, suffix: 'M+', sub: 'Rupiah extra income generated', rotation: '2deg', color: '#F28F3B' }, 
];

export const liveActivities = [
  "🍕 @sara_h rescued 2 pizzas from Luigi's",
  "🥐 @dimas99 saved 5 croissants!",
  "🥗 @ana_zero reduced 1.2kg CO₂ emissions",
  "💰 @kopi_senja gained 50k IDR today",
];
