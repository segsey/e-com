import React from "react";
import { Link } from "react-router-dom";
export default class OffcanvasCard extends React.Component {
  render() {
    return (
      <>
        <div className="d-flex justify-content-end bg-light-subtle rounded p-4 shadow-sm">
          <div className="d-flex gap-3">
            <Link
              to={`/product/${this.props.item.category}/${this.props.item.id}`}
            >
              <img
                src={this.props.item.image}
                className="img-fluid w-25"
                style={{ height: "150px" }}
                alt=""
              />
            </Link>
            <div className="d-flex flex-column justify-content-center">
              <h5 className="fs-5">{this.props.item.title.slice(0, 8)}...</h5>
              <p className="fw-bold text-body-secondary">
                {this.props.item.description.slice(0, 25)}...
              </p>
              <h6 className="fw-bold text-body-secondary">
                Price: $ {this.props.item.newPrice} <br />
                Quantity: {this.props.item.qty}
              </h6>
            </div>
            <div className="d-flex justify-content align-items-center">
              <button
                className="btn btn-primary fw-bold"
                onClick={() => this.props.removeItem(this.props.item)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
