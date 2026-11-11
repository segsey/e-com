function Category(props) {
  const { filtered, allProducts, fetchedData, activeCategory } = props;
  const categoryList = [];
  fetchedData.forEach((element) => {
    const found = categoryList.find(
      (item) => item.category === element.category,
    );
    if (found) {
      return null;
    } else {
      categoryList.push(element);
    }
  });

  return (
    <>
      <h5>Categories</h5>
      <ul className="list-group my-2">
        <li
          className={
            activeCategory === "All Categories"
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={allProducts}
        >
          All Categories
        </li>
        {categoryList.map((item, index) => {
          return (
            <li
              className={
                item.category === activeCategory
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={index}
              onClick={() => filtered(item.category)}
            >
              <a>{item.category}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default Category;
