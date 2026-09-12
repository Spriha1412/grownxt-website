import { NavThemeProvider } from "./context/NavThemeContext";
import { ChromaticHaze } from "./components/ChromaticHaze";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Mission } from "./components/Mission";
import { Services } from "./components/Services";
import { Milestones } from "./components/Milestones";
import { Pricing } from "./components/Pricing";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <NavThemeProvider>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <ChromaticHaze />
      <Navbar />
      <main className="app">
        <Hero />
        <About />
        <Mission />
        <Services />
        <Milestones />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </NavThemeProvider>
  );
}
