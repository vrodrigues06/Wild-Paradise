import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const CabinTableOperations = () => {
  const discountFilterOptions = [
    { value: "all", label: "All" },
    { value: "no-discount", label: "No discount" },
    { value: "with-discount", label: "With discount" },
  ];

  const sortByOptions = [
    { value: "name-asc", label: "sort by name (A-Z)" },
    { value: "name-desc", label: "sort by name (Z-A)" },
    { value: "regularPrice-asc", label: "sort by price (lowest)" },
    { value: "regularPrice-desc", label: "sort by price (highest)" },
    { value: "maxCapacity-asc", label: "sort by capacity (lowest)" },
    { value: "maxCapacity-desc", label: "sort by capacity (highest)" },
  ];

  return (
    <TableOperations>
      <Filter filterField="discount" filterOptions={discountFilterOptions} />
      <SortBy options={sortByOptions} />
    </TableOperations>
  );
};

export default CabinTableOperations;
