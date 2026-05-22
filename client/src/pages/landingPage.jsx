import Navbar from "../components/landing/Navbar";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function LandingPage() {

    useEffect(() => {
        const elements = document.querySelectorAll(".fade-in");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { threshold: 0.2 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            {/* Push content below fixed navbar */}
            <div className="pt-20">


                {/* Hero */}
                <section
                    className="fade-in relative flex flex-col items-center justify-center text-center px-6 py-32 space-y-6 bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: "url('/bg.png')" }}>

                    {/* Overlay for readability */}
                    <div className="absolute inset-0 w-full h-full bg-black/55"></div>

                    <div className="relative z-10 space-y-6">
                        <h1 className="text-5xl font-bold">Stellara</h1>
                        <h2 className="text-2xl font-bold">The Gamified Personal Development App</h2>

                        <p className="text-lg text-gray-300 max-w-xl">
                            The Gamified Personal Development Platform that helps users reach for the stars by building
                            consistency, tracking progress, and staying motivated.
                        </p>

                        <div className="flex gap-4 justify-center mt-4 flex-wrap">
                            <a
                                href="#overview"
                                className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition"
                            >
                                Learn More
                            </a>

                            <Link
                                to="/login"
                                className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black hover:scale-105 transition-transform duration-200"
                            >
                                Log In
                            </Link>

                            <Link
                                to="/signup"
                                className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black hover:scale-105 transition-transform duration-200"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Project Overview */}
                <section id="overview" className="fade-in px-6 py-15 max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-6">Project Overview</h2>

                    <p className="text-gray-400 leading-relaxed">
                        Traditional goal-tracking apps often fail to maintain long-term engagement.
                        Stellara addresses this by integrating gamification techniques such as
                        experience points, achievements, and progression feedback into everyday
                        personal development workflows. The goal is to encourage consistent action
                        and long-term growth rather than short-term task completion.
                    </p>
                </section>

                {/* Features */}
                <section className="fade-in px-6 py-10">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl font-semibold mb-10">Key Features</h2>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    title: "Goal Tracking",
                                    description:
                                        "Create, manage, and complete goals to build consistent habits."
                                },
                                {
                                    title: "Gamification",
                                    description:
                                        "Earn XP and unlock achievements through meaningful actions."
                                },
                                {
                                    title: "Daily Progress",
                                    description:
                                        "Reinforce consistency with daily achievements and feedback."
                                },
                                {
                                    title: "Dashboard",
                                    description:
                                        "Visualise progress through levels, XP, and activity metrics."
                                }
                            ].map((feature) => (
                                <div
                                    key={feature.title}
                                    className="p-6 border border-neutral-800 rounded-xl bg-slate-900 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]"
                                >
                                    <h3 className="font-semibold text-lg mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* App Preview */}
                <section className="fade-in px-6 py-10 text-center">
                    <h2 className="text-3xl font-semibold mb-6">Application Preview</h2>

                    <p className="text-gray-400 mb-10">
                        A snapshot of Stellara in action across key features.
                    </p>

                    <div className="grid gap-8 md:grid-cols-2">

                        {/* Dashboard */}
                        <div className="space-y-3">
                            <img
                                src="/homepage.png"
                                alt="Dashboard"
                                className="rounded-xl border border-neutral-800 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]"
                            />
                            <p className="text-gray-400 text-sm">Dashboard Overview</p>
                        </div>

                        {/* Goals */}
                        <div className="space-y-3">
                            <img
                                src="/goalspage.png"
                                alt="Goals"
                                className="rounded-xl shadow-lg border border-neutral-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]"
                            />
                            <p className="text-gray-400 text-sm">Goal Management</p>
                        </div>

                        {/* Achievements */}
                        <div className="space-y-3">
                            <img
                                src="/achievementspage.png"
                                alt="Achievements"
                                className="rounded-xl shadow-lg border border-neutral-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]"
                            />
                            <p className="text-gray-400 text-sm">Achievements System</p>
                        </div>

                        {/* Profile */}
                        <div className="space-y-3">
                            <img
                                src="/profilepage.png"
                                alt="Profile"
                                className="rounded-xl shadow-lg border border-neutral-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]"
                            />
                            <p className="text-gray-400 text-sm">Progress & Profile</p>
                        </div>

                    </div>
                </section>

                {/* Tech Stack */}
                <section className="px-6 py-10 max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-6">Tech Stack</h2>

                    <p className="text-gray-400 mb-6">
                        Stellara is built using a modern full-stack JavaScript architecture.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            "React",
                            "Node.js",
                            "Express",
                            "PostgreSQL",
                            "JWT",
                            "Tailwind CSS",
                            "Render",
                            "Vercel"
                        ].map((tech) => (
                            <span
                                key={tech}
                                className="px-4 py-2 border border-neutral-800 rounded-full bg-slate-900 text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Poster */}
                <section className="fade-in px-6 py-5 text-center">
                    <h2 className="text-3xl font-semibold mb-5">Project Poster</h2>

                    <p className="text-gray-400 mb-5">
                        Presented at the SETU Computing Expo 2026
                    </p>

                    <div className="max-w-3xl mx-auto">
                        <img
                            src="/poster.png"
                            alt="Project Poster"
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                </section>

                {/* Links */}
                <section className="fade-in px-6 py-10 text-center">
                    <h2 className="text-3xl font-semibold mb-6 py-2">Explore the Project</h2>

                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <a
                            href="https://github.com/Sarahw54545/fyp-gamified-personal-development-app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black hover:scale-105 transition-transform duration-200"
                        >
                            Stellara Repository
                        </a>

                        <a
                            href="https://github.com/Sarahw54545/gamification-engine-js"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black hover:scale-105 transition-transform duration-200"
                        >
                            Gamification Engine
                        </a>

                        <Link
                            to="/about"
                            className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black hover:scale-105 transition-transform duration-200"
                        >
                            About Me
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="px-6 py-10 bg-slate-900 text-center text-gray-500 text-sm border-t border-neutral-800 space-y-2">
                    <div className="py-3">
                        <p className="text-gray-400">Sarah Walsh - BSc (Hons) Creative Computing</p>
                    </div>

                    <div className="flex justify-center gap-6">
                        <a
                            href="https://github.com/Sarahw54545"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition"
                        >
                            <img
                                src="/github.png"
                                alt="GitHub"
                                className="h-8 w-8"
                            />
                        </a>

                        <a
                            href="mailto:swalsh54545@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition"
                        >
                            <img
                                src="/email.png"
                                alt="Email"
                                className="h-8 w-8"
                            />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/sarahwalsh026/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition"
                        >
                            <img
                                src="/linkedIn.png"
                                alt="LinkedIn"
                                className="h-8 w-8"
                            />
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default LandingPage;