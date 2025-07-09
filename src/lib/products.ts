export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: 'Juegos' | 'Consolas' | 'Accesorios';
  dataAiHint: string;
};

export const products: Product[] = [
  {
    id: '1',
    title: 'Elden Ring',
    description: 'Un vasto mundo de fantasía te espera en el aclamado RPG de acción de FromSoftware. Conviértete en el Señor del Círculo.',
    price: 59.99,
    image: 'https://placehold.co/600x400.png',
    category: 'Juegos',
    dataAiHint: 'fantasy warrior'
  },
  {
    id: '2',
    title: 'PlayStation 5',
    description: 'La última generación de consolas de Sony, con gráficos de vanguardia, tiempos de carga ultrarrápidos y el innovador control DualSense.',
    price: 499.99,
    image: 'https://placehold.co/600x400.png',
    category: 'Consolas',
    dataAiHint: 'gaming console'
  },
  {
    id: '3',
    title: 'Controles Inalámbricos Xbox',
    description: 'Experimenta el diseño modernizado del control inalámbrico de Xbox, con superficies esculpidas y una geometría refinada para mayor comodidad.',
    price: 64.99,
    image: 'https://placehold.co/600x400.png',
    category: 'Accesorios',
    dataAiHint: 'game controller'
  },
  {
    id: '4',
    title: 'Cyberpunk 2077',
    description: 'Sumérgete en Night City, una megalópolis obsesionada con el poder, el glamur y la modificación corporal. Una aventura de acción y rol de mundo abierto.',
    price: 49.99,
    image: 'https://placehold.co/600x400.png',
    category: 'Juegos',
    dataAiHint: 'cyberpunk city'
  },
  {
    id: '5',
    title: 'Nintendo Switch - Modelo OLED',
    description: 'Juega en casa o en cualquier lugar con una vibrante pantalla OLED de 7 pulgadas. Incluye 64 GB de almacenamiento interno.',
    price: 349.99,
    image: 'https://placehold.co/600x400.png',
    category: 'Consolas',
    dataAiHint: 'handheld console'
  },
  {
    id: '6',
    title: 'Auriculares SteelSeries Arctis Nova Pro',
    description: 'Audio de alta fidelidad, claridad de micrófono con IA y comodidad para maratones de juego. El sistema Nova Pro Acoustic es tu ventaja competitiva.',
    price: 349.99,
    image: 'https://placehold.co/600x400.png',
    category: 'Accesorios',
    dataAiHint: 'gaming headset'
  },
  {
    id: '7',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    description: 'Una aventura épica a través de las tierras y los cielos de Hyrule te espera. Crea tu propio camino en este aclamado juego de Nintendo.',
    price: 69.99,
    image: 'https://placehold.co/600x400.png',
    category: 'Juegos',
    dataAiHint: 'fantasy landscape'
  },
  {
    id: '8',
    title: 'Silla Gamer Secretlab TITAN Evo',
    description: 'Diseñada para un rendimiento ergonómico superior. Ofrece un soporte y una personalización inigualables para largas sesiones de juego.',
    price: 549.00,
    image: 'https://placehold.co/600x400.png',
    category: 'Accesorios',
    dataAiHint: 'gaming chair'
  }
];
