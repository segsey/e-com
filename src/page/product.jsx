import { useParams } from "react-router-dom";
import { getData } from "../data.jsx";
import Nav from "../components/nav.jsx";
export default function Product() {
  const { id } = useParams();
  let item = getData().find((i) => i.id === parseInt(id));
  return (
    <>
      <Nav BadgeNo={0} />
      <div className="bg-secondary-subtle py-5">
        <div className="container">
          <div className="row justify-content-center align-items-center g-4">
            <div className="col-11 col-md-4">
              <div className="bg-white rounded-5 py-3 px-4">
                <img src={item.image} className="img-fluid" />
              </div>
            </div>
            <div className="col-12 col-md-5">
              <div className="d-flex flex-column gap-2">
                <h4>{item.title}</h4>
                <h4 className="fw-bold">${item.price.toFixed(2)}</h4>
                <h6 className="fw-bold">Category: {item.category}</h6>
                <div className="d-flex flex-row justify-content-between align-items-center my-3">
                  <span>
                    <b>Reviews</b> ({item.rating.count})
                  </span>
                  <span>
                    <b>Rating</b>: {item.rating.rate}{" "}
                    <i className="bi bi-star-fill text-warning"></i>
                  </span>
                </div>
                <div>
                  <b>Description:</b>
                  <p>{item.description}</p>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => addCart(item)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
