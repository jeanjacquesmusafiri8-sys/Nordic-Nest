import { Product, User, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Fauteuil Bouclé Öland',
    price: 389,
    category: 'Salon',
    description: 'Une assise enveloppante revêtue d\'un tissu bouclé ultra-dovx. Ses pieds en chêne massif apportent une touche chaleureuse et organique typique du design scandinave.',
    dimensions: 'L 84 x H 78 x P 80 cm',
    materials: 'Tissu bouclé (100% Polyester), Structure pin et contreplaqué, Pieds chêne massif verni.',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800',
    badge: 'Nouveau',
    featured: true,
    rating: 4.8,
    reviewsCount: 24
  },
  {
    id: 'prod-2',
    name: 'Canapé Convertible Épure Sarek',
    price: 949,
    category: 'Salon',
    description: 'Le parfait équilibre entre fonctionnalité et esthétique. Ce canapé 3 places se transforme en un lit d\'appoint confortable en un clin d\'œil. Son coloris beige chiné est intemporel.',
    dimensions: 'L 210 x H 85 x P 95 cm',
    materials: 'Revêtement textile lin/coton, Cadre acier, Pieds hêtre massif noir.',
    stock: 6,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
    badge: 'Vedette',
    featured: true,
    rating: 4.9,
    reviewsCount: 42
  },
  {
    id: 'prod-3',
    name: 'Enfilade Chêne Fjord',
    price: 679,
    category: 'Salon',
    description: 'Une magnifique enfilade en placage chêne naturel dotée de portes coulissantes et de tiroirs biseautés. Parfaite pour organiser votre vaisselle ou matériel multimédia.',
    dimensions: 'L 160 x H 75 x P 45 cm',
    materials: 'MDF plaqué chêne naturel verni acrylique mat, Tiroirs sur glissières métalliques.',
    stock: 5,
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ee5262e120d8?auto=format&fit=crop&q=80&w=800',
    badge: '-15%',
    featured: true,
    rating: 4.7,
    reviewsCount: 18
  },
  {
    id: 'prod-4',
    name: 'Lit Plateforme Bergen',
    price: 529,
    category: 'Chambre',
    description: 'Un lit suspendu minimaliste en bois de frêne clair. Sa tête de lit inclinée offre une position confortable pour la lecture nocturne. Livré sans sommier ni matelas.',
    dimensions: '160 x 200 cm (global: L 175 x H 90 x P 215 cm)',
    materials: 'Structure hêtre et placage frêne clair de qualité supérieure.',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800',
    badge: 'Nouveau',
    featured: false,
    rating: 4.6,
    reviewsCount: 11
  },
  {
    id: 'prod-5',
    name: 'Bureau Secrétaire Malmö',
    price: 299,
    category: 'Bureau',
    description: 'Un bureau compact et astucieux pensé pour le télétravail. Il dispose de niches de rangement et d\'un passe-câbles discret pour maintenir votre espace de travail ordonné.',
    dimensions: 'L 110 x H 76 x P 55 cm',
    materials: 'MDF laqué mat blanc et pieds hêtre massif verni mat.',
    stock: 14,
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800',
    badge: undefined,
    featured: true,
    rating: 4.5,
    reviewsCount: 15
  },
  {
    id: 'prod-6',
    name: 'Table de Repas Ovalis',
    price: 480,
    category: 'Cuisine',
    description: 'Accueillez jusqu\'à 6 convives autour de cette table ovale moderne. Son piétement central sculptural en lattes de chêne en fait le point focal de votre salle à manger.',
    dimensions: 'L 180 x H 75 x P 90 cm',
    materials: 'Piètement lattes de chêne massif, Plateau placage chêne de haute densité.',
    stock: 7,
    imageUrl: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&q=80&w=800',
    badge: 'Vedette',
    featured: true,
    rating: 4.8,
    reviewsCount: 29
  },
  {
    id: 'prod-7',
    name: 'Chaire d’Atelier Skagen',
    price: 135,
    category: 'Bureau',
    description: 'Chaise rotative et réglable en hauteur. L\'alliance du métal noir thermolaqué et d\'une coque enveloppante pour un confort ergonomique exceptionnel lors de vos sessions créatives.',
    dimensions: 'L 58 x H 82-94 x P 58 cm',
    materials: 'Coque polypropylène renforcée, Piètement étoile en acier, Assise similicuir.',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800',
    badge: '-20%',
    featured: false,
    rating: 4.4,
    reviewsCount: 33
  },
  {
    id: 'prod-8',
    name: 'Chevet Suspendu Visby',
    price: 99,
    category: 'Chambre',
    description: 'Une table de nuit flottante au design aérien avec tiroir push-to-open. Se fixe simplement au mur pour libérer de l\'espace au sol et simplifier le nettoyage.',
    dimensions: 'L 40 x H 20 x P 30 cm',
    materials: 'Noyer massif d\'Amérique du Nord, Finition huilée écologique.',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1532372320978-9b4d6a3a854c?auto=format&fit=crop&q=80&w=800',
    badge: undefined,
    featured: false,
    rating: 4.7,
    reviewsCount: 8
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Oderick',
    email: 'oderick',
    role: 'admin',
    status: 'active',
    createdAt: '2026-01-10'
  },
  {
    id: 'user-2',
    name: 'Jean-Jacques Musafiri',
    email: 'jeanjacquesmusafiri8@gmail.com',
    role: 'customer',
    status: 'active',
    createdAt: '2026-06-12'
  },
  {
    id: 'user-3',
    name: 'Chloé Dubost',
    email: 'chloe.dubost@sens.fr',
    role: 'customer',
    status: 'active',
    createdAt: '2026-05-18'
  },
  {
    id: 'user-4',
    name: 'Marc-André Lemaire',
    email: 'ma.lemaire@webdesign.ca',
    role: 'customer',
    status: 'blocked',
    createdAt: '2026-03-24'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'CMD-8321',
    customerName: 'Chloé Dubost',
    customerEmail: 'chloe.dubost@sens.fr',
    customerPhone: '+33 6 12 34 56 78',
    shippingAddress: '42 Rue de l\'Académie',
    city: 'Lyon',
    zipCode: '69002',
    items: [
      {
        productId: 'prod-1',
        productName: 'Fauteuil Bouclé Öland',
        price: 389,
        quantity: 1
      },
      {
        productId: 'prod-5',
        productName: 'Bureau Secrétaire Malmö',
        price: 299,
        quantity: 1
      }
    ],
    totalAmount: 688,
    status: 'Livré',
    createdAt: '2026-05-19'
  },
  {
    id: 'CMD-9214',
    customerName: 'Marc-André Lemaire',
    customerEmail: 'ma.lemaire@webdesign.ca',
    customerPhone: '+1 514 999 8888',
    shippingAddress: '887 Rue Sainte-Catherine',
    city: 'Montréal',
    zipCode: 'H3B 1H1',
    items: [
      {
        productId: 'prod-3',
        productName: 'Enfilade Chêne Fjord',
        price: 679,
        quantity: 1
      }
    ],
    totalAmount: 679,
    status: 'Expédié',
    createdAt: '2026-06-10'
  },
  {
    id: 'CMD-0418',
    customerName: 'Sophie Bernard',
    customerEmail: 'sophie.bernard@yahoo.fr',
    customerPhone: '+33 7 89 01 23 45',
    shippingAddress: '15 Avenue des Champs-Élysées',
    city: 'Paris',
    zipCode: '75008',
    items: [
      {
        productId: 'prod-7',
        productName: 'Chaire d’Atelier Skagen',
        price: 135,
        quantity: 2
      }
    ],
    totalAmount: 270,
    status: 'En attente',
    createdAt: '2026-06-13'
  }
];
