import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";

export default function Cartscreen() {
    const cartstate = useSelector(state => state.cartReducer);
    const cartItems = cartstate.cartItems;
    const dispatch = useDispatch();

    const subtotal = cartItems.reduce((x, item) => x + item.price, 0);

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title mb-4">My Cart ({cartItems.length} items)</h2>
                            
                            {cartItems.length === 0 ? (
                                <div className="text-center py-4">
                                    <h4>Your cart is empty</h4>
                                    <a href="/" className="btn btn-primary mt-3">Continue Shopping</a>
                                </div>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item._id} className="card mb-3">
                                        <div className="card-body">
                                            <div className="row align-items-center">
                                                <div className="col-md-2">
                                                    <img 
                                                        src={item.image} 
                                                        className="img-fluid rounded"
                                                        alt={item.name}
                                                        style={{ maxHeight: '80px', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <h5 className="mb-1">{item.name}</h5>
                                                    <p className="text-muted mb-0">Variant: {item.varient}</p>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="d-flex align-items-center">
                                                        <button 
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() => dispatch(addToCart(item, item.quantity - 1, item.varient))}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <i className="fa fa-minus"></i>
                                                        </button>
                                                        <span className="mx-2">{item.quantity}</span>
                                                        <button 
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={() => dispatch(addToCart(item, item.quantity + 1, item.varient))}
                                                            disabled={item.quantity >= 10}
                                                        >
                                                            <i className="fa fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <p className="mb-0">₹{item.price.toFixed(2)}</p>
                                                </div>
                                                <div className="col-md-1">
                                                    <button 
                                                        className="btn btn-link text-danger"
                                                        onClick={() => dispatch(deleteFromCart(item))}
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title mb-3">Order Summary</h4>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Items Total</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Delivery Fee</span>
                                <span>₹40.00</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                                <strong>Total Amount</strong>
                                <strong>₹{(subtotal + 40).toFixed(2)}</strong>
                            </div>
                            <Checkout subtotal={subtotal + 40} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}