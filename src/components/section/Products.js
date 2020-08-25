import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../Context';
import '../css/Product.css';
import { connect } from 'react-redux';
import { actAddCart } from '../../actions/action'

class Products extends Component {

  static contextType = DataContext;

  render() {
    return (
      <div id="product">
        { this.getProduct(this.props.product) }
      </div>
    )
  }

  getProduct = (products = []) => {
    let product = ''
    product = products.map(product => (
      <div className="card" key={product._id}>
        <Link to={`/product/${product._id}`}>
          <img src={product.src} alt="" />
        </Link>
        <div className="content">
          <h3><Link to={`/product/${product._id}`}>{product.title}</Link> </h3>
          <span>${product.price}</span>
          <p>{product.description}</p>
          <button onClick={() => this.props.addCart(product._id)}>Add to cart</button>
        </div>
      </div>
    ))
    return product
  }
  
}

const mapStateToProps = state => {
  return {
    product: state.product.products
  }
}

const mapDispathToProps = dispatch => {
  return {
    addCart: (id) => {
      dispatch(actAddCart(id))
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Products);
