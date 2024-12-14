import React from "react";

export default function Loading() {
  return (
    <div className="loading-container d-flex justify-content-center align-items-center" 
      style={{ minHeight: '60vh' }}>
      <div className="text-center">
        <div 
          className="spinner-border text-primary" 
          role="status" 
          style={{
            height: '80px',
            width: '80px'
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="mt-3 text-primary">
          Loading...
        </div>
      </div>
    </div>
  );
}