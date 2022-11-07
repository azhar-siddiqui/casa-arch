import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import ProLandingAfterLogin from "./screens/ProLandingAfterLogin/ProLandingAfterLogin";
import ProfessionalProfile from "./screens/ProfessionalProfile/ProfessionalProfile";
import PrivateRoutes from "./screens/PrivateRoute/PrivateRoutes";
import Leads from "./screens/Leads/Leads";
import LeadListing from "./screens/Leads/LeadListing/LeadListing.jsx";
// import ProQuestion from "./screens/ProQuestion/ProQuestion.jsx";
function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [screenWidth]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {screenWidth < 1024 ? (
          <Route path="/leads" element={<LeadListing />} />
        ) : (
          <Route path="/leadsListing/:id" element={<Leads />} />
        )}
        <Route path="/leadsListing/:id" element={<Leads />} />
        {/* <Route path="/pro_question" element={<ProQuestion />} /> */}
        <Route path="/professionals">
          <Route path="" element={<Professionals />} />
          <Route path="questions" element={<ProQuestion />} />
          <Route element={<PrivateRoutes />}>
            <Route path="landing" element={<ProLandingAfterLogin />} />
            <Route path="myprofile" element={<ProfessionalProfile />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="list" element={<ProfessionalsList />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
