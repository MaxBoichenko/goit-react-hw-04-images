import { Item, Img } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ onImgClick, image }) {
  return (
    <Item onClick={() => onImgClick(image)}>
      <Img src={image.webformatURL} alt={image.tags} />
    </Item>
  );
}
