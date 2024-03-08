import './App.css';
import Header from "./components/common/header/Header"
import { BrowserRouter as Router ,Routes, Route } from "react-router-dom"
import About from "./components/about/About"
import CourseHome from "./components/allcourses/CourseHome"
import Team from "./components/team/Team"
import Pricing from "./components/pricing/Pricing"
import Blog from "./components/blog/Blog"
import Contact from "./components/contact/Contact"
import Footer from "./components/common/footer/Footer"
import Home from "./components/home/Home"
import SIGNUP from "./components/sign-up/Sign-up"

function App() {

  return (
    <>
    <Router>
      <Header />
      <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/about' element={<About />} />
      <Route exact path='/courses' element={<CourseHome />} />
      <Route exact path='/team' element={<Team />} />
      <Route exact path='/pricing' element={<Pricing />} />
      <Route exact path='/journal' element={<Blog />} />
      <Route exact path='/contact' element={<Contact />} />
      <Route exact path='/sign-up' element={<SIGNUP />}/>
    </Routes>
      <Footer />
    </Router>
  </>
  );
}

export default App;
