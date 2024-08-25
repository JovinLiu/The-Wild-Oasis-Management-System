import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ field, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChangeSortBy(e) {
    searchParams.set(field, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select type="white" onChange={(e) => handleChangeSortBy(e)}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}

export default SortBy;
