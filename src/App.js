import { useState } from 'react';
import './App.css';
import Navigation from './component/Navigation';
import Header from './component/Header';
function App() {
  const [cartValue,setCartValue]=useState(0);
  const [toggle1,setToggle1]=useState(false);
  const [toggle2,setToggle2]=useState(false);
  const [toggle3,setToggle3]=useState(false);

  return <>
    <div>
      <Navigation data={cartValue}/>
      <Header/>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <div className="col mb-5">
                        <div className="card h-100">
                            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder">iPhone 13 Pro Max</h5>
                                    Rs. 1,37,000
                                </div>
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center">
                                  {
                                  toggle1?<button className="btn btn-outline-dark mt-auto" onClick={()=>{
                                    setCartValue(cartValue-1)
                                    setToggle1((previous)=>!previous)
                                  }}>Remove</button>:
                                  <button className="btn btn-outline-dark mt-auto" onClick={()=>{
                                      setCartValue(cartValue+1)
                                      setToggle1((previous)=>!previous)
                                  }} >Add to Cart</button>
                                  
                                }
                                </div>
                            </div>
                        </div>
            </div>

            <div className="col mb-5">
                        <div className="card h-100">
                            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder">iPhone 11</h5>
                                    Rs. 45,000
                                </div>
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center">
                                  {
                                  toggle2?<button className="btn btn-outline-dark mt-auto" onClick={()=>{
                                    setCartValue(cartValue-1)
                                    setToggle2((previous)=>!previous)
                                  }}>Remove</button>:
                                  <button className="btn btn-outline-dark mt-auto" onClick={()=>{
                                      setCartValue(cartValue+1)
                                      setToggle2((previous)=>!previous)
                                  }} >Add to Cart</button>
                                  
                                }
                                </div>
                            </div>
                        </div>
            </div>

            <div className="col mb-5">
                        <div className="card h-100">
                            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder">iPhone 13 Mini</h5>
                                    Rs. 72,000
                                </div>
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center">
                                  {
                                  toggle3?<button className="btn btn-outline-dark mt-auto" onClick={()=>{
                                    setCartValue(cartValue-1)
                                    setToggle3((previous)=>!previous)
                                  }}>Remove</button>:
                                  <button className="btn btn-outline-dark mt-auto" onClick={()=>{
                                      setCartValue(cartValue+1)
                                      setToggle3((previous)=>!previous)
                                  }} >Add to Cart</button>
                                  
                                }
                                </div>
                            </div>
                        </div>
            </div>
            </div>
          </div>
        </section>

      <footer className="py-5 bg-dark">
            <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Your Website 2022</p></div>
        </footer>
    </div>
  </>
}

export default App;
