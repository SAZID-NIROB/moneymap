import Button from "../ui/Button";

const Pagination = ({ pagination, onPageChange }) => (
  <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
    <p className="text-sm text-slate-500 dark:text-slate-400">
      Page {pagination.page} of {pagination.pages} • {pagination.total} total transactions
    </p>
    <div className="flex gap-3">
      <Button
        variant="secondary"
        disabled={pagination.page <= 1}
        onClick={() => onPageChange(pagination.page - 1)}
      >
        Previous
      </Button>
      <Button
        variant="secondary"
        disabled={!pagination.hasNextPage}
        onClick={() => onPageChange(pagination.page + 1)}
      >
        Next
      </Button>
    </div>
  </div>
);

export default Pagination;
