import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  handlePageClick: (selectedPage: number) => void;
  currentPage: number;
}

const Pagination = ({
  totalPages,
  handlePageClick,
  currentPage,
}: PaginationProps) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => handlePageClick(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousClassName={css.arrow}
      nextClassName={css.arrow}
      disabledClassName={css.disabled}
      breakClassName={css.break}
    />
  );
};

export default Pagination;
