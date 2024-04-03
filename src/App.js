import "./App.css";
import React, { useState } from "react";
import { Products } from "./Products";
import { Categories } from "./Categories";

const render_products = (ProductsCategory) => {

  return <div className='category-section fixed'>
    {console.log("Step 3 : in render_products ")}
    <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>

    <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{ maxHeight: '800px', overflowY: 'scroll', minWidth: '1000px' }}>
      {/* Loop Products */}
      {ProductsCategory.map((product, index) => (
        <div key={index} className="group relative shadow-lg" >
          <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
            <img
              alt="Product Image"
              src={product.image}
              className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            />
          </div>
          <div className="flex justify-between p-3">
            <div>
              <h3 className="text-sm text-gray-700">
                <a href={product.href}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                </a>
                <p>Tag - {product.category}</p>
              </h3>
              <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate} ({product.rating.count})</p>
            </div>
            <p className="text-sm font-medium text-green-600">${product.price}</p>
          </div>
          <div id="plusminusbuttons">
            <center>
              <button type="button" variant="light" /*onClick={() => removeFromCart(el)}*/ > - </button>{" "}
              <button type="button" variant="light" /*</div>onClick={() => addToCart(el)}*/> + </button>
            </center>
          </div>
        </div>
      ))}
    </div>
  </div>
}; // end render_products

const App = () => {
  console.log("Step 1: Load Products in a useState.");

  const [query, setQuery] = useState('');
  const [ProductsCategory, setProductsCategory] = useState(Products);

  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log("Step 6 : in handleChange, Target Value :", e.target.value, " Query Value :", query);
    const results = Products.filter(eachProduct => {
      if (e.target.value === "") return ProductsCategory;
      return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setProductsCategory(results);
  }

  function handleClick(tag) {
    console.log("Step 4 : in handleClick", tag);
    let filtered = Products.filter(cat => cat.category === tag);
    // modify useState
    setProductsCategory(filtered);
    // ProductsCategory = filtered;
    console.log("Step 5 : ", Products.length, ProductsCategory.length);
  }

  console.log("Step 2: Return App :", Products.length, ProductsCategory.length);

  return (
    <div className="flex fixed flex-row">
      <div className="h-screen bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '65%' }}>
        {/* <img className="w-full" src={logo} alt="Sunset in the mountains" /> */}
        <div className="px-6 py-4">
          <h1 className="text-3xl mb-2 font-bold text-white">Assignment 2 Store </h1>
          <p className="text-gray-700 text-white">
            by - <b style={{ color: 'mediumseagreen' }}>Jacob Garcia and Kate Endersby</b>
          </p>
          <div className="py-10">
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500" type="search" value={query} onChange={handleChange} />
            <br />
            {Categories && <p className='text-white'>Tags : </p>}
            {Categories.map(tag => <button key={tag} className="inline-block bg-amber-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2" id="homeButton" onClick={() => { handleClick(tag) }}>{tag}</button>)}
          </div>
        </div>
      </div>
      <div className="ml-5 p-10 xl:basis-4/5">
        {console.log("Before render :", Products.length, ProductsCategory.length)}
        {render_products(ProductsCategory)}
      </div>
    </div>
  );
};

export default App;
