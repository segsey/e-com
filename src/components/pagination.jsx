function Pagination(props) {
  let { itemCount, pageSize, currentPage, onPageClicked } = props;
  const pagesCount = Math.ceil(itemCount / pageSize);
  if (pagesCount === 1) {
    return null;
  }
  let pagesNum = [];
  for (let i = 1; i <= pagesCount; i++) {
    pagesNum.push(i);
  }

  return (
    <>
      <nav
        className="d-flex justify-content-center mt-4"
        aria-label="Page navigation example"
      >
        <ul className="pagination mx-auto">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pagesNum.map((page) => {
            return (
              <li
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
                key={page}
              >
                <a className="page-link" onClick={() => onPageClicked(page)}>
                  {page}
                </a>
              </li>
            );
          })}
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default Pagination;
