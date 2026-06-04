import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categoriesAPI } from '../../services/api';
import { useFilterContext } from '../../contexts/FilterContext';
import './Categories.css';

const Categories = () => {
  const scrollContainerRef = useRef(null);
  const { setFilter } = useFilterContext();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesAPI.getAll();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  // Track whether we can scroll left/right to toggle button disabled state
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const checkScroll = () => {
      setCanScrollLeft(el.scrollLeft > 10);
      // Allow small epsilon for floating point
      setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 10);
    };

    checkScroll();
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [categories]);

  // Category icon mapping
  const getCategoryIcon = (slug) => {
    const icons = {
      'ground-crackers': '🎡',
      'aerial-crackers': '🎆',
      'sound-crackers': '💥',
      'sparklers': '✨'
    };
    return icons[slug] || '🎪';
  };


  return (
    <section className="categories" id="categories">
      <div className="categories-scroll-container">
        <div className="categories-grid" ref={scrollContainerRef} tabIndex={0}>
          {categories.map((category, index) => {
            const productCount = parseInt(category.product_count) || 0;
            return (
              <div 
                key={category.id} 
                className="category-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="category-icon">
                  {getCategoryIcon(category.slug)}
                </div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-count">{productCount} Items</p>
                <p className="category-description">{category.description}</p>
                <div className="category-overlay">
                  <button 
                    className="category-btn"
                    onClick={() => {
                      setFilter(category.name);
                      document.getElementById('products')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
                  >
                    Explore
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Left overlay (shows when canScrollLeft) */}
        <div
          className={`nav-overlay nav-overlay-left ${canScrollLeft ? 'visible' : 'hidden'}`}
          aria-hidden={!canScrollLeft}
        >
          <button
            className="nav-button nav-button-left"
            onClick={scrollLeft}
            aria-label="Scroll categories left"
            type="button"
            disabled={!canScrollLeft}
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        {/* Right overlay (shows when canScrollRight) */}
        <div
          className={`nav-overlay nav-overlay-right ${canScrollRight ? 'visible' : 'hidden'}`}
          aria-hidden={!canScrollRight}
        >
          <button
            className="nav-button nav-button-right"
            onClick={scrollRight}
            aria-label="Scroll categories right"
            type="button"
            disabled={!canScrollRight}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;