import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home'
import User from './components/User'
import Admin from './components/Admin'
import Answers from './components/Answers'
// import { Navbar } from 'react-bootstrap'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import UserManagement from './components/UserManagement'
import AboutUs from './components/AboutUs'

function App() {

  return (
    <>
      {/* <Navbar/> */}
      {/* <Sidebar/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/answers/:queId" element={<Answers />} />
          <Route path="/allUser" element={<UserManagement />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
