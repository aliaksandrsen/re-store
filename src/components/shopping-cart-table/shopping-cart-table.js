import React from 'react';
import './shopping-cart-table.css';
import { connect } from 'react-redux';
import {
  bookAddedToCart, 
  bookRemoveFromCart,
  allBooksRemoveFromCart,
} from '../../actions'

const ShoppingCartTable = ({ items, total, onIncrice, onDecrease, onDelete }) => {

  const renderRow = (item, index) => {
    const { id, title, count, total } = item;

    return (
      <tr key={id}>
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>{count}</td>
        <td>{total}</td>
        <td>
          <button
            onClick={() => onDelete(id)}
            className="btn btn-outline-danger btn-sm float-right">
            <i className="fa fa-trash-o" />
          </button>
          <button
            onClick={() => onDecrease(id)}
            className="btn btn-outline-success btn-sm float-right">
            <i className="fa fa-plus-circle" />
          </button>
          <button
            onClick={() => onIncrice(id)}
            className="btn btn-outline-warning btn-sm float-right">
            <i className="fa fa-minus-circle" />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map(renderRow)}
        </tbody>
      </table>

      <div className="total">
        Total: {total}
      </div>
    </div>
  );
};

const mapStateToProps = ({ cartItems, orderTotal }) => {
  return {
    items: cartItems,
    total: orderTotal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrice: (id) => {
      dispatch(bookRemoveFromCart(id));
    },

    onDecrease: (id) => {
      dispatch(bookAddedToCart(id));
    },

    onDelete: (id) => {
      dispatch(allBooksRemoveFromCart(id));
    }
  }
};

// const mapDispatchToProps = {
//   onIncrice,
//   onDecrease,
//   onDelete,
// };

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
