import PropTypes from 'prop-types';

import { StyledButton } from './Button.styled';

export function Button({ onClickLoadMoreBtn }) {
  return (
    <StyledButton onClick={onClickLoadMoreBtn} type="button">
      Load more
    </StyledButton>
  );
}

Button.propTypes = {
  onClickLoadMoreBtn: PropTypes.func.isRequired,
};
