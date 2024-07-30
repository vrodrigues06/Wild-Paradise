import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
  @media (max-width: 700px) {
    font-size: 1.1rem;
    gap: 0.8rem;
    grid-template-columns: 7rem 1fr 5rem 8rem;
  }
  @media (max-width: 500px) {
    font-size: 1rem;
    gap: 0.6rem;
    grid-template-columns: 6rem 1fr 8rem;
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

import React from "react";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useMedia } from "../../hooks/useMedia";

const TodayItem = ({ activity }) => {
  const { id, status, guests, numNights } = activity;
  const matches = useMedia("(max-width: 700px)");
  const matches500 = useMedia("(max-width: 500px)");

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}

      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      {!matches && (
        <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      )}
      <Guest>{guests.fullName}</Guest>
      {!matches500 && <div>{numNights} nights</div>}

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
};

export default TodayItem;
