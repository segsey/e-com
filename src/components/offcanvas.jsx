import React from "react";
import OffcanvasCard from "./offcanvasCard.jsx";

export default class Offcanvas extends React.Component {
  render() {
    return (
      <>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <div className="offcanvas-title fw-bold" id="offcanvasLabel">
              Total: ${this.props.cartTotal}
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div className="d-flex flex-column gap-2">
              {this.props.products.map((item) => (
                <OffcanvasCard
                  key={item.id}
                  item={item}
                  removeItem={this.props.removeItem}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
