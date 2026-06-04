import { crackerCategories } from '../data/products';

/** Category thumbnail paths (emoji-style SVGs, same visual language as category cards). */
export const categoryImageById = Object.fromEntries(
  crackerCategories.map((cat) => [cat.id, `/images/categories/${cat.id}.svg`])
);

export const getCategoryIcon = (categoryId) => {
  const cat = crackerCategories.find((c) => c.id === categoryId);
  return cat?.icon ?? '🎆';
};

export const getCategoryImageUrl = (categoryId) =>
  categoryImageById[categoryId] ?? '/images/categories/sky-shots.svg';

/** Primary image for product cards, cart, and hero — uses category SVG (product .jpg paths are SVG placeholders). */
export const getProductPrimaryImage = (product) => {
  const primary = product?.images?.[0];
  if (primary?.endsWith('.svg')) return primary;
  if (product?.category) return getCategoryImageUrl(product.category);
  if (primary) return primary;
  return '/images/placeholder-product.svg';
};
