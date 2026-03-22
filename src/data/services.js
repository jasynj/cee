import wedding from '../assets/wedding.png';
import outdoor from '../assets/outdoor.jpg';
import decoration from '../assets/decoration.png';
import catering from '../assets/catering.png';
import videography from '../assets/videography.jpg';

export const services = [
  {
    id: 'catering',
    title: 'Catering',
    scriptTitle: 'Catering',
    description: 'Exquisite menus tailored to your taste, from elegant plated dinners to vibrant buffet spreads that leave every guest satisfied.',
    image: catering,
  },
  {
    id: 'decoration',
    title: 'Decoration',
    scriptTitle: 'Decoration',
    description: 'Transforming venues into breathtaking spaces with bespoke designs, floral arrangements, and atmospheric lighting.',
    image: decoration,
  },
  {
    id: 'coordination',
    title: 'Event Planning',
    scriptTitle: 'Planning',
    description: 'Seamless end-to-end event management ensuring every detail is handled so you can enjoy the moment stress-free.',
    image: outdoor,
  },
  {
    id: 'photography',
    title: 'Photography',
    scriptTitle: 'Photography',
    description: 'Professional photographers capturing every candid smile, heartfelt embrace, and unforgettable highlight of your event.',
    image: wedding,
    imageClassName: 'object-top',
  },
  {
    id: 'videography',
    title: 'Videography',
    scriptTitle: 'Videography',
    description: 'Cinematic video coverage that tells the story of your event, from the first look to the final farewell.',
    image: videography,
    imageClassName: 'object-left',
  },
]
