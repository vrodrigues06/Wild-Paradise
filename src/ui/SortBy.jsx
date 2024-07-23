import React from "react";
import Select from "../ui/Select";
import { useSearchParams } from "react-router-dom";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange({ target }) {
    searchParams.set("sortBy", target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      onChange={handleChange}
      type="white"
    ></Select>
  );
};

export default SortBy;
