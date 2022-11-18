import "./App.css";
import { useEffect, useState } from "react";
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
import {
  updateIsLoggedIn,
  updateUserId,
  updateUserType,
} from "./app/slices/user";
import { useDispatch } from "react-redux";

import ProLandingAfterLogin from "./screens/ProLandingAfterLogin/ProLandingAfterLogin";
import ProfessionalProfile from "./screens/ProfessionalProfile/ProfessionalProfile";
import PrivateRoutes from "./screens/PrivateRoute/PrivateRoutes";
import Leads from "./screens/Leads/Leads";
import LeadListing from "./screens/Leads/LeadListing/LeadListing.jsx";
import {
  useLazyGetUserIdQuery,
  useLazyGetUserTypeQuery,
} from "./app/services/userServices";
import DashboardLeads from "./screens/ProfessionalDashboardLeads/DashboardLeads";
import SingleProfile from "./screens/SingleProfile/SingleProfile";
import { SingleBlog } from "./screens/SingleBlog/SingleBlog";
import { Services } from "./screens/Services/Services";
import SingleService from "./screens/SingleService/SingleService";
// import ProQuestion from "./screens/ProQuestion/ProQuestion.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let Token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();

  const [fetchUserId, result] = useLazyGetUserIdQuery();
  const [fetchUserType, userTypeFetched] = useLazyGetUserTypeQuery();

  useEffect(() => {
    setLoading(true);
    if (sessionStorage.getItem("access")) {
      fetchUserId().then((res) => {
        dispatch(updateUserId(res.data["user-id"]));
      });
      fetchUserType().then((res) => {
        dispatch(updateUserType(res.data["user-type"]));
        dispatch(updateIsLoggedIn(true));
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [screenWidth]);

  if (loading) return <></>;

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:id" element={<SingleService />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {screenWidth < 1024 ? (
          <Route path="/leads" element={<LeadListing />} />
        ) : (
          <Route path="/leadsListing/:id" element={<Leads />} />
          // <Route path="/leadsListing" element={<Leads />} />
        )}
        <Route path="/leadsListing/:id" element={<Leads />} />
        <Route path="/professionals/list" element={<ProfessionalsList />} />
        <Route path="/professionals/list/:id" element={<SingleProfile />} />
        <Route path="/professionals">
          <Route path="" element={<Professionals />} />
          {/* <Route path="/pro_question" element={<ProQuestion />} /> */}
          <Route path="questions" element={<ProQuestion />} />
          <Route path="dashboardleads" element={<DashboardLeads />} />
          <Route element={<PrivateRoutes />}>
            <Route path="landing" element={<ProLandingAfterLogin />} />
            <Route path="myprofile" element={<ProfessionalProfile />} />
            {/* <Route path="profile/:id" element={<Profile />} /> */}
          </Route>
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
