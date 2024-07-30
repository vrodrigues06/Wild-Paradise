import styled from "styled-components";
import React from "react";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;

  @media (max-width: 800px) {
    font-size: 1.2rem;
  }
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
  @media (max-width: 800px) {
    column-gap: 1rem;
  }
  @media (max-width: 700px) {
    column-gap: 0.4rem;
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  @media (max-width: 800px) {
    padding: 0.8rem 1.2rem;
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 800px) {
    padding: 0.8rem 1.2rem;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  @media (max-width: 800px) {
    padding: 0.4rem;
  }

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = React.createContext();

function Table({ columns, children }) {
  const context = {
    columns,
  };

  return (
    <TableContext.Provider value={context}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = React.useContext(TableContext);

  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns } = React.useContext(TableContext);

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}
function Body({ data, render, resource = "data" }) {
  if (!data.length) return <Empty>No {resource} to show at the moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
