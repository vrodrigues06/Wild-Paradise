import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingDetail } from "./useBookingDetail";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { deleteModal } from "../../utils/helpers";
import { useDeleteBooking } from "./useDeleteBooking";
import Swal from "sweetalert2";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data: booking, isLoading } = useBookingDetail();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBookingMutate } = useDeleteBooking();

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleDeleteBooking() {
    Swal.fire({
      title: `You are about to delete the Booking #${bookingId}.`,
      text: "This action is irreversible. Do you want to proceed?",
      icon: "warning",
      iconColor: "var(--color-grey-700)",
      color: "var(--color-grey-900)",
      background: "var(--color-grey-100)",
      showCancelButton: true,
      confirmButtonColor: "var(--color-red-700)",
      cancelButtonColor: "var(--color-grey-300)",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBookingMutate(bookingId, {
          onSettled: () => navigate(-1),
        });
      }
    });
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            {" "}
            Check in{" "}
          </Button>
        )}
        {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            {" "}
            Check out{" "}
          </Button>
        )}
        <Button onClick={handleDeleteBooking} variation="danger">
          Delete
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
