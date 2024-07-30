import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import { useBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";
import { useMedia } from "../../hooks/useMedia";

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();
  const matches = useMedia("(max-width: 700px )");
  const matches430 = useMedia("(max-width: 430px )");

  if (isLoading) return <Spinner />;

  let columns = "0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem";

  if (matches && !matches430) columns = "0.4fr 1fr 1fr 0fr";
  else if (matches430) columns = "2fr 1fr 1fr 0fr";
  else columns = "0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem";

  return (
    <Menus>
      <Table columns={columns}>
        <Table.Header>
          {!matches430 && <div>Cabin</div>}
          <div>Guest</div>
          {!matches && <div>Dates</div>}
          <div>Status</div>
          {!matches && <div>Amount</div>}
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          resource="bookings"
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
