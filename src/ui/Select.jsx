import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
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

function Select({ options, value, onChange, ...props }) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((op) => (
        <option value={op.value} key={op.value}>
          {op.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
