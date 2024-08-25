import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  const filterField = "discount";
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "No Discount", value: "no-discount" },
    { label: "With Discount", value: "with-discount" },
  ];

  const sortField = "sortby";
  const sortOptions = [
    { label: "Sort by name(A-Z)", value: "name-asc" },
    { label: "Sort by name(Z-A)", value: "name-desc" },
    { label: "Sort by price(low fisrt)", value: "regularPrice-asc" },
    { label: "Sort by price(high first)", value: "regularPrice-desc" },
    { label: "Sort by capacity(low first)", value: "maxCapacity-asc" },
    { label: "Sort by capacity(high first)", value: "maxCapacity-desc" },
  ];

  return (
    <TableOperations>
      <Filter field={filterField} options={filterOptions} />
      <SortBy field={sortField} options={sortOptions} />
    </TableOperations>
  );
}

export default CabinTableOperations;
