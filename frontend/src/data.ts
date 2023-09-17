import { Marble } from "./app/shared/models/marble";
import { Tag } from "./app/shared/models/tag";

export const sample_marble: Marble[] = [
  {
    id: '1',
    name: 'PLATEAU DE BOUCHARDAGE',
    price: 300,
    tags: ['PLATEAU DE BOUCHARDAGE'],
    favorite: false,
    stars: 4.0,
    imageurl: 'assets/1.jpg',
    descriptions: ['Segment de Bouchardage Marbre'],
  },
  {
    id: '2',
    name: 'MEULE À DISQUE',
    price: 300,
    tags: ['DISQUE'],
    favorite: false,
    stars: 3.5,
    imageurl: 'assets/2.jpg',
    descriptions: ['Makita 2200/2400'],
  },
  {
    id: '3',
    name: 'Foret 20/25/30/35…100',
    price: 300,
    tags: ['FORETS'],
    favorite: true,
    stars: 5.0,
    imageurl: 'assets/3.jpg',
    descriptions: ['Foret 20/25/30/35…100'],
  },
  {
    id: '4',
    name: 'Disque 230 Italy',
    price: 450,
    tags: ['DISQUE'],
    favorite: false,
    stars: 4.0,
    imageurl: 'assets/4.jpg',
    descriptions: ['Disque 230 Italy'],
  },
  {
    id: '5',
    name: 'Disque Taille Bloc 1000/1100/1200',
    price: 300,
    tags: ['DISQUE'],
    favorite: false,
    stars: 4.0,
    imageurl: 'assets/5.jpg',
    descriptions: ['Disque Taille Bloc 1000/1100/1200'],
  },
];

export const sample_tags: Tag[] = [
  { name: 'All', count: 5 },
  { name: 'DISQUE', count: 3 },
  { name: 'PLATEAU DE BOUCHARDAGE', count: 1 },
  { name: 'FORETS', count: 1 },
];
