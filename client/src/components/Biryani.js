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

  // Calculate price based on variant
  const getPrice = () => {
    const variantPrice = biryani.prices.find(p => p.varient === varient);
    return variantPrice ? (variantPrice.price * quantity).toFixed(2) : 0;
  };

  return (
    <div className="biryani-card shadow-lg p-3 mb-5 bg-white rounded">
      <div onClick={handleShow} className="biryani-image-container">
        <h2 className="biryani-title">{biryani.name}</h2>
        <img
          src={biryani.image}
          className="img-fluid biryani-image"
          style={{ height: "200px", width: "200px", objectFit: "cover" }}
          alt={biryani.name}
        />
        {!biryani.isAvailable && (
          <div className="sold-out-badge">Sold Out</div>
        )}
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form-label">Variants</label>
          <select
            className="form-select"
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
        <div className="col-md-6">
          <label className="form-label">Quantity</label>
          <select
            className="form-select"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          >
            {[...Array(10).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>{x + 1}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <h3 className="mb-0">₹{getPrice()}</h3>
        <button 
          className="btn btn-primary"
          onClick={addtocart}
          disabled={!biryani.isAvailable}
        >
          {biryani.isAvailable ? 'ADD TO CART' : 'SOLD OUT'}
        </button>
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
              {biryani.isAvailable ? (
                <div className="badge bg-success">Available</div>
              ) : (
                <div className="badge bg-danger">Sold Out</div>
              )}
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