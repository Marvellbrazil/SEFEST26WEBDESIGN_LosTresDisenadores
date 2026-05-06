'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, ChevronRight, Star, MapPin, Clock, Leaf
} from 'lucide-react';


const categories = [
  "All", "Bakery", "Restaurant", "Grocery", 
  "Café", "Sushi", "Healthy", "Dessert"
];

const rescuedMeals = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&auto=format&q=80",
    store: "The Bread Factory",
    category: "Bakery",
    rating: 4.9,
    reviews: 1843,
    price: 3.99,
    originalValue: 13,
    distance: "0.2 mi",
    pickupTime: "5:00–6:00 PM",
    badge: "🔥 Popular",
    badgeColor: "bg-[#F28F3B]/10 text-[#F28F3B]",
    discount: 69,
    co2Saved: "93kg",
    waterSaved: "840L",
    landSaved: "37m²",
    totalRescued: 1240,
    tags: ["Bakery"],
    href: "#",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&auto=format&q=80",
    store: "Bella Cucina",
    category: "Restaurant",
    rating: 4.8,
    reviews: 922,
    price: 5.99,
    originalValue: 20,
    distance: "0.5 mi",
    pickupTime: "9:00–10:00 PM",
    badge: "⭐ Top Rated",
    badgeColor: "bg-yellow-50 text-yellow-700",
    discount: 70,
    co2Saved: "142kg",
    waterSaved: "1,260L",
    landSaved: "56m²",
    totalRescued: 856,
    tags: ["Restaurant"],
    href: "#",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&auto=format&q=80",
    store: "Green Grocers",
    category: "Grocery",
    rating: 4.7,
    reviews: 3102,
    price: 4.49,
    originalValue: 15,
    distance: "0.8 mi",
    pickupTime: "6:30–7:30 PM",
    badge: "🌱 Eco Pick",
    badgeColor: "bg-green-50 text-green-700",
    discount: 70,
    co2Saved: "210kg",
    waterSaved: "2,100L",
    landSaved: "89m²",
    totalRescued: 2104,
    tags: ["Grocery"],
    href: "#",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&auto=format&q=80",
    store: "Bloom Coffee",
    category: "Café",
    rating: 4.9,
    reviews: 611,
    price: 3.49,
    originalValue: 11,
    distance: "0.3 mi",
    pickupTime: "4:00–5:00 PM",
    badge: "☕ Fan Fave",
    badgeColor: "bg-amber-50 text-amber-700",
    discount: 68,
    co2Saved: "78kg",
    waterSaved: "690L",
    landSaved: "31m²",
    totalRescued: 892,
    tags: ["Café"],
    href: "#",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop&auto=format&q=80",
    store: "Sakura Sushi",
    category: "Sushi",
    rating: 4.8,
    reviews: 488,
    price: 6.99,
    originalValue: 24,
    distance: "0.9 mi",
    pickupTime: "9:30–10:30 PM",
    badge: "⚡ Limited",
    badgeColor: "bg-red-50 text-red-700",
    discount: 71,
    co2Saved: "56kg",
    waterSaved: "480L",
    landSaved: "22m²",
    totalRescued: 342,
    tags: ["Sushi"],
    href: "#",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop&auto=format&q=80",
    store: "Nourish Bowl Bar",
    category: "Healthy",
    rating: 4.6,
    reviews: 734,
    price: 4.99,
    originalValue: 17,
    distance: "1.1 mi",
    pickupTime: "7:00–8:00 PM",
    badge: "💚 Healthy",
    badgeColor: "bg-emerald-50 text-emerald-700",
    discount: 71,
    co2Saved: "167kg",
    waterSaved: "1,490L",
    landSaved: "63m²",
    totalRescued: 1201,
    tags: ["Healthy"],
    href: "#",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&auto=format&q=80",
    store: "Patisserie Lumière",
    category: "Dessert",
    rating: 5.0,
    reviews: 291,
    price: 4.49,
    originalValue: 16,
    distance: "0.4 mi",
    pickupTime: "6:00–7:00 PM",
    badge: "🆕 New",
    badgeColor: "bg-blue-50 text-blue-700",
    discount: 72,
    co2Saved: "31kg",
    waterSaved: "280L",
    landSaved: "12m²",
    totalRescued: 156,
    tags: ["Dessert", "Bakery"],
    href: "#",
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&auto=format&q=80",
    store: "The Garden Table",
    category: "Restaurant",
    rating: 4.7,
    reviews: 1204,
    price: 5.49,
    originalValue: 18,
    distance: "0.6 mi",
    pickupTime: "8:00–9:00 PM",
    badge: "🌿 Vegan",
    badgeColor: "bg-lime-50 text-lime-700",
    discount: 69,
    co2Saved: "198kg",
    waterSaved: "1,760L",
    landSaved: "74m²",
    totalRescued: 1587,
    tags: ["Restaurant", "Healthy"],
    href: "#",
  },
  {
    id: 9,
    img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop&auto=format&q=80",
    store: "Morning Toast",
    category: "Café",
    rating: 4.8,
    reviews: 567,
    price: 3.99,
    originalValue: 14,
    distance: "0.4 mi",
    pickupTime: "7:00–8:00 AM",
    badge: "🌅 Breakfast",
    badgeColor: "bg-orange-50 text-orange-700",
    discount: 71,
    co2Saved: "67kg",
    waterSaved: "590L",
    landSaved: "28m²",
    totalRescued: 723,
    tags: ["Café"],
    href: "#",
  },
  {
    id: 10,
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop&auto=format&q=80",
    store: "Fresh Poke Bar",
    category: "Healthy",
    rating: 4.7,
    reviews: 445,
    price: 5.99,
    originalValue: 19,
    distance: "0.7 mi",
    pickupTime: "6:00–7:00 PM",
    badge: "🐟 Fresh",
    badgeColor: "bg-cyan-50 text-cyan-700",
    discount: 68,
    co2Saved: "89kg",
    waterSaved: "780L",
    landSaved: "35m²",
    totalRescued: 634,
    tags: ["Healthy"],
    href: "#",
  },
];


