import Preloader from "../../components/Preloader";
import BackgroundAnim from "../../components/BackgroundAnim";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Skills from "../../components/Skills";
import Projects from "../../components/Projects";
import Journey from "../../components/Journey";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import AIAgent from "../../components/AIAgent";

export default function Home() {
    return (
        <>
            <Preloader />
            <BackgroundAnim />
            <Header />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Journey />
            <Contact />
            <Footer />
            <AIAgent />
        </>
    );
}