import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.Home),
    title: 'A Diamond Worth Remembering',
  },
  {
    path: 'diamonds',
    loadComponent: () => import('./features/diamonds/listing/diamond-listing').then(m => m.DiamondListing),
    title: 'Certified Diamonds',
  },
  {
    path: 'diamonds/:slug',
    loadComponent: () => import('./features/diamonds/detail/diamond-detail').then(m => m.DiamondDetail),
    title: 'Diamond',
  },
  {
    path: 'jewellery',
    loadComponent: () => import('./features/jewellery/jewellery-listing/jewellery-listing').then(m => m.JewelleryListing),
    title: 'Diamond Jewellery',
  },
  {
    path: 'jewellery/:slug',
    loadComponent: () => import('./features/jewellery/jewellery-detail/jewellery-detail').then(m => m.JewelleryDetail),
    title: 'Jewellery',
  },
  {
    path: 'collections',
    loadComponent: () => import('./features/collections/collections').then(m => m.Collections),
    title: 'Collections',
  },
  {
    path: 'collections/:slug',
    loadComponent: () => import('./features/collections/collection-detail/collection-detail').then(m => m.CollectionDetail),
    title: 'Collection',
  },
  {
    path: 'build-your-ring',
    loadComponent: () => import('./features/build-ring/build-ring').then(m => m.BuildRing),
    title: 'Build Your Ring',
  },
  {
    path: 'learn',
    loadComponent: () => import('./features/education/learn-landing/learn-landing').then(m => m.LearnLanding),
    title: 'Learn',
  },
  {
    path: 'learn/four-cs',
    loadComponent: () => import('./features/education/four-cs/four-cs').then(m => m.FourCs),
    title: 'The 4Cs',
  },
  {
    path: 'learn/natural-vs-lab-grown',
    loadComponent: () => import('./features/education/natural-vs-lab-grown/natural-vs-lab-grown').then(m => m.NaturalVsLabGrown),
    title: 'Natural vs Lab-Grown Diamonds',
  },
  {
    path: 'learn/certification',
    loadComponent: () => import('./features/education/certification/certification').then(m => m.Certification),
    title: 'Certification',
  },
  {
    path: 'learn/care',
    loadComponent: () => import('./features/education/care/care').then(m => m.Care),
    title: 'Diamond Care',
  },
  {
    path: 'our-story',
    loadComponent: () => import('./features/about/about').then(m => m.About),
    title: 'Our Story',
  },
  {
    path: 'consultation',
    loadComponent: () => import('./features/consultation/consultation').then(m => m.Consultation),
    title: 'Speak With an Expert',
  },
  {
    path: 'account',
    loadComponent: () => import('./features/account/account').then(m => m.Account),
    title: 'Your Account',
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./features/wishlist/wishlist-page').then(m => m.WishlistPage),
    title: 'Saved Diamonds',
  },
  {
    path: 'compare',
    loadComponent: () => import('./features/diamonds/compare/diamond-compare').then(m => m.DiamondCompare),
    title: 'Compare Diamonds',
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart-page').then(m => m.CartPage),
    title: 'Your Bag',
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout').then(m => m.Checkout),
    title: 'Checkout',
  },
  {
    path: 'order-confirmation',
    loadComponent: () => import('./features/order-confirmation/order-confirmation').then(m => m.OrderConfirmation),
    title: 'Order Confirmed',
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then(m => m.NotFound),
  },
];
