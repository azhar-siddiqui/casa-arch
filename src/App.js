import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Landing from "./screens/Home/Landing";
import Professionals from "./screens/ProfessionalsLanding/Professionals";
import ProQuestion from "./screens/ProQuestions/ProQuestion";
import AboutUs from "./screens/About/AboutUs";
import Blog from "./screens/Blog/Blog";
import Contact from "./screens/Contact/Contact";
import ProfessionalsList from "./screens/ProfessionalsList/ProfessionalsList";
import Profile from "./screens/Profile/Profile";
import Dashboard from "./screens/Dashboard/dashboard";
import PageNotFound from "./screens/PageNotFound/PageNotFound";
import PrivacyPolicy from "./screens/PrivacyPolicy/PrivacyPolicy";
import Terms from "./screens/Terms/Terms";
import RefundPolicy from "./screens/RefundPolicy/RefundPolicy";
import { updateIsLoggedIn } from "./app/slices/user";
import { useDispatch } from "react-redux";
import { useState } from "react";

import ProLandingAfterLogin from "./screens/ProLandingAfterLogin/ProLandingAfterLogin";
import ProfessionalProfile from "./screens/ProfessionalProfile/ProfessionalProfile";

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  let Token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(true)
    if (sessionStorage.getItem('access')) {
      dispatch(updateIsLoggedIn(true))
    }
    setLoading(false)
  }, [])

  if (loading) return <></>

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/professionals">
          <Route path="" element={<Professionals />} />
          <Route path="landing" element={<ProLandingAfterLogin />} />
          <Route path="myprofile" element={<ProfessionalProfile />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="list" element={<ProfessionalsList />} />
          <Route path="questions" element={<ProQuestion />} />
        </Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/refund-and-return" element={<RefundPolicy />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
