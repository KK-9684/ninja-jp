export const pageNumber = (
  currentPage: number,
  totalCount: number,
  perPage: number
) => {
  const totalPages = Math.ceil(totalCount / perPage);

  return {
    prev: currentPage > 1 ? currentPage - 1 : null,
    next: currentPage < totalPages ? currentPage + 1 : null,
  };
};
