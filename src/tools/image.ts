import { ImageLoader } from 'next/image';

export const imageLoader: ImageLoader = ({ src, width }) => {
  return `${src}?w=${width}`;
};
