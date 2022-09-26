import React from "react"
import "./checkout.styles.scss"

import { useContext } from "react"

import { CartContext } from "../../context/cart.context"

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart } =
    useContext(CartContext)

  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id, name, quantity } = cartItem
        return (
          <div key={id}>
            <h2>{name}</h2>
            <span>{quantity}</span>
            <span onClick={() => addItemToCart(cartItem)}>
              increment
            </span>
            <br />
            <span
              onClick={() => removeItemFromCart(cartItem)}
            >
              decrement
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default Checkout
