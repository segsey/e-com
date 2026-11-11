import React from "react";
import axios from "axios";
import Nav from "./components/nav.jsx";
import Card from "./components/card.jsx";
import Offcanvas from "./components/offcanvas.jsx";
import Pagination from "./components/pagination.jsx";
import Category from "./components/category.jsx";
import Sort from "./components/sort.jsx";
import AddCartAlert from "./components/addCartAlert.jsx";
import { Routes, Route } from "react-router-dom";
import PostForm from "./components/postForm.jsx";

export default class HandleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fetchedData: [],
      addCart: [],
      activeCategory: "All Categories",
      activeSorting: "None",
      cartTotal: 0,
      pageSize: 3,
      currentPage: 1,
      currentCategory: this.props.category,
      showAlert: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      if (this.state.activeCategory === "All Categories") {
        this.setState({
          fetchedData: response.data,
          data: response.data,
        });
      } else {
        const filteredData = response.data.filter(
          (item) => item.category === this.props.category,
        );
        this.setState({
          fetchedData: response.data,
          data: filteredData,
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  handlePageClicked = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const AddQuantity = (item) => {
      let clone = [...this.state.data];
      let index = clone.indexOf(item);
      clone[index] = { ...item };
      clone[index].qty = clone[index].qty || 0;
      clone[index].qty += 1;
      let newQty = clone[index].qty;
      this.setState({ data: clone });
      return newQty;
    };

    const ReduceQuantity = (item) => {
      let clone = [...this.state.data];
      let index = clone.indexOf(item);
      clone[index] = { ...item };
      clone[index].qty = clone[index].qty || 0;
      if (!(clone[index].qty <= 0)) {
        clone[index].qty -= 1;
      }
      let newQty = clone[index].qty;
      this.setState({ data: clone });
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
    const currentProducts = this.state.data.slice(
      startIndex,
      startIndex + pageSize,
    );

    const filtered = (categoryVal) => {
      const category = this.state.fetchedData.filter((item) => {
        return item.category === categoryVal;
      });
      this.setState({
        data: category,
        activeCategory: categoryVal,
        activeSorting: "None",
      });
    };

    const allProducts = () => {
      this.setState({
        data: this.state.fetchedData,
        activeCategory: "All Categories",
        activeSorting: "None",
      });
    };

    // functions for sorting
    const sortByAlphabets = () => {
      const sorted = this.state.data.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title === b.title) {
          return 0;
        }
        return 1;
      });
      this.setState({ data: sorted, activeSorting: "Alphabets" });
    };

    const sortByPrice = () => {
      const sorted = this.state.data.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price === b.price) {
          return 0;
        }
        return 1;
      });
      this.setState({ data: sorted, activeSorting: "Price" });
    };

    const sortByRating = () => {
      const sorted = this.state.data.sort((a, b) => {
        if (b.rating.rate < a.rating.rate) {
          return -1;
        }
        if (a.rating.rate === b.rating.rate) {
          return 0;
        }
        return 1;
      });
      this.setState({ data: sorted, activeSorting: "Rating" });
    };

    const sortNone = () => {
      this.setState({ data: this.state.fetchedData, activeSorting: "None" });
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
              original={this.state.fetchedData}
              filtered={filtered}
              allProducts={allProducts}
            />
            <div className="row g-3 justify-content-center">
              <div className="col-12 col-sm-2">
                <Category
                  fetchedData={this.state.fetchedData}
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
                <PostForm />
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
                <Pagination
                  itemCount={this.state.data.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageClicked={this.handlePageClicked}
                />
              </div>
              <Offcanvas
                products={this.state.addCart}
                removeItem={removeItem}
                cartTotal={cartTotal}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
