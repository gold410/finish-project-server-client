import './App.css';
import Login from './featuers/auth/login';
import Register from './featuers/auth/register';
import AddProductForm from './featuers/product/addProductForm';
import UpdateProductForm from './featuers/product/updateProductForm';
import ProductList from './featuers/product/productList'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import Layout from './commponents/Layout'
import BasketList from './featuers/basket/basketList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pay from './featuers/pay/pay';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { loadBasket } from './featuers/basket/basketSlice';
import Sale from './featuers/sale/sale';
// import Update from './featuers/update/update';

function App() {
  //שומר את הסל קניות אחרי טעינה
  const dispatch=useDispatch()
  useEffect(()=>{
  dispatch(loadBasket())
  },[dispatch])

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<ProductList/>}/>
          <Route path='/add-product-form' element={<AddProductForm/>}/>
          <Route path='/update-product-form' element={<UpdateProductForm/>}/>
          <Route path='/product-list' element={<ProductList/>}/>
          <Route path='/basket' element={<BasketList/>}/>
          <Route path='/pay' element={<Pay/>}/>
          <Route path='/sale' element={<Sale/>}/>
          {/* <Route path='/update' element={<Update/>}/> */}
        </Route>
      </Routes>
    </Router>

    <ToastContainer position="top-right" autoClose={2000} />

    </div>
  );
}
export default App;
