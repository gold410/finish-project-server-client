import './App.css';
import Login from './featuers/auth/login';
import Register from './featuers/auth/register';
import AddProductForm from './featuers/product/addProductForm';
import UpdateProductForm from './featuers/product/updateProductForm';
import ProductList from './featuers/product/productList'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import Layout from './commponents/Layout'

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/home' element={<ProductList/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/add-product-form' element={<AddProductForm/>}/>
          <Route path='/update-product-form' element={<UpdateProductForm/>}/>
          <Route path='/product-list' element={<ProductList/>}/>
        </Route>
      </Routes>
    </Router>
    </div>
  );
}
export default App;
