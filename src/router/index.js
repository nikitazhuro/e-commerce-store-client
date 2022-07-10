import React from 'react';

import CategoryPage from '../pages/category-page/category-page';
import ProductPage from '../pages/product-item-page/product-page';
import BasketPage from '../pages/basket-page/basket-page';

const publicRoutes = [
  { path: '*', element: <CategoryPage /> },
  { path: '/:category', element: <CategoryPage /> },
  { path: '/:category/:itemName/:id', element: <ProductPage /> },
  { path: '/basket', element: <BasketPage /> },
];

export default publicRoutes;
