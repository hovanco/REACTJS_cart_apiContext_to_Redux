import React, { Component } from 'react';
import { DataContext } from '../Context';
import Colors from './Colors';
import '../css/Details.css';
import '../css/Cart.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actIncrease, actReduction , actRemoveProduct} from '../../actions/action'

export class Cart extends Component {

  static contextType = DataContext;

  componentDidMount() {
    // this.context.getTotal();
  }

  render() {

    const { cart, total } = this.props.product;

    if (cart.length === 0) {
      return <h2 style={{ textAlign: "center" }}>Your cart empty</h2>
    } else {
      return (
        <>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>image</th>
                <th>title</th>
                <th>price</th>
                <th>quantity</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {
                cart.map(item => (
                  <tr key={item._id}>
                    <td><img className="hinhanh" src={item.src} alt="" /></td>
                    <td>{item.title}</td>
                    <td>${item.price * item.count}</td>
                    <td>
                      <button className="count" onClick={() => this.props.reduction(item._id)}> - </button>
                      <span>{item.count}</span>
                      <button className="count" onClick={() => this.props.increase(item._id)}> + </button>
                    </td>
                    <td>
                      <button onClick={() => this.props.removeProduct(item._id)}> Delete </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
            <div className="total">
              <Link to="/payment">Payment</Link>
              <h3>Total: ${total}</h3>
            </div>
          </table>
        </>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

const mapDispathToProps = dispatch => {
  return {
    increase: (id) => {
      dispatch(actIncrease(id))
    },
    reduction: (id) => {
      dispatch(actReduction(id))
    },
    removeProduct: (id) => {
      dispatch(actRemoveProduct(id))
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Cart);
