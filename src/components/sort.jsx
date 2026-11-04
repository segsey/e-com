function Sort({ alphabet, price, rating, activeSorting, none }) {
  return (
    <>
      <h5>Sort Items</h5>
      <ul className="list-group my-2">
        <li
          className={
            activeSorting === "None"
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => none()}
        >
          None
        </li>
        <li
          className={
            activeSorting === "Alphabets"
              ? "list-group-item active"
              : "list-group-item"
          }
          aria-current="true"
          onClick={() => alphabet()}
        >
          A - Z
        </li>
        <li
          className={
            activeSorting === "Price"
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => price()}
        >
          Cheapest to Highest
        </li>
        <li
          className={
            activeSorting === "Rating"
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => rating()}
        >
          Highest Rating to Lowest Rating
        </li>
      </ul>
    </>
  );
}
export default Sort;
