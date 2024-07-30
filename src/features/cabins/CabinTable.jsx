import Spinner from "../../ui/Spinner";
import React from "react";

import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { useMedia } from "../../hooks/useMedia";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const matches = useMedia("(max-width: 600px )");

  if (isLoading) return <Spinner />;

  // FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  // SORT

  const sortBy = searchParams.get("sortBy") || "name-asc";

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => {
    return (a[field] - b[field]) * modifier;
  });

  // columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"
  const columns = matches
    ? " 0fr 0.5fr 1fr 0.8fr 0.5fr 0.4fr"
    : "0.6fr 1.8fr 2.2fr 1fr 1fr 1fr";
  return (
    <Menus>
      <Table columns={columns}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
