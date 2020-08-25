import React, { Component } from 'react';
import {DataContext} from '../Context';
import {Link} from 'react-router-dom';
import Colors from './Colors';
import '../css/Details.css'
import { actAddCart } from '../../actions/action'
import { connect } from 'react-redux';

class Details extends Component {

  state = {
    product: []
  }

  getProduct = () => {
    if(this.props.match.params.id){
      const products = this.props.product.products;
      const res = products;
      const data = res.filter(item =>{
        return item._id === this.props.match.params.id
      })
      // console.log(data); kiem tra da ra duoc doi tuong cua 1 anh duoc click chon xem chi tiet
      this.setState({product:data})
    }
  }

  componentDidMount(){
    this.getProduct();
  }

  render() {
    const {product} = this.state;
    return (
      <>
        {
          product.map(item => (
            <div className="details" key={item._id}>
              <img src={item.src} alt="" />
              <div className="box">
                <div className="row">
                  <h2>{item.title}</h2>
                  <span>${item.price}</span>
                </div>
                <Colors colors={item.colors} />
                <p>{item.description}</p>
                <p>{item.content}</p>
                <Link to="/cart" className="cart" onClick={ () => this.props.addCart(item._id)}>
                  Add to cart
                </Link>
              </div>
            </div>
          ))
        }
      </>
      
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

const mapDispathToProps = dispatch => {
  return {
    addCart: (id) => {
      dispatch(actAddCart(id))
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Details);
