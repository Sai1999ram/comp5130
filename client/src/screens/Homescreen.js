import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Biryani from "../components/Biryani";
import Loading from "../components/Loading";
import Error from "../components/Error";
import biryani from "../biryanidata";

export default function Homescreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setTimeout(() => {
      try {
        setItems(biryani);
        setFilteredItems(biryani);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }, 1000);
  }, []);

  // Filter items based on search and category
  useEffect(() => {
    let result = items;

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(result);
  }, [searchTerm, selectedCategory, items]);

  return (
    <div className="container py-4">
      {/* Search and Filter Section */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search biryanis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
            <option value="special">Special</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <h4>
          {filteredItems.length} {filteredItems.length === 1 ? 'Biryani' : 'Biryanis'} Available
        </h4>
      </div>

      {/* Main Content */}
      <div className="row">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error="Something went wrong" />
        ) : filteredItems.length === 0 ? (
          <div className="col-12 text-center py-5">
            <h3>No biryanis found matching your criteria</h3>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item._id || index}>
              <Biryani biryani={item} />
            </div>
          ))
        )}
      </div>

      {/* Back to Top Button */}
      <button 
        className="btn btn-primary position-fixed bottom-0 end-0 m-4"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ 
          display: window.pageYOffset > 100 ? 'block' : 'none',
          zIndex: 1000 
        }}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}