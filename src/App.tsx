import {BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import CampaignDetail from './components/CampaignDetail/CampaignDetail'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import CertificationItems from './components/CertificationItems/CertificationItems'
import AccessItems from './components/AccessItemsDetails/AccessItemsDetails'

function App() {
 
 return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/campaign/:id" element={<CampaignDetail/>} />
        <Route path="/certification/:id" element={<CertificationItems/>}/>
        <Route path="/certification/:certificationId/accessItems/:id" element={<AccessItems/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
