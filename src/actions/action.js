import * as ActionType from '../constants/ActionType'

export const actAddCart = (id) => {
  return {
    type: ActionType.addCart,
    id
  }
}

export const actGetProduct = () => {
  return {
    type: ActionType.getProduct,
  }
}

export const actIncrease = (id) =>{
  return {
    type: ActionType.increase,
    id
  }
}

export const actReduction = (id) =>{
  return {
    type: ActionType.reduction,
    id
  }
}

export const actRemoveProduct = (id) =>{
  return {
    type: ActionType.removeProduct,
    id
  }
}