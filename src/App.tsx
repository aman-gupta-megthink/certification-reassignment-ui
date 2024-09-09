import {BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import CampaignDetail from './components/CampaignDetail/CampaignDetail'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'

function App() {
 
 return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/campaign/:id" element={<CampaignDetail/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
