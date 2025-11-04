import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import Member from './pages/Member'
import Blog from './pages/Blog'
import Discussions from './pages/Discussion'
import Home from './pages/Home'
import Footer from './components/Footer';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/discussions' element={<Discussions />}/>
        <Route path='/members' element={<Member />}/>
        <Route path='/blogs' element={<Blog />}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App