import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Preloader from "./components/Preloader.jsx";
import BackgroundAnim from "./components/BackgroundAnim.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Journey from "./components/Journey.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Admin/Login.jsx";
import AdminLayout from "./pages/Admin/AdminLayout.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AdminProjects from "./pages/Admin/Projects.jsx";
import AdminSkills from "./pages/Admin/Skills.jsx";
import AdminExperience from "./pages/Admin/Experience.jsx";
import AdminMessages from "./pages/Admin/Messages.jsx";

import ClientDashboard from "./pages/Client/Dashboard.jsx";


function Portfolio() {
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
        </>
    );
}


function AdminProtected({ children }) {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    );
}


export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Portfolio />}
                />

                <Route
                    path="/admin/login"
                    element={<Login />}
                />

                <Route
                    path="/admin"
                    element={
                        <AdminProtected>
                            <AdminLayout />
                        </AdminProtected>
                    }
                >
                    <Route
                        index
                        element={
                            <Navigate
                                to="/admin/dashboard"
                                replace
                            />
                        }
                    />

                    <Route
                        path="dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="projects"
                        element={<AdminProjects />}
                    />

                    <Route
                        path="skills"
                        element={<AdminSkills />}
                    />

                    <Route
                        path="experience"
                        element={<AdminExperience />}
                    />

                    <Route
                        path="messages"
                        element={<AdminMessages />}
                    />
                </Route>

                <Route
                    path="/client/dashboard"
                    element={<ClientDashboard />}
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}