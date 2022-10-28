import "./App.css";
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
import PrivacyPolicy from "./screens/PrivacyPolicy/PrivacyPolicy";
import Terms from "./screens/Terms/Terms";
import RefundPolicy from "./screens/RefundPolicy/RefundPolicy";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/refund-and-return" element={<RefundPolicy />} />
        {/* <Route path="/professionals" element={<Professionals />} /> */}
        <Route path="/professionals">
          <Route path="" element={<Professionals />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="list" element={<ProfessionalsList />} />
          <Route path="questions" element={<ProQuestion />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
