import CabinItem from "../cabins/CabinItem";
import Spinner from "../../ui/Spinner";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import toast from "react-hot-toast";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/config";

function CabinTable() {
  const { isLoading, error, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  const sortValue = searchParams.get("sortby") || "name-asc";
  const [sortField, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let currentPage = Math.round(searchParams.get("page") || 1);

  if (isLoading) return <Spinner />;

  if (error) toast.error(error.message);

  let filteredCabins;
  //先过滤信息
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  //再排列信息
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[sortField] - b[sortField]) * modifier
  );
  const count = sortedCabins.length;
  //再分页信息
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = currentPage * PAGE_SIZE;
  const pagedCabins = sortedCabins.slice(from, to);

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>CABIN</div>
        <div>CAPACITY</div>
        <div>PRICE</div>
        <div>DISCOUNT</div>
        <div></div>
      </Table.Header>
      <Menus>
        <Table.Body
          data={pagedCabins}
          //Table.Row会出现在CabinItem中
          render={(cabin) => <CabinItem cabin={cabin} key={cabin.id} />}
        />
        <Table.Footer>
          <Pagination count={count} currentPage={currentPage} />
        </Table.Footer>
      </Menus>
    </Table>
  );
}

export default CabinTable;
