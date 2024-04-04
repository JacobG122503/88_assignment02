import "./App.css";
import React, { useState} from "react";
import { useForm } from "react-hook-form";
import { Products } from "./Products";
import { Categories } from "./Categories";

const render_products = (ProductsCategory) => {

  return <div className='category-section fixed'>
    {console.log("Step 3 : in render_products ")}
    <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>

    <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10" style={{ maxHeight: '800px', overflowY: 'scroll', minWidth: '1000px' }}>
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
      <p><br/><br/></p>
    </div>
  </div>
}; // end render_products



const App = () => {

  const [viewer, setViewer] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [dataF, setDataF] = useState({});

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

  

  function Browse() {
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
  
    
  } // viewer = 0

  function Cart() {
   
    const onSubmit = (data) => {
      // update hooks
      setDataF(data);
      setViewer(2);
    };

    const cartReturn = () => {
      setViewer(0);
      setDataF({});
    }

    return (
      <div>
        <button onClick={cartReturn} className="btn btn-primary">Return</button>
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
          <div className="form-group">
            <input
              {...register("fullName", { required: true })}
              placeholder="Full Name" className="form-control"
            />
            {errors.fullName && <p className="text-danger">Full Name is required.</p>}
          </div>

          <div className="form-group">
            <input
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="Email" className="form-control"
            />
            {errors.email && <p className="text-danger">Email is required.</p>}
          </div>

          <div className="form-group">
            <input
              {...register("creditCard", { required: true })}
              placeholder="Credit Card" className="form-control"
            />
            {errors.creditCard && <p className="text-danger">Credit Card is required.</p>}
          </div>

          <div className="form-group">
            <input
              {...register("address", { required: true })}
              placeholder="Address" className="form-control"
            />
            {errors.address && <p className="text-danger">Address is required.</p>}
          </div>

          <div className="form-group">
            <input {...register("address2")} placeholder="Address 2" className="form-control" />
          </div>

          <div className="form-group">
            <input
              {...register("city", { required: true })}
              placeholder="City" className="form-control"
            />
            {errors.city && <p className="text-danger">City is required.</p>}
          </div>

          <div className="form-group">
            <input
              {...register("state", { required: true })}
              placeholder="State" className="form-control"
            />
            {errors.state && <p className="text-danger">State is required.</p>}
          </div>

          <div className="form-group">
            <input {...register("zip", { required: true })} placeholder="Zip" className="form-control"/>
            {errors.zip && <p className="text-danger">Zip is required.</p>}
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  } //viewer = 1

  function Confirmation() {
    const updateHooks = () => {
      setViewer(0);
      setDataF({});
    };

    return (
      <div>
        <h1>Payment Summary</h1>
        <h3>{dataF.fullName}</h3>
        <p>{dataF.email}</p>
        <p>{dataF.creditCard}</p>
        <p>
          {dataF.address}
          {dataF.address2}
        </p>
        <p>
          {dataF.city},{dataF.state} {dataF.zip}{" "}
        </p>

        <button onClick={updateHooks} className="btn btn-secondary">Submit</button>
      </div>
    );
  } //viewer = 2

  return (<div>
    {viewer === 0 && <Browse />}
    {viewer === 1 && <Cart />}
    {viewer === 2 && <Confirmation />}
  </div>)
};

export default App;
