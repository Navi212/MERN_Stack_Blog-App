// Paginate result by query parameters:
// limit => resultPerPage
// page  => page number to go to

exports.paginationHelper = (req) => {
  const goToPage = parseInt(req.query.page, 10) || 1;
  const resultPerPage = parseInt(req.query.limit, 10) || 10;
  const skip = resultPerPage * (goToPage - 1);

  return { resultPerPage, skip };
};
