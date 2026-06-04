import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { productsAPI, categoriesAPI } from '../../services/api';
import { sampleProducts, crackerCategories } from '../../data/products';
import { useFilterContext } from '../../contexts/FilterContext';
import './Products.css';

const Products = () => {
  const { filter, setFilter } = useFilterContext();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesAPI.getAll();
        if (data.success && data.categories?.length) {
          setCategories(data.categories);
          return;
        }
      } catch (err) {
        console.warn('Categories API unavailable, using local data:', err);
      }
      setCategories(
        crackerCategories.map((cat) => ({ id: cat.id, name: cat.name }))
      );
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let data;
        if (filter === 'All') {
          data = await productsAPI.getAll();
        } else {
          const category = categories.find((cat) => cat.name === filter);
          if (category) {
            data = await productsAPI.getByCategory(category.id);
          } else {
            data = await productsAPI.getAll();
          }
        }

        if (data?.success && data.products?.length) {
          setProducts(data.products);
          return;
        }
      } catch (err) {
        console.warn('Products API unavailable, using local data:', err);
      }

      setProducts(sampleProducts);
    };

    fetchProducts().finally(() => setLoading(false));
  }, [filter, categories]);

  const filterOptions = useMemo(
    () => [
      { id: 'all', name: 'All' },
      ...categories.map((cat) => ({ id: cat.id, name: cat.name })),
    ],
    [categories]
  );

  const catalogProducts = products.length > 0 ? products : sampleProducts;

  const filteredProducts = useMemo(() => {
    if (filter === 'All') {
      return catalogProducts;
    }
    const category = crackerCategories.find((cat) => cat.name === filter);
    if (!category) return catalogProducts;
    return catalogProducts.filter(
      (product) =>
        product.category === category.id ||
        product.category_id === category.id
    );
  }, [filter, catalogProducts]);

  return (
    <section className="products" id="products">
      <div className="products-container">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            Handpicked premium crackers for your special moments
          </p>
        </div>

        <div className="filter-tabs">
          {filterOptions.map((filterOpt) => (
            <button
              key={filterOpt.id}
              className={`filter-tab ${filter === filterOpt.name ? 'active' : ''}`}
              onClick={() => setFilter(filterOpt.name)}
            >
              {filterOpt.name}
            </button>
          ))}
        </div>

        {loading && (
          <p className="products-status">Loading products…</p>
        )}

        {!loading && error && (
          <p className="products-status products-status--error">{error}</p>
        )}

        {!loading && filteredProducts.length === 0 && (
          <p className="products-status">No products found in this category.</p>
        )}

        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <ProductCard product={product} showQuickView={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
