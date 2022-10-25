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

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/professionals" element={<Professionals />} /> */}
        <Route path="/professionals">
          <Route path="" element={<Professionals />} />
          <Route path="questions" element={<ProQuestion />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
