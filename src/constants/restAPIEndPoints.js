export const GET_PRODUCT_LIST = 'https://dummyjson.com/products';
export const SEARCH_PRODUCT_LIST = (value) => `https://dummyjson.com/products/search?q=${value}`;
export const GET_CATEGORY_LIST = "https://dummyjson.com/products/categories";
export const GET_PRODUCT_BY_CATEGORY = (category) =>
  `https://dummyjson.com/products/category/${category}`;