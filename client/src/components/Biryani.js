import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";

export default function Biryani({ biryani }) {
  const [quantity, setQuantity] = useState(1);
  const [varient, setVarient] = useState("mini");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const addtocart = () => {
    dispatch(addToCart(biryani, quantity, varient));
  };

  // Price calculation with ₹ symbol
  const getPrice = () => {
    return `₹${biryani.prices[varient]}`;
  };

  return (
    <div className="shadow-lg p-3 mb-5 bg-white rounded position-relative">
      {/* Sold Out Badge - Positioned Absolutely */}
      <div 
        className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 m-2 rounded"
        style={{ zIndex: 1 }}
      >
        Sold Out
      </div>

      <div onClick={handleShow} style={{ cursor: 'pointer' }}>
        <h5 className="text-center mb-3">{biryani.name}</h5>
        <div className="text-center">
          <img
            src={biryani.image}
            className="img-fluid rounded"
            style={{ height: "200px", width: "200px", objectFit: "cover" }}
            alt={biryani.name}
          />
        </div>
      </div>

      <div className="mt-3">
        <div className="row mb-3">
          <div className="col-6">
            <p className="mb-1 fw-bold">Variants</p>
            <select
              className="form-select form-select-sm"
              value={varient}
              onChange={(e) => setVarient(e.target.value)}
            >
              {biryani.varients.map((variant) => (
                <option key={variant} value={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <p className="mb-1 fw-bold">Quantity</p>
            <select
              className="form-select form-select-sm"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {[...Array(10).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>{x + 1}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <h4 className="m-0">{getPrice()}</h4>
          
        <button 
            className="btn btn-primary"
            onClick={addtocart} // Function is now used
            disabled={!biryani.isAvailable}
        >
          {biryani.isAvailable ? 'ADD TO CART' : 'SOLD OUT'}
        </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{biryani.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <img 
                src={biryani.image} 
                className="img-fluid rounded"
                style={{width: '100%', height: '300px', objectFit: 'cover'}}
                alt={biryani.name}
              />
            </div>
            <div className="col-md-6">
              <h4>Description</h4>
              <p>{biryani.description}</p>
              <h4>Category</h4>
              <p className="text-capitalize">{biryani.category}</p>
              <div className="badge bg-danger">Sold Out</div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}