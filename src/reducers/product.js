import * as ActionType from '../constants/ActionType'

var initialState = {
  products: [
    {
      "_id": "1",
      "title": "Nike Shoes 01",
      "src": "https://hc.com.vn/i/ecommerce/media/GS.001443_FEATURE_49347.jpg",
      "description": "dien thoai oppo",
      "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      "price": 3900000,
      "colors": ["blue", "cyan", "crimson", "teal"],
      "count": 1
    },
    {
      "_id": "2",
      "title": "Nike Shoes 02",
      "src": "https://cf.shopee.vn/file/0f79921b7fb9a2bcc24f083fcfc69e41",
      "description": "dien thoai oppo",
      "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      "price": 6999999,
      "colors": ["red", "black", "crimson", "teal"],
      "count": 1
    },
    {
      "_id": "3",
      "title": "Nike Shoes 03",
      "src": "https://cdn.tgdd.vn/Products/Images/42/217936/samsung-galaxy-s20-plus-600x600-fix-600x600.jpg",
      "description": "dien thoai oppo",
      "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      "price": 17500000,
      "colors": ["pink", "black", "yellow", "teal"],
      "count": 1
    },
    {
      "_id": "4",
      "title": "Nike Shoes 04",
      "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRP33kM9M4tSutDX3gULBDj22tvp-dD5v4IkA&usqp=CAU",
      "description": "dien thoai oppo",
      "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      "price": 10000000,
      "colors": ["black", "cyan", "crimson", "teal"],
      "count": 1
    },
    {
      "_id": "5",
      "title": "Nike Shoes 05",
      "src": "https://didongviet.vn/pub/media/catalog/product//d/i/dien-thoai-oppo-a92_1_1.jpg",
      "description": "dien thoai oppo",
      "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      "price": 8000000,
      "colors": ["blue", "cyan", "crimson", "teal"],
      "count": 1
    },
    {
      "_id": "6",
      "title": "Nike Shoes 06",
      "src": "https://cdn.nguyenkimmall.com/images/detailed/648/10045480_dien-thoai-samsung-a31-xanh-1.jpg",
      "description": "dien thoai oppo",
      "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      "price": 9000000,
      "colors": ["red", "black", "crimson", "teal"],
      "count": 1
    },
    {
      "_id": "7",
      "title": "Nike Shoes 07",
      "src": "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/391720663.jpeg",
      "description": "dien thoai oppo",
      "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      "price": 7000000,
      "colors": ["pink", "black", "yellow", "teal"],
      "count": 1
    },
    {
      "_id": "8",
      "title": "Nike Shoes 08",
      "src": "https://didongviet.vn/pub/media/catalog/product//h/u/huawei-y7-pro-xanh-didongviet.jpg",
      "description": "dien thoai oppo",
      "content": "alisosfvsav vsdvsvsvv eemsbsmbsb",
      "price": 12000000,
      "colors": ["black", "cyan", "crimson", "teal"],
      "count": 1
    }
  ],
  cart: [],
  total: 0
}

const product = (state = initialState, action) => {
  state.cart = (componentDidMount().dataCart() || [])
  state.total = (componentDidMount().dataTotal() || 0)
  switch (action.type) {
    case ActionType.addCart:
      state = addCart(action.id, state)
      componentDidUpdate(state)
      return { ...state }
    case ActionType.increase:
      state = increase(action.id, state)
      componentDidUpdate(state)
      return { ...state }
    case ActionType.reduction:
      state = reduction(action.id, state)
      componentDidUpdate(state)
      return { ...state }
    case ActionType.removeProduct:
      state = removeProduct(action.id, state)
      componentDidUpdate(state)
      return { ...state }
    default:
      return { ...state }
  }
}

var componentDidUpdate = (state) => {
  localStorage.setItem('dataCart', JSON.stringify(state.cart))
  localStorage.setItem('dataTotal', JSON.stringify(state.total))
}

var componentDidMount = () => ({
  dataCart: () => {
    const dataCart = JSON.parse(localStorage.getItem('dataCart'));
    if (dataCart !== null) {
      return dataCart
    }
  },
  dataTotal: () => {
    const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
    if (dataTotal !== null) {
      return dataTotal
    }
  }
})

var addCart = (id, state) => {
  const { products, cart } = state;
  const check = cart.every(item => {
    return item._id !== id;
  })
  //console.log(check)// kiem tra neu chon 2 lan sf thi no se tang len 2 o trong gio hang

  if (check) {
    const data = products.filter(product => {
      return product._id === id;
    })
    return {
      products: [...state.products],
      cart: [...cart, ...data],
      total: state.total
    }
  } else {
    alert("The product has been added to cart.")
    return state
  }
}

var increase = (id, state) => {
  const cart = state.cart;
  cart.forEach(item => {
    if (item._id === id) {
      item.count += 1;
    }
  })
  state = getTotal(state)
  return state
}

var reduction = (id, state) => {
  const cart = state.cart;
  cart.forEach(item => {
    if (item._id === id) {
      item.count === 1 ? item.count = 1 : item.count -= 1;
    }
  })
  state = getTotal(state)
  return state
}

var removeProduct = (id, state) => {
  if (window.confirm("Do you want to delete this product?")) {
    const cart = state.cart;
    cart.forEach((item, index) => {
      if (item._id === id) {
        cart.splice(index, 1)
      }
    })
    state = getTotal(state)
    return state
  }
}

var getTotal = (state) => {
  const cart = state.cart;
  const res = cart.reduce((prev, item) => {
    return prev + (item.price * item.count);
  }, 0)
  state.total = res
  return state
}

export default product;