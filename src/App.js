import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Pagination from "./components/Pagination";
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Login from './components/Login'
import Header from "./components/Header";
import UpdateForm from "./components/UpdateForm";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles/style.css'
function App(props) {

  return (
    <>
    <Router>
    <div className="App">
  <Header />
  <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/update/:id' element={<UpdateForm />} />
          </Routes>
    </div>

    </Router>
    <ToastContainer />
 </>
  );
}

export default App;
