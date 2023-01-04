import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { List } from './ImageGallery.styled';

export function ImageGallery({ images, onImgClick }) {
  return (
    <List>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onImgClick={onImgClick}
          />
        );
      })}
    </List>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  onImgClick: PropTypes.func.isRequired,
};
