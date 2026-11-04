import React from "react";
import { Link } from "react-router-dom";
export default class Card extends React.Component {
  render() {
    return (
      <div className="col-12 col-md-4 text-center">
        <div className="card p-2 h-100">
          <img
            src={this.props.item.image}
            className="card-img-top img-fluid w-50 mx-auto"
            style={{ height: "200px", width: "100%" }}
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title">
              {this.props.item.title.slice(0, 17)}...
            </h5>
            <p className="card-text">
              {this.props.item.description.slice(0, 70)}...
            </p>
            <p className="card-text">
              <b>Price: ${this.props.item.price.toFixed(2)}</b> <br />
              <b>Rating: {this.props.item.rating.rate}</b>
            </p>
            <div className="input-group justify-content-center">
              <button
                className="btn btn-outline-primary"
                onClick={() => this.props.reduce(this.props.item)}
              >
                -
              </button>
              <span className="form-control text-dark fw-bold">
                {this.props.quantity}
              </span>
              <button
                className="btn btn-primary"
                onClick={() => this.props.add(this.props.item)}
              >
                +
              </button>
            </div>
            <div>
              <Link
                className="btn btn-outline-primary mt-2"
                to={`/product/${this.props.item.category}/${this.props.item.id}`}
              >
                View
              </Link>
            </div>
            <div>
              <button
                className="btn btn-primary mt-2"
                onClick={() => this.props.cartCount(this.props.item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
