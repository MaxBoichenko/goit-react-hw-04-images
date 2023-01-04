import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Searchbar,
  Form,
  Button,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleInput = event => {
    setValue(event.target.value);
  };

  const resetForm = () => {
    setValue('');
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (value) {
      onSubmit(value.toLowerCase().trim());
      resetForm();
    }
  };

  return (
    <Searchbar>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInput}
          value={value}
        />
      </Form>
    </Searchbar>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
