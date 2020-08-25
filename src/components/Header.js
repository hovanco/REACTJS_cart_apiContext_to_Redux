import React, { Component } from 'react';
import CloseIcon from './svg/times-icon.svg';
import MenuIcon from './svg/bars-icon.svg';
import CartIcon from './svg/shopping-cart.svg';
import {Link} from 'react-router-dom';
import './css/Header.css';
import {DataContext} from './Context';
import { connect } from 'react-redux';

class Header extends Component {

  static contextType = DataContext;

  state = {
    toggle: false,
  }

  menuToggle = () => {
    this.setState({toggle: !this.state.toggle})
  }

  render() {
    const {toggle} = this.state;
    const {cart} = this.props.product;

    return (
      <header>
        <div className="menu" onClick={this.menuToggle}>
          <img src={MenuIcon} alt="" width="20" />
        </div>
        <div className="logo">
          <h1><Link to="/">Nike</Link></h1>
        </div>
        <nav>
          <ul className={ toggle ?  "toggle" : "" }>
            <li><Link to="/"> Home</Link></li>
            <li><Link to="/product"> Product</Link></li>
            <li><Link to="/contact"> Contact</Link></li>
            <li><Link to="/about"> About</Link></li>
            <li><Link to="/login"> Login / Register</Link></li>
            <li className="close" onClick={this.menuToggle}>
              <img src={CloseIcon} alt="" width="20" />
            </li>
          </ul>
          <div className="nav-cart">
            <span>{cart.length}</span>
            <Link to="/cart">
              <img src={CartIcon} alt="" width="20" />
            </Link>
          </div>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps, null)(Header);
