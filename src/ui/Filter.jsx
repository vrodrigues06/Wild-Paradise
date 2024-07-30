import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  @media (max-width: 500px) {
    gap: 0.2rem;
    padding: 0.2rem;
  }
  @media (max-width: 450px) {
    gap: 0.1rem;
    padding: 0.1rem;
  }
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  @media (max-width: 500px) {
    gap: 0.2rem;
    padding: 0.4rem 0.7rem;
    font-size: 1.3rem;
  }
  @media (max-width: 450px) {
    gap: 0;
    padding: 0.2rem 0.5rem;
    font-size: 1.1rem;
  }
`;

function Filter({ filterField, filterOptions = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField);

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {filterOptions.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={currentFilter === option.value ? "true" : ""}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