function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= Math.round(rating) ? "text-[#F28F3B] fill-[#F28F3B]" : "text-gray-300 fill-gray-300"}
        />
      ))}
    </div>
  );
}


export default function RescuedMeals() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(10);

  const filtered =
    activeCategory === "All"
      ? rescuedMeals
      : rescuedMeals.filter((m) => m.tags.includes(activeCategory));

  const visibleMeals = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className="relative w-full bg-[#F4F3EE] py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F28F3B]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2D2A26]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-10 lg:px-16 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F28F3B]/10 rounded-full mb-4">
            <ShoppingBag size={14} className="text-[#F28F3B]" />
            <span className="text-[#F28F3B] font-black text-[9px] uppercase tracking-[0.2em]">
              Live Marketplace
            </span>
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          </div>

          <h2 className="text-[#2D2A26] text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-[1.1] font-black mb-3">
            Rescue Meals <span className="text-[#F28F3B]">Near You</span>
          </h2>
          <p className="text-[#2D2A26]/40 text-sm sm:text-base max-w-xl mx-auto">
            Freshly listed surplus food from your favorite local stores. Updated every hour.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-2 overflow-x-auto hide-scrollbar pb-3 mb-10 justify-start sm:justify-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(10);
              }}
              whileTap={{ scale: 0.95 }}
              className={`shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#F28F3B] text-white shadow-lg shadow-[#F28F3B]/30"
                  : "bg-white text-[#2D2A26]/50 hover:bg-gray-100 hover:text-[#F28F3B] border border-gray-200"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {visibleMeals.map((meal, idx) => (
              <motion.a
                key={meal.id}
                href={meal.href}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-black/5 transition-all duration-300 flex flex-col"
              >
                <div className="relative overflow-hidden aspect-square sm:aspect-[4/3]">
                  <img
                    src={meal.img}
                    alt={meal.store}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <span className={`absolute top-1.5 left-1.5 text-[7px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${meal.badgeColor} backdrop-blur-sm truncate max-w-[60%]`}>
                    {meal.badge}
                  </span>
                  <span className="absolute top-1.5 right-1.5 bg-[#F28F3B] text-white text-[7px] sm:text-[9px] font-black px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-md">
                    -{meal.discount}%
                  </span>

                  <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center gap-1.5 text-[7px] sm:text-[8px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex items-center gap-0.5">
                      <MapPin size={8} />
                      {meal.distance}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Clock size={8} />
                      {meal.pickupTime}
                    </span>
                  </div>
                </div>

                <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-[#2D2A26] text-[10px] sm:text-xs md:text-sm truncate">
                    {meal.store}
                  </h3>
                  
                  <div className="flex items-center gap-1 mt-0.5 mb-1.5 sm:mb-2">
                    <span className="text-[7px] sm:text-[9px] text-[#2D2A26]/40 uppercase tracking-wider truncate">
                      {meal.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    <StarRating rating={meal.rating} size={9} />
                    <span className="text-[7px] sm:text-[8px] text-[#2D2A26]/40 font-medium">
                      ({meal.reviews})
                    </span>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 mb-2 text-[#2D2A26]/25">
                    <span className="flex items-center gap-0.5 text-[7px] sm:text-[8px]" title={`${meal.co2Saved} CO₂ saved`}>
                      <Leaf size={9} className="text-green-500" />
                      {meal.co2Saved}
                    </span>
                  </div>

                  <div className="flex-1" />

                  <div className="pt-2 sm:pt-3 border-t border-black/5 flex items-center justify-between gap-1">
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm sm:text-base lg:text-lg font-black text-[#F28F3B] leading-none">
                          ${meal.price.toFixed(2)}
                        </span>
                        <span className="text-[7px] sm:text-[9px] text-[#2D2A26]/25 line-through hidden sm:inline">
                          ${meal.originalValue}
                        </span>
                      </div>
                      <span className="text-[7px] sm:text-[8px] text-green-600 font-bold">
                        Save ${(meal.originalValue - meal.price).toFixed(2)}
                      </span>
                    </div>
                    <span className="bg-[#F28F3B] hover:bg-[#2D2A26] text-white text-[7px] sm:text-[9px] font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl transition-all group-hover:shadow-lg group-hover:shadow-[#F28F3B]/20 whitespace-nowrap shrink-0">
                      Rescue
                    </span>
                  </div>
                </div>

                <div className="px-2 sm:px-3 pb-2 sm:pb-3">
                  <p className="text-[7px] sm:text-[8px] text-[#2D2A26]/20 text-center">
                    🛍️ {meal.totalRescued.toLocaleString()}
                  </p>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleMeals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-[#2D2A26]/30 text-lg font-bold">No meals found</p>
            <p className="text-[#2D2A26]/20 text-sm mt-1">Try a different category</p>
          </motion.div>
        )}

        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-center mt-10 sm:mt-14"
          >
            <motion.button
              onClick={() => setVisibleCount(prev => prev + 10)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 border-2 border-[#2D2A26]/10 hover:border-[#F28F3B] text-[#2D2A26]/70 hover:text-[#F28F3B] font-bold text-xs sm:text-sm uppercase tracking-wider px-8 sm:px-10 py-3 sm:py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              Load More Rescues ({filtered.length - visibleCount} remaining)
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-4 text-[10px] text-[#2D2A26]/25 uppercase tracking-wider"
        >
          Showing {visibleMeals.length} of {filtered.length} meals
        </motion.p>
      </div>
    </section>
  );
}