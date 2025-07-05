export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dataAiHint: string;
};

export const products: Omit<Product, 'category'>[] = [
  {
    id: '1',
    title: 'Stellar Odyssey',
    description: 'Explore a vast, procedurally generated galaxy in this open-world space exploration RPG. Mine asteroids, trade with alien species, and uncover the secrets of a long-lost civilization.',
    price: 59.99,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'space exploration'
  },
  {
    id: '2',
    title: 'Chronosplit',
    description: 'A fast-paced, competitive first-person shooter where players manipulate time to outsmart their opponents. Rewind your own death, create time paradoxes, and master reality-bending weapons.',
    price: 49.99,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'futuristic soldier'
  },
  {
    id: '3',
    title: 'The Whispering Forest',
    description: 'A narrative-driven puzzle adventure set in an enchanted forest. Solve intricate environmental puzzles by manipulating flora and fauna, and unravel a story of forgotten magic.',
    price: 29.99,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'enchanted forest'
  },
  {
    id: '4',
    title: 'Cyber-Ronin',
    description: 'A third-person action game set in a dystopian cyberpunk city. As a cybernetically enhanced samurai, dismantle a powerful corporation using a blend of high-tech weaponry and traditional swordplay.',
    price: 59.99,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'cyberpunk samurai'
  },
  {
    id: '5',
    title: 'Gourmet Grand Prix',
    description: 'A whimsical and chaotic racing game where you drive food trucks in fantastical culinary-themed tracks. Use kitchen-utensil power-ups to leave your rivals in a cloud of flour.',
    price: 39.99,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'cartoon race'
  },
  {
    id: '6',
    title: 'Kingmaker\'s Gambit',
    description: 'A deep and complex grand strategy game set in a medieval fantasy world. Manage your kingdom, engage in diplomacy, and lead your armies to victory in turn-based tactical battles.',
    price: 39.99,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'fantasy map'
  },
  {
    id: '7',
    title: 'Voidfall',
    description: 'A roguelike deck-builder where you descend into an ever-changing abyss. Build a powerful deck of synergistic cards to survive against cosmic horrors.',
    price: 24.99,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'abstract space'
  },
  {
    id: '8',
    title: 'Project Chimera',
    description: 'A co-op survival horror game. You and your team are scientists in a remote facility where an experiment has gone wrong, creating a shape-shifting alien monster that hunts you.',
    price: 34.99,
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'dark lab'
  },
];
