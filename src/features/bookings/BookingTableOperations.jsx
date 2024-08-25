import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  const filterField = "status";
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "checked-out", label: "Checked out" },
    { value: "checked-in", label: "Checked in" },
    { value: "unconfirmed", label: "Unconfirmed" },
  ];

  const sortField = "order";
  const sortOptions = [
    { value: "startDate-desc", label: "Sort by date (recent first)" },
    { value: "startDate-asc", label: "Sort by date (earlier first)" },
    {
      value: "totalPrice-desc",
      label: "Sort by amount (high first)",
    },
    { value: "totalPrice-asc", label: "Sort by amount (low first)" },
  ];

  return (
    <TableOperations>
      <Filter field={filterField} options={filterOptions} />
      <SortBy field={sortField} options={sortOptions} />
    </TableOperations>
  );
}

export default BookingTableOperations;