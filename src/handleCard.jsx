import React from "react";
import { getData } from "./data.jsx";
import Nav from "./components/nav.jsx";
import Card from "./components/card.jsx";
import Offcanvas from "./components/offcanvas.jsx";
import Pagination from "./components/pagination.jsx";
import Category from "./components/category.jsx";
import Sort from "./components/sort.jsx";
import AddCartAlert from "./components/addCartAlert.jsx";
import Product from "./page/product.jsx";
import { Routes, Route } from "react-router-dom";

export default class HandleCard extends React.Component {
  state = {
    products: getData(),
    original: getData(),
    activeCategory: "All Catgories",
    activeSorting: "None",
    addCart: [],
    cartTotal: 0,
    pageSize: 3,
    currentPage: 1,
    showAlert: false,
  };

  handlePageClicked = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const AddQuantity = (item) => {
      let clone = [...this.state.products];
      let index = clone.indexOf(item);
      clone[index] = { ...item };
      clone[index].qty += 1;
      let newQty = clone[index].qty;
      this.setState({ products: clone });
      return newQty;
    };

    const ReduceQuantity = (item) => {
      let clone = [...this.state.products];
      let index = clone.indexOf(item);
      clone[index] = { ...item };
      if (!(clone[index].qty <= 0)) {
        clone[index].qty -= 1;
      }
      let newQty = clone[index].qty;
      this.setState({ products: clone });
      return newQty;
    };

    const addCart = (item) => {
      let newstate = { ...this.state };
      if (item.qty === 0) {
        this.setState({ showAlert: true });
        return null;
      }
      let found = newstate.addCart.find((i) => i.id === item.id);
      if (!found) {
        newstate.addCart.push(item);
      } else {
        console.log(found.price);
        found.qty += 1;
      }
      item.newPrice = item.qty * item.price;
      this.setState({ addCart: newstate.addCart });
    };

    const removeItem = (item) => {
      let newstate = { ...this.state };
      let filteredCart = newstate.addCart.filter((i) => i.id !== item.id);
      this.setState({ addCart: filteredCart });
    };

    const cartTotal = this.state.addCart.reduce((total, products) => {
      return total + products.newPrice;
    }, 0);

    const { currentPage, pageSize } = this.state;
    const startIndex = (currentPage - 1) * pageSize;
    const currentProducts = this.state.products.slice(
      startIndex,
      startIndex + pageSize,
    );

    const filtered = (categoryVal) => {
      const category = getData().filter((item) => {
        return item.category === categoryVal;
      });
      this.setState({
        products: category,
        activeCategory: categoryVal,
        activeSorting: "None",
      });
    };

    const allProducts = () => {
      this.setState({
        products: getData(),
        activeCategory: "All Catgories",
        activeSorting: "None",
      });
    };

    // functions for sorting
    const sortByAlphabets = () => {
      const sorted = this.state.products.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title === b.title) {
          return 0;
        }
        return 1;
      });
      this.setState({ products: sorted, activeSorting: "Alphabets" });
    };

    const sortByPrice = () => {
      const sorted = this.state.products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price === b.price) {
          return 0;
        }
        return 1;
      });
      this.setState({ products: sorted, activeSorting: "Price" });
    };

    const sortByRating = () => {
      const sorted = this.state.products.sort((a, b) => {
        if (b.rating.rate < a.rating.rate) {
          return -1;
        }
        if (a.rating.rate === b.rating.rate) {
          return 0;
        }
        return 1;
      });
      this.setState({ products: sorted, activeSorting: "Rating" });
    };

    const sortNone = () => {
      this.setState({ products: getData(), activeSorting: "None" });
    };

    return (
      <>
        <div className="conatiner">
          <div className="position-relative">
            {this.state.showAlert && (
              <AddCartAlert
                onClose={() => this.setState({ showAlert: false })}
              />
            )}
            <Nav
              BadgeNo={this.state.addCart.length}
              original={this.state.original}
              filtered={filtered}
              allProducts={allProducts}
            />
            <div className="row g-3 justify-content-center align-items-center">
              <div className="col-12 col-sm-2">
                <Category
                  original={this.state.original}
                  filtered={filtered}
                  allProducts={allProducts}
                  activeCategory={this.state.activeCategory}
                />
                <Sort
                  alphabet={sortByAlphabets}
                  price={sortByPrice}
                  rating={sortByRating}
                  none={sortNone}
                  activeSorting={this.state.activeSorting}
                />
              </div>
              <div className="col-12 col-sm-10">
                <div className="row align-items-stretch justify-content-center g-3">
                  {currentProducts.map((item) => (
                    <Card
                      key={item.id}
                      item={item}
                      quantity={item.qty}
                      add={AddQuantity}
                      reduce={ReduceQuantity}
                      cartCount={addCart}
                    />
                  ))}
                </div>
              </div>
              <Offcanvas
                products={this.state.addCart}
                removeItem={removeItem}
                cartTotal={cartTotal}
              />
              <Pagination
                itemCount={this.state.products.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageClicked={this.handlePageClicked}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
