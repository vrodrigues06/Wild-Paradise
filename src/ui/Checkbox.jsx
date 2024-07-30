import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;

    transform-origin: 0;
    accent-color: var(--color-brand-600);
    @media (max-width: 600px) {
      height: 2rem;
      width: 2rem;
      transform: translateY(3px);
    }
    @media (max-width: 400px) {
      height: 1.8rem;
      width: 1.8rem;
      transform: translateY(4px);
    }
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  @media (max-width: 600px) {
    gap: 1rem;
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1.4rem;
  }
`;

function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <StyledCheckbox>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ""}>{children}</label>
    </StyledCheckbox>
  );
}

export default Checkbox;
