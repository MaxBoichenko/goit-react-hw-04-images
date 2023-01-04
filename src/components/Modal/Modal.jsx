import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalContainer } from './Modal.styled';

export function Modal({ imageReset, image }) {
  useEffect(() => {
    function onEsc(event) {
      if (event.key === 'Escape') {
        imageReset();
      }
    }

    window.addEventListener('keydown', onEsc);

    return () => {
      window.removeEventListener('keydown', onEsc);
    };
  }, [imageReset]);

  const onOverlayClick = event => {
    if (event.target === event.currentTarget) {
      imageReset();
    }
  };

  return (
    <Overlay onClick={onOverlayClick}>
      <ModalContainer>
        <img src={image.largeImageURL} alt={image.tags} />
      </ModalContainer>
    </Overlay>
  );
}

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,

  imageReset: PropTypes.func.isRequired,
};
