import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

import Sidebar    from './components/Sidebar';
import Home       from './pages/Home';
import About      from './pages/About';
import Services   from './pages/Services';
import Experience from './pages/Experience';
import Works      from './pages/Works';
import Contact    from './pages/Contact';

export default function App() {
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <Home />
        <About />
        <Services />
        <Experience />
        <Works />
        <Contact />
      </div>
    </>
  );
}   