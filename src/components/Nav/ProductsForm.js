import React, { useState } from 'react';

function ProductsForm() {

    const handleGetAllProducts = (e) => {
        e.preventDefault();
        
      };



  return (
    <div className="form">
      <form>

      <h2>Get All Products</h2>
        <button onClick={handleGetAllProducts}>Get All Products</button>
      </form>    

    </div>
  );
}

export default ProductsForm;
