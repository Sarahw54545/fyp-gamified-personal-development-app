import Navbar from "../components/landing/Navbar";
import { useEffect } from "react";

function About() {
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

            <div className="pt-24 px-6 max-w-5xl mx-auto space-y-20 pb-20">

                {/* Intro*/}
                <section className="text-center space-y-5 fade-in">

                    <img
                        src="/profile.png"
                        alt="Profile"
                        className="w-60 h-60 object-cover bg-slate-900 rounded-full mx-auto border border-neutral-800"
                    />

                    <h1 className="text-4xl font-bold">Sarah Walsh</h1>

                    <p className="text-gray-400">
                        BSc (Hons) Creative Computing - SETU
                    </p>

                    <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Graduate full‑stack developer with experience building modern web
                        applications using technologies such as React, Node.js, and PostgreSQL.
                        Strong interest in user-focused design, scalable architecture, and creating intuitive
                        digital experiences. Passionate about developing solutions that are both
                        technically robust and engaging to use.
                    </p>
                </section>

                {/* Skills */}
                <section className="fade-in">
                    <h2 className="text-2xl font-semibold mb-8 text-center">
                        Technical Skills
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-center">
                        {[
                            ["Frontend", ["React", "Tailwind", "JavaScript", "UI/UX"]],
                            ["Backend", ["Node.js", "Express", "REST APIs", "JWT"]],
                            ["Database", ["PostgreSQL", "SQL", "Data Modelling"]],
                            ["Tools", ["Git", "CI/CD", "Debugging", "Agile"]]
                        ].map(([title, items]) => (
                            <div
                                key={title}
                                className="p-5 bg-slate-900 border border-neutral-800 rounded-xl flex flex-col items-center transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]"
                            >
                                <h3 className="font-semibold mb-2">{title}</h3>
                                <ul className="text-sm text-gray-400 space-y-1">
                                    {items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section className="fade-in text-center">
                    <h2 className="text-2xl font-semibold mb-8">Key Projects</h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        {[
                            {
                                name: "Stellara",
                                description:
                                    "Full-stack personal development application integrating gamification techniques to encourage long-term engagement.",
                                link: "https://github.com/Sarahw54545/fyp-gamified-personal-development-app"
                            },
                            {
                                name: "Gamification Engine",
                                description:
                                    "Reusable backend system for implementing achievement and XP-based progression logic across applications.",
                                link: "https://github.com/Sarahw54545/gamification-engine-js"
                            }
                        ].map((project) => (
                            <div
                                key={project.name}
                                className="p-6 bg-slate-900 border border-neutral-800 rounded-xl text-center space-y-4 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]"
                            >
                                <h3 className="text-lg font-semibold">{project.name}</h3>

                                <p className="text-gray-400 text-sm">
                                    {project.description}
                                </p>

                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-5 py-2 border border-white rounded-lg hover:bg-white hover:text-black hover:scale-105 transition"
                                >
                                    View Repository →
                                </a>
                            </div>
                        ))}
                    </div>
                </section>


                {/* Connect */}
                <section className="fade-in text-center space-y-8">
                    <h2 className="text-2xl font-semibold">Get In Touch</h2>


                    <div className="grid gap-6 md:grid-cols-3">

                        {[
                            { icon: "/github.png", label: "GitHub", link: "https://github.com/Sarahw54545" },
                            { icon: "/email.png", label: "Email", link: "mailto:swalsh54545@gmail.com" },
                            { icon: "/linkedIn.png", label: "LinkedIn", link: "https://www.linkedin.com/in/sarahwalsh026/" }
                        ].map((item, i) => (
                            <a
                                key={i}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-6 bg-slate-900 border border-neutral-800 rounded-xl flex flex-col items-center gap-3 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]"
                            >
                                {item.icon.endsWith(".png") ? (
                                    <img src={item.icon} className="w-14 h-14" />
                                ) : (
                                    <span className="text-4xl">{item.icon}</span>
                                )}
                                <span className="text-gray-300">{item.label}</span>
                            </a>
                        ))}
                    </div>

                </section>

            </div>
        </div>
    );
}

export default About;