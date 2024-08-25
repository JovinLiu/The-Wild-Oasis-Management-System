import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/config";
import { useSearchParams } from "react-router-dom";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count, currentPage }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const from = (currentPage - 1) * PAGE_SIZE + 1;

  const to = currentPage >= pageCount ? count : currentPage * PAGE_SIZE;

  if (pageCount === 1) return null;

  function handleClickLeft() {
    if (currentPage <= 1) return;
    currentPage = currentPage - 1;
    searchParams.set("page", currentPage);
    setSearchParams(searchParams);
  }

  function handleClickRight() {
    if (currentPage >= pageCount) return;
    currentPage = +currentPage + 1;
    searchParams.set("page", currentPage);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <P>
        Showing <span>{from}</span> to <span>{to}</span> of <span>{count}</span>{" "}
        results
      </P>
      <Buttons>
        <PaginationButton onClick={handleClickLeft} disabled={currentPage <= 1}>
          <HiMiniChevronLeft />
          Previous
        </PaginationButton>
        <PaginationButton
          onClick={handleClickRight}
          disabled={currentPage >= pageCount}
        >
          Next
          <HiMiniChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
