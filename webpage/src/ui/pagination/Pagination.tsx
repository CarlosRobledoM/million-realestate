type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, pageSize, total, onPageChange }: Props) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const prev = Math.max(1, page - 1);
  const next = Math.min(pages, page + 1);

  return (
    <div className="flex items-center gap-3">
      <button
        className="px-3 py-1 rounded-md border hover:bg-slate-50 dark:hover:bg-slate-900"
        disabled={page === 1}
        onClick={() => onPageChange(prev)}
      >
        Prev
      </button>
      <span className="text-sm">
        {page} / {pages}
      </span>
      <button
        className="px-3 py-1 rounded-md border hover:bg-slate-50 dark:hover:bg-slate-900"
        disabled={page === pages}
        onClick={() => onPageChange(next)}
      >
        Next
      </button>
    </div>
  );
}
