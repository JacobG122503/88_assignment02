import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { Products } from "./Products";
import { Categories } from "./Categories";





const App = () => {

  const [viewer, setViewer] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [paymentInfo, setPaymentInfo] = useState({});
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };


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
                <button type="button" variant="light" onClick={() => addToCart(product)}> + </button>
              </center>
            </div>
          </div>
        ))}
        <p><br/><br/></p>
      </div>
    </div>
  }; // end render_products

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      <img class="img-fluid" src={el.image} width={150} />
      {el.title}     
      <div style={{textAlign: "right", fontSize: "20px"}}> ${el.price} </div>
    </div>
  ));

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

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
  
    //Category tag function
    function handleClick(tag) {

      if (tag === "no tag") {
        setProductsCategory(Products);
        return;
      }

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
            <h1 className="text-3xl mb-2 font-bold text-white">Assignment 2 Store</h1>
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
              <button className="inline-block bg-amber-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2" id="homeButton" onClick={() => { handleClick("no tag") }}>No Tag</button>
              {Categories.map(tag => <button key={tag} className="inline-block bg-amber-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2" id="homeButton" onClick={() => { handleClick(tag) }}>{tag}</button>)}
              <br/><br/><br/><br/><br/><br/><br/>
              <br/><br/><br/><br/><br/><br/><br/>
              <button className="block bg-amber-600 rounded-full px-4 py-2 text-lg font-semibold text-gray-700 mx-auto mt-5" id="cartButton" onClick={() => setViewer(1)}>Cart</button>
            </div>
          </div>
        </div>
        <div className="ml-5 p-10 xl:basis-4/5">
          {console.log("Before render :", Products.length, ProductsCategory.length)}
          {render_products(ProductsCategory)}
        </div>
      </div>
    );
  
    
  } // viewer = 0

  function Cart() {
   
    const onSubmit = (data) => {
      // update hooks
      setPaymentInfo(data);
      setViewer(2);
    };

    const cartReturn = () => {
      setViewer(0);
      setPaymentInfo({});
    }

    return (
      <div>
        <button onClick={cartReturn} className="btn btn-primary">Return</button>
        <div>{cartItems}</div>
        <br />
        <div style={{textAlign: "right", fontSize: "20px", fcolor: "red"}}>Total: ${cartTotal}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
          <div className="form-group">
            <p>Full Name</p>
            <input
              {...register("fullName", { required: true })}
              placeholder="" className="form-control"
            />
            {errors.fullName && <p className="text-danger">Full Name is required.</p>}
          </div>

          <div className="form-group">
            <p>Email</p>
            <input
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="" className="form-control"
            />
            {errors.email && <p className="text-danger">Email is required.</p>}
          </div>

          <div className="form-group">
            <p>Credit Card</p>
            <input
              {...register("creditCard", { required: true, minLength: 19, maxLength: 19 })}
              placeholder="XXXX-XXXX-XXXX-XXXX" className="form-control"
            />
            {errors.creditCard && <p className="text-danger">Credit Card is required. Include dashes.</p>}
          </div>

          <div className="form-group">
            <p>Address</p>
            <input
              {...register("address", { required: true })}
              placeholder="1234 Main St" className="form-control"
            />
            {errors.address && <p className="text-danger">Address is required.</p>}
          </div>

          <div className="form-group">
            <p>Address 2</p>
            <input {...register("address2")} placeholder="Apartment, Studio, or Floor" className="form-control" />
          </div>

          <div className="form-group">
            <p>City</p>
            <input
              {...register("city", { required: true })}
              placeholder="" className="form-control"
            />
            {errors.city && <p className="text-danger">City is required.</p>}
          </div>

          <div className="form-group">
            <p>State</p>
            <input
              {...register("state", { required: true })}
              placeholder="" className="form-control"
            />
            {errors.state && <p className="text-danger">State is required.</p>}
          </div>

          <div className="form-group">
            <p>Zip</p>
            <input {...register("zip", { required: true, minLength: 5, maxLength: 5 })} placeholder="12345" className="form-control"/>
            {errors.zip && <p className="text-danger">Zip is required.</p>}
          </div>

          <button type="submit" className="btn btn-primary">Order</button>
        </form>
      </div>
    );
  } //viewer = 1

  function Confirmation() {
    const updateHooks = () => {
      setViewer(0);
      setPaymentInfo({});
    };

    return (
      <div>
        <h1>Payment Summary</h1>
        <div>{cartItems}</div>
        <br />
        <div style={{textAlign: "right", fontSize: "20px", fcolor: "red"}}>Total: ${cartTotal}</div>
        <h3>{paymentInfo.fullName}</h3>
        <p>{paymentInfo.email}</p>
        <p>{paymentInfo.creditCard}</p>
        <p>
          {paymentInfo.address}
          {paymentInfo.address2}
        </p>
        <p>
          {paymentInfo.city},{paymentInfo.state} {paymentInfo.zip}{" "}
        </p>

        <button onClick={updateHooks} className="btn btn-secondary">Submit</button>
      </div>
    );
  } //viewer = 2

  return (<div id="return">
    {viewer === 0 && <Browse />}
    {viewer === 1 && <Cart />}
    {viewer === 2 && <Confirmation />}
  </div>)
};

export default App;
