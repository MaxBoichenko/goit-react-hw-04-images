import { useState, useEffect, useRef } from 'react';

import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { LoaderDNA } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { fetchImages } from '../../services/Api.js';

import { Container } from './App.styled';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const perPage = useRef(12);

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    isLoadingToggle();

    function showLoadMoreBtnFnc(totalImages) {
      if (
        Math.ceil(totalImages / perPage.current) === page ||
        Math.ceil(totalImages / perPage.current) === 0
      ) {
        setShowLoadMoreBtn(false);
        return;
      }

      setShowLoadMoreBtn(true);
    }

    fetchImages(searchValue, page, perPage.current)
      .then(images => {
        showLoadMoreBtnFnc(images.total);

        return setImages(prevImages => [...prevImages, ...images.hits]);
      })
      .catch(() => console.log('ошибка'))
      .finally(() => {
        isLoadingToggle();

        setIsEmpty(false);
      });
  }, [searchValue, page]);

  const increasePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onImgClick = image => {
    setImage(image);
  };

  const imageReset = () => {
    setImage('');
  };

  function isLoadingToggle() {
    setIsLoading(prevIsLoading => !prevIsLoading);
  }

  const onHandleSubmit = value => {
    if (searchValue === value) {
      return;
    }

    setSearchValue(value);
    setPage(1);
    setImages([]);
  };

  return (
    <Container>
      <SearchBar onSubmit={onHandleSubmit} />

      {isEmpty && !isLoading && <p>Введите что-то</p>}

      {!isEmpty && !isLoading && images.length === 0 && (
        <p>По результату поиска {searchValue} не найдено</p>
      )}

      {images.length > 0 && (
        <ImageGallery images={images} onImgClick={onImgClick} />
      )}

      {image && <Modal image={image} imageReset={imageReset} />}

      {showLoadMoreBtn && !isLoading && (
        <Button onClickLoadMoreBtn={increasePage} />
      )}
      {isLoading && <LoaderDNA />}
    </Container>
  );
}
