import React, { Component } from "react";
import "./shopping-cart.css";
import Divider from "@material-ui/core/Divider";
import { Button } from "react-bootstrap";

class shoppingCart extends Component {
  state = {
    requests: [
      { id: "1", name: " استخراج شهادة القيد", price: "50 LE" },
      { id: "2", name: "استخراج درجات المواد ", price: "70 LE" },
      { id: "3", name: " استخراج شهادة القيد", price: "50 LE" },
      { id: "4", name: "استخراج درجات المواد ", price: "70 LE" },
      { id: "5", name: " استخراج شهادة القيد", price: "50 LE" },
      { id: "6", name: "استخراج درجات المواد ", price: "70 LE" },
      { id: "7", name: " استخراج شهادة القيد", price: "50 LE" },
      { id: "8", name: "استخراج درجات المواد ", price: "70 LE" },
      { id: "9", name: " استخراج شهادة القيد", price: "50 LE" },
      { id: "10", name: "استخراج درجات المواد", price: "70 LE" }
    ],
    requestsIds: [1, 2, 3, 4, 5, 6]
  };

  handleDeleteRequest(requestId) {
    const requestsIds = this.state.requestsIds.filter(r => r !== requestId);
    this.setState({ requestsIds: requestsIds });
  } /*handleNewRequest(requestId) {
    this.setState({ requestsIds: this.props.requestsIds });
  }*/

  render() {
    return (
      <div className="cart-container">
        <div id="cart-title-container">
          <h2 id="cart-title">الطلبات</h2>
        </div>
        {/*<Divider id="cart-divider" />*/}
        <div id="cart-items-container">
            
          {this.state.requestsIds.length == 0 ? (
            <h2 id="cart-title" style={{ textAlign: "center" }}>
                    ...العربة فارغة     
            </h2>
          ) : (
            this.state.requestsIds.map(requestId => (
              <div id="cart-item">
                <button
                  className="btn btn-outline-danger btn-sm"
                  id="cart-item-button"
                  onClick={() => this.handleDeleteRequest(requestId)}
                >
                  x
                </button>
                <span id="cart-item-price">
                  {this.state.requests[requestId - 1].price}
                </span>
                <span id="cart-item-title">
                  {this.state.requests[requestId - 1].name}
                </span>
                {/*<span id="cart-item-title">طلب</span>*/}
                <Divider orientation="vertical" flexItem />
                <span class="badge badge-warning" id="cart-item-number">
                  ١
                </span>
                      
              </div>
            ))
          )}
        </div>
        {/*<Divider id="cart-item-divider" />*/}
        <button id="cart-button" class="btn btn-success">
            Checkout
        </button>
              
      </div>
    );
  }
}

export default shoppingCart;
