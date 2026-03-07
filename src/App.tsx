
import './index.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Services from './Components/Services/Services';
import Projects from './Components/Projects/Projects';
import AboutMe from './Components/About-Me/About-me';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Services />
      <Projects />
      <AboutMe />
      <Contact />
      <Footer />
    </>
  );
}

export default App;