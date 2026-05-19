export default function Home() {
  const skills = [
    {
      name: "HTML",
      image: "/pic/html.png",
    },
    {
      name: "CSS",
      image: "/pic/css.png",
    },
    {
      name: "Tailwind",
      image: "/pic/tailwind.png",
    },
    {
      name: "JavaScript",
      image: "/pic/js.png",
    },
    {
      name: "React",
      image: "/pic/react.png",
    },
    {
      name: "Next.js",
      image: "/pic/next.png",
    },
  ];

  const projects = [
    {
      name: "positivus",
      live: "https://positivus-sahib.netlify.app/",
      github: "https://github.com/sahib24/Positivus",
    },
    {
      name: "foodwagone",
      live: "https://foodwagone.netlify.app/",
      github: "https://github.com/sahib24/foodwagon",
    },
    {
      name: "nexcent",
      live: "https://nexcent12.netlify.app/",
      github: "https://github.com/sahib24/Nexcent",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Header */}
      <header className="text-center px-5 py-10">
        <img
          src="/pic/Bg.jpg"
          alt="Sahib Ahmed"
          className="w-[120px] h-[120px] rounded-full object-cover mx-auto mb-4 border-2 border-slate-200"
        />

        <h1 className="text-[28px] font-bold mb-1">Sahib Ahmed</h1>

        <p className="text-[18px] text-slate-300">Front-End Developer</p>
      </header>

      {/* Container */}
      <div className="max-w-[1200px] mx-auto px-5">
        {/* About */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4 border-l-[5px] border-yellow-400 pl-3 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-200 bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient">
            About Me
          </h2>

          <p className="text-indigo-100 leading-7">
            Hi, I'm Sahib Ahmed, a passionate Front-End Developer dedicated to
            crafting modern, responsive, and user-centric web interfaces. I
            specialize in turning clean code into visually appealing and
            intuitive designs using HTML, CSS, and JavaScript.
            <br />
            <br />
            Currently, I’m focused on sharpening my core skills while exploring
            powerful tools like React, Tailwind CSS, and version control with
            Git. My goal is to build seamless digital experiences that not only
            look great but also perform efficiently across all devices.
            <br />
            <br />
            I’m constantly learning, experimenting, and pushing myself to grow
            as a developer—one project at a time.
            <br />
            <br />
            Let’s build something amazing!
          </p>
        </section>

        {/* Experience */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4 border-l-[5px] border-yellow-400 pl-3 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-200 bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient">
            Experience
          </h2>

          <p className="text-indigo-100 leading-7">
            Company: Bondstein Technologies Limited
            <br />
            Location: Dhaka, Bangladesh
            <br />
            Role: Front-End Developer Intern
            <br />
            Duration: January 2025 – June 2025 (6 months)
            <br />
            <br />
            During my 6-month internship at Bondstein Technologies Limited, I
            focused entirely on front-end development, building responsive,
            user-friendly interfaces using modern tools and frameworks.
            <br />
            <br />
            This experience helped me gain confidence in working with real-world
            projects and strengthened my foundational and advanced front-end
            skills.
            <br />
            <br />
            <span className="font-semibold">
              Key Responsibilities & Achievements:
            </span>
            <br />
            <br />
            Built and deployed 3 complete front-end projects using React,
            Tailwind CSS, and Next.js.
            <br />
            <br />
            🔹 FoodWagone – A responsive food delivery website with smooth
            navigation and UI animations.
            <br />
            <br />
            🔹 Nexcent – A sleek corporate landing page with clean
            component-based design.
            <br />
            <br />
            🔹 Positivus – A wellness-focused website highlighting layout design
            and user interaction.
            <br />
            <br />
            Developed a language translation web app using a third-party
            Translation API, improving accessibility across different languages.
            <br />
            <br />
            Conducted bug testing on live UIs to improve responsiveness and
            usability.
            <br />
            <br />
            Strengthened my skills in HTML, CSS, and JavaScript, while exploring
            best practices in React and component-based architecture.
            <br />
            <br />
            Learned and applied Git & GitHub for version control, pull requests,
            and project collaboration.
          </p>
        </section>

        {/* Skills */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4 border-l-[5px] border-yellow-400 pl-3 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-200 bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient">
            Skills
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 justify-items-center pt-5">
            {skills.map((skill, index) => (
              <div key={index} className="text-center">
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="w-[50px] h-[50px] object-contain mb-2"
                />

                <p className="font-medium capitalize text-indigo-100">
                  {skill.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4 border-l-[5px] border-yellow-400 pl-3 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-200 bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient">
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center py-3">
            {projects.map((project, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-xl p-5 w-full max-w-[320px] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-xl text-yellow-400 capitalize mb-4">
                    {project.name}
                  </h3>

                  <div className="flex flex-wrap justify-center">
                    <a
                      href={project.live}
                      target="_blank"
                      className="inline-block m-1 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold transition"
                    >
                      View Project
                    </a>

                    <a
                      href={project.github}
                      target="_blank"
                      className="inline-block m-1 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold transition"
                    >
                      GitHub Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4 border-l-[5px] border-yellow-400 pl-3 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-200 bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient">
            Contact
          </h2>

          <p className="text-indigo-100 mb-3">
            If you'd like to collaborate or hire me, feel free to reach out!
          </p>

          <ul className="space-y-3 text-indigo-100">
            <li>
              Email:{" "}
              <a
                href="mailto:sahibahmed3@gmail.com"
                className="text-blue-500 hover:underline"
              >
                Email Me
              </a>
            </li>

            <li>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/sahib-ahmed/"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                linkedin.com
              </a>
            </li>

            <li>
              GitHub:{" "}
              <a
                href="https://github.com/sahib24"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                github.com
              </a>
            </li>

            <li>
              CV:{" "}
              <a
                href="https://drive.google.com/file/d/1hJJYKXqVHwHyB9k-yyknfOL9Fhm1SuYV/view?usp=sharing"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                My CV
              </a>
            </li>
          </ul>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center py-5 text-sm bg-gray-900 text-gray-400">
        <p>
          © 2025 Sahib Ahmed. Designed and developed by Sahib Ahmed. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
