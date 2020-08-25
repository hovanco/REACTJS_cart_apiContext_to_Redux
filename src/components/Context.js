import React, { Component } from 'react';

export const DataContext = React.createContext();

export class DataProvider extends Component {
  state = {
    products: [
      // {
      //   "_id": "1",
      //   "title": "Nike Shoes 01",
      //   "src": "https://hc.com.vn/i/ecommerce/media/GS.001443_FEATURE_49347.jpg",
      //   "description": "dien thoai oppo",
      //   "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      //   "price": 7657,
      //   "colors": ["blue","cyan", "crimson","teal"],
      //   "count": 1
      // },
      // {
      //   "_id": "2",
      //   "title": "Nike Shoes 02",
      //   "src": "https://cf.shopee.vn/file/0f79921b7fb9a2bcc24f083fcfc69e41",
      //   "description": "dien thoai oppo",
      //   "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      //   "price": 7657,
      //   "colors": ["red","black", "crimson","teal"],
      //   "count": 1
      // },
      // {
      //   "_id": "3",
      //   "title": "Nike Shoes 03",
      //   "src": "https://cdn.tgdd.vn/Products/Images/42/217936/samsung-galaxy-s20-plus-600x600-fix-600x600.jpg",
      //   "description": "dien thoai oppo",
      //   "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      //   "price": 7657,
      //   "colors": ["pink","black", "yellow","teal"],
      //   "count": 1
      // },
      
      // {
      //   "_id": "4",
      //   "title": "Nike Shoes 04",
      //   "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRP33kM9M4tSutDX3gULBDj22tvp-dD5v4IkA&usqp=CAU",
      //   "description": "dien thoai oppo",
      //   "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      //   "price": 7657,
      //   "colors": ["black","cyan", "crimson","teal"],
      //   "count": 1
      // },
      // {
      //   "_id": "5",
      //   "title": "Nike Shoes 05",
      //   "src": "https://didongviet.vn/pub/media/catalog/product//d/i/dien-thoai-oppo-a92_1_1.jpg",
      //   "description": "dien thoai oppo",
      //   "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      //   "price": 7657,
      //   "colors": ["blue","cyan", "crimson","teal"],
      //   "count": 1
      // },
      // {
      //   "_id": "6",
      //   "title": "Nike Shoes 06",
      //   "src": "https://cdn.nguyenkimmall.com/images/detailed/648/10045480_dien-thoai-samsung-a31-xanh-1.jpg",
      //   "description": "dien thoai oppo",
      //   "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      //   "price": 7657,
      //   "colors": ["red","black", "crimson","teal"],
      //   "count": 1
      // },
      // {
      //   "_id": "7",
      //   "title": "Nike Shoes 07",
      //   "src": "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/391720663.jpeg",
      //   "description": "dien thoai oppo",
      //   "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      //   "price": 7657,
      //   "colors": ["pink","black", "yellow","teal"],
      //   "count": 1
      // },
      // {
      //   "_id": "8",
      //   "title": "Nike Shoes 08",
      //   "src": "https://didongviet.vn/pub/media/catalog/product//h/u/huawei-y7-pro-xanh-didongviet.jpg",
      //   "description": "dien thoai oppo",
      //   "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      //   "price": 7657,
      //   "colors": ["black","cyan", "crimson","teal"],
      //   "count": 1
      // }
    ],
    cart: [],
    total: 0
  }

  addCart = (id) => {
    const {products, cart} = this.state;

    const check = cart.every(item =>{
      return item._id !== id;
    })

    //console.log(check)// kiem tra neu chon 2 lan sf thi no se tang len 2 o trong gio hang

    if(check){
      const data = products.filter(product =>{
        return product._id === id;
      })
      this.setState({cart: [...cart,...data]})
    }else{
      alert("The product has been added to cart.")
    }
  };


  reduction = (id) =>{
    const {cart} = this.state;
    cart.forEach(item =>{
      if(item._id === id){
        item.count === 1 ? item.count = 1 : item.count -= 1;
      }
    })
    this.setState({cart: cart});
    this.getTotal();

  }

  increase = (id) => {
    const {cart} = this.state;
    cart.forEach(item =>{
      if(item._id === id){
        item.count +=1;
      }
    })
    this.setState({cart: cart});
    this.getTotal();
  }

  removeProduct = (id) => {
    if(window.confirm("Do you want to delete this product?")){
      const {cart} = this.state;
      cart.forEach((item,index)=>{
        if(item._id === id){
          cart.splice(index, 1)
        }
      })
      this.setState({cart: cart});
      this.getTotal();
    }
  }

  getTotal = () =>{
    const {cart} = this.state;
    const res = cart.reduce((prev, item) => {
      return prev + (item.price * item.count);
    },0)
    this.setState({total: res})
  }

  componentDidUpdate(){
    localStorage.setItem('dataCart',JSON.stringify(this.state.cart))
    localStorage.setItem('dataTotal',JSON.stringify(this.state.total))
  }

  componentDidMount(){
    const dataCart = JSON.parse(localStorage.getItem('dataCart'));
    if(dataCart !== null){
      this.setState({cart: dataCart});
    }

    const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
    if(dataTotal !== null){
      this.setState({total: dataTotal});
    }
  }

  render() {
    const {products, cart, total} = this.state;
    const {addCart, reduction, increase, removeProduct, getTotal} = this;
    return (
      <DataContext.Provider value={{products, addCart, cart, reduction, increase, removeProduct, total, getTotal}}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}
export default DataProvider;