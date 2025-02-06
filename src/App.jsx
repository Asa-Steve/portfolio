import "./App.css";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Btn from "./components/Button/Button";
import { Link, Element } from "react-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Puff } from "react-loader-spinner";
const myStack = [
  {
    name: "MongoDB",
    img: "mongo",
    desc: "MongoDB is a NoSQL database that allows flexible and scalable data storage. I use it to build dynamic and fast applications.",
  },
  {
    name: "Express Js",
    img: "express",
    desc: "A minimalist Node.js framework that simplifies backend development and API creation.",
  },
  {
    name: "React Js",
    img: "react",
    desc: "A powerful JavaScript library for building fast, interactive, and reusable UI components.",
  },
  {
    name: "Node Js",
    img: "node",
    desc: "A runtime that allows JavaScript to run on the server, enabling full-stack development with JavaScript.",
  },
  {
    name: "Sass",
    img: "sass",
    desc: "An advanced CSS preprocessor that makes styling easier with variables, nesting, and mixins.",
  },
];
const Projects = [
  {
    img: "alt",
    stack: ["Wordpress"],
    desc: "A WordPress-powered platform for the University of Nigeria Alt Protein Project, dedicated to educating and connecting future scientists, innovators, and entrepreneurs. The project promotes sustainable and ethical food systems by advancing alternative protein research and development in Nigeria.",
    URL: "https://altproteinunn.com/",
  },
  {
    img: "zion",
    stack: ["MongoDB", "ReactJs", "NodeJs", "ExpressJs", "Sass"],
    desc: "Developed a church management system that facilitates <b> donations, mass requests, and infant baptism registrations. </b>The platform provides a seamless user experience with a clean UI, secure backend operations, and email notifications. It integrates <b>payment processing </b>for donations and registrations while ensuring efficient data management with MongoDB.",
    URL: "https://mount-zion.onrender.com/",
  },
  {
    img: "primeside",
    stack: ["Wordpress"],
    desc: "A WordPress-based platform dedicated to skincare education, empowering over 10,000 individuals to create safe and natural skincare products. The project offers free YouTube videos, eBooks, paid classes, and premium organic ingredients, making skincare formulation accessible for both personal and commercial use.",
    URL: "https://theprimeside.com/",
  },
];

function App() {
  const [flipId, setFlipId] = useState(null);
  const [feedBack, setFeedBack] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  // hero image ref
  const imageRef = useRef(null);

  // about_me image refs
  const containerRef = useRef(null);
  const imageRefAnimated = useRef(null);
  const frameRef = useRef(1);

  // blob ref
  const blobRef = useRef(null);

  // Form Ref
  const form = useRef();

  // Show button when scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 1000); // Show when scrolled down 300px
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Toggler
  useEffect(() => {
    toggle
      ? (window.document.body.style.overflow = "hidden")
      : (window.document.body.style.overflow = "visible");
  }, [toggle]);

  // Hero image animation using GSAP
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(max-width: 633px)", () => {
      // Mobile Animation (from bottom)
      gsap.fromTo(
        imageRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
      );
    });

    mm.add("(min-width: 632px)", () => {
      // Desktop Animation (from left)
      gsap.fromTo(
        imageRef.current,
        { xPercent: -100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
      );
    });

    return () => mm.revert(); // Cleanup on unmount
  }, []);

  // About Me image animation using GSAP
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia(); // ✅ 1. Use matchMedia for responsive settings

    mm.add(
      {
        isMobile: "(max-width: 632px)", // Mobile breakpoint
        isDesktop: "(min-width: 633px)", // Desktop breakpoint
      },
      (context) => {
        const { isMobile, isDesktop } = context.conditions;

        // ✅ 2. Set frames & animation behavior based on screen size
        const totalFrames = isMobile ? 50 : 135;
        const scrubSpeed = isMobile ? 0.5 : 0.1; // Mobile reacts slightly slower

        // ✅ 3. Preload only the needed images
        const preloadImages = () => {
          for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            img.src = `/imgs/animate/male${String(i).padStart(4, "0")}.png`;
            document.body.appendChild(img); // Force browser to cache
            img.style.display = "none";
          }
        };

        preloadImages(); // Preload images

        // ✅ 4. Function to update image frames
        const updateFrame = (progress) => {
          const newFrame = Math.floor(progress * (totalFrames - 1)) + 1;

          if (newFrame !== frameRef.current) {
            frameRef.current = newFrame;
            const newSrc = `/imgs/animate/male${String(newFrame).padStart(
              4,
              "0"
            )}.png`;

            // Ensure image is decoded before switching
            const img = new Image();
            img.src = newSrc;
            img
              .decode()
              .then(() => {
                imageRefAnimated.current.src = newSrc;
                // Force repaint
                imageRefAnimated.current.style.opacity = "0.99";
                setTimeout(() => {
                  imageRefAnimated.current.style.opacity = "1";
                }, 0);
              })
              .catch((err) => console.error("Image decoding failed", err));
          }
        };

        // ✅ 5. GSAP Animation with correct settings
        gsap.to(
          {},
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: isMobile ? "top center" : "top top", // Adjust scroll behavior
              end: isMobile ? "bottom center" : "bottom top",
              scrub: scrubSpeed,
              onUpdate: (self) => updateFrame(self.progress),
            },
          }
        );
      }
    );

    return () => mm.revert(); // ✅ 6. Cleanup when unmounting or resizing
  }, []);

  // Blob animation using GSAP
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 768px)", // Mobile condition
        isDesktop: "(min-width: 769px)", // Desktop condition
      },
      (context) => {
        const { isMobile, isDesktop } = context.conditions;

        gsap.to(blobRef.current, {
          scale: isMobile ? 4.5 : 7, // Scale 4.5x on mobile, 7x on desktop
          height: "40px", // Adjust height
          top: "30%", //  positioning
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center", //scroll start points
            end: "bottom top", // End animation the same way
            scrub: true, // Keep scroll-based animation smooth
          },
        });
      }
    );

    return () => mm.revert(); // Cleanup on unmount
  }, []);

  // Form Submission
  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFeedBack((prev) => !prev);
    try {
      setLoading(true);
      const response = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setFeedBack({
        status: "success",
        message: "Message was sent successfully!",
      });
      setLoading(false);
    } catch (error) {
      setFeedBack({
        status: "failed",
        message: "Oops! something went wrong. :(",
      });
      setLoading(false);
    }
    setTimeout(() => {
      setFeedBack(null);
    }, 3000);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const spiner = () => {
    return render(
      <Puff
        visible={true}
        color="#4fa94d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  };

  {
    return (
      <>
        <div className={toggle ? "overlay" : ""}></div>
        <header>
          <nav className="container">
            <div className="logo">
              <img src="/imgs/logo.png" alt="" />
            </div>
            <div className="clip">
              <div className="links">
                <Link to="home" smooth={true} duration={200} offset={-60}>
                  <span>Home</span>
                </Link>
                <Link to="about" smooth={true} duration={200} offset={-60}>
                  <span>About Me</span>
                </Link>
                <Link to="tech-stack" smooth={true} duration={200} offset={-60}>
                  <span>Tech Stack</span>
                </Link>
                <Link to="projects" smooth={true} duration={200} offset={-60}>
                  <span>Projects</span>
                </Link>
                <Link to="connect" smooth={true} duration={200} offset={-60}>
                  <span>Connect with Me</span>
                </Link>
              </div>
            </div>

            <div className="links_mb">
              <div
                className={toggle ? `toggler_mb active` : "toggler_mb"}
                onClick={handleToggle}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={toggle ? `mb_menu show` : "mb_menu"}>
                <Link
                  className={toggle ? "show" : ""}
                  onClick={handleToggle}
                  to="home"
                  smooth={true}
                  duration={200}
                  offset={-60}
                >
                  <span>Home</span>
                </Link>
                <Link
                  className={toggle ? "show" : ""}
                  onClick={handleToggle}
                  to="about"
                  smooth={true}
                  duration={200}
                  offset={-60}
                >
                  <span>About Me</span>
                </Link>
                <Link
                  className={toggle ? "show" : ""}
                  onClick={handleToggle}
                  to="tech-stack"
                  smooth={true}
                  duration={200}
                  offset={-60}
                >
                  <span>Tech Stack</span>
                </Link>
                <Link
                  className={toggle ? "show" : ""}
                  onClick={handleToggle}
                  to="projects"
                  smooth={true}
                  duration={200}
                  offset={-60}
                >
                  <span>Projects</span>
                </Link>
                <Link
                  className={toggle ? "show" : ""}
                  onClick={handleToggle}
                  to="connect"
                  smooth={true}
                  duration={200}
                  offset={-60}
                >
                  <span>Connect with Me</span>
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <Element name="home">
          <section className="hero">
            <div className="container">
              <div className="left">
                <div className="text_wrap">
                  <h4>Hi, My name is </h4>
                  <h1>Asadu Stephen</h1>
                  <h3 className="fancy">Software Developer</h3>
                  <p>
                    Crafting digital experiences that are as functional as they
                    are beautiful. With over 3 years of turning ideas into
                    interactive realities, I bridge the gap between design and
                    development.
                  </p>
                  <div className="btn_wrap">
                    <Link
                      to="connect"
                      smooth={true}
                      duration={200}
                      offset={-60}
                    >
                      <Btn
                        btnText="Hire Me"
                        bgColor={"#213547"}
                        color={"white"}
                        type={"primary"}
                      />
                    </Link>
                    <Link
                      to="connect"
                      smooth={true}
                      duration={200}
                      offset={-60}
                    >
                      <Btn btnText="Connect with me" type={"secondary"} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="img_wrap">
                  <img src="/imgs/hero.png" alt="hero-img" ref={imageRef} />
                </div>
              </div>
            </div>
          </section>
        </Element>

        <div className="divider" ref={containerRef}></div>

        <Element name="about">
          <section className="about">
            <div className="container">
              <div className="left">
                <div className="img_wrap">
                  <div className="blob" ref={blobRef}></div>
                  <img
                    src={`/imgs/animate/male0001.png`} // Dynamically load images
                    alt="Animated Portrait"
                    ref={imageRefAnimated}
                  />
                </div>
              </div>
              <div className="right">
                <div className="text_wrap">
                  <h2>About Me</h2>
                  <p>
                    I’m a passionate MERN stack developer with a love for clean
                    code and pixel-perfect designs. Over the past 3 years, I’ve
                    honed my skills in building scalable, user-friendly web
                    applications that not only meet but exceed expectations. My
                    toolkit{" "}
                    <span className="fancy" style={{ fontWeight: "bold" }}>
                      {" "}
                      MongoDB, Express.js, React, Node.js
                    </span>
                    , and a sprinkle of{" "}
                    <span className="fancy" style={{ fontWeight: "bold" }}>
                      {" "}
                      Sass{" "}
                    </span>{" "}
                    magic to bring style to functionality. Whether it’s a sleek
                    front-end interface or a robust back-end system, I thrive on
                    solving problems and creating seamless digital experiences.
                    Let’s collaborate and turn your vision into reality!
                  </p>
                  <div className="btn_wrap">
                    <Link
                      to="connect"
                      smooth={true}
                      duration={200}
                      offset={-60}
                    >
                      <Btn
                        color={"white"}
                        bgColor={"black"}
                        type={"primary"}
                        btnText="Hire Me"
                      />
                    </Link>

                    <a
                      href="https://drive.google.com/file/d/1qkGF1-b7W_XIyh2AUYThwzN1QRtvEqfH/view?usp=drivesdk"
                      download={"Asadu Stephen CV.pdf"}
                      target="_blank"
                    >
                      <Btn type={"secondary"} btnText="Download CV" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Element>

        <div className="divider"></div>

        <Element name="tech-stack">
          <section className="tech_stack">
            <div className="container">
              <h2>My Stack</h2>
              <p className="tagline">
                The tools I use to build, innovate, and create. From databases
                to dynamic interfaces, I’ve got the tech to power your next big
                idea.
              </p>
              <div className="stacks cards">
                {myStack.map((stack, id) => (
                  <div key={id} className="stack card">
                    <div className="card-front">
                      <img
                        src={`/imgs/${stack.img}.png`}
                        alt={`${stack}-logo`}
                        loading="lazy"
                      />
                    </div>
                    <div className="card-back">
                      <h5>{stack.name}</h5>
                      <p>{stack.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Element>

        <div className="divider"></div>

        <Element name="projects">
          <section className="project">
            <div className="container">
              <h2>
                <span className="style1">Think It,</span>
                <span className="style2">I Build It</span>
              </h2>
              <p className="tagline">
                Transforming concepts into captivating digital experiences, one
                project at a time.
              </p>

              <div className="projects cards">
                {Projects.map((project, id) => (
                  <div
                    className={
                      !(flipId === id) ? "proj card" : "proj card active"
                    }
                    onClick={() =>
                      flipId === id ? setFlipId(null) : setFlipId((prev) => id)
                    }
                    key={id}
                  >
                    <div className="card-front">
                      <div className="top">
                        {new Array(3).fill(null).map((_, index) => (
                          <span key={index}></span>
                        ))}
                      </div>
                      <div className="img_wrap">
                        <img src={`/imgs/projects/${project.img}.png`} alt="" />
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="stacks">
                        {project.stack.map((stack, id) => (
                          <span key={id}>{stack}</span>
                        ))}
                      </div>
                      <p dangerouslySetInnerHTML={{ __html: project.desc }}></p>
                      <a
                        href={id === 2 ? "" : `${project.URL}`}
                        target="_blank"
                      >
                        <Btn
                          btnText={id === 2 ? "coming soon" : "View Project"}
                          type={"secondary"}
                          disable={id === 2}
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Element>

        <div className="divider"></div>

        <Element name="connect">
          <section className="form-section" id="connect">
            <div className="container">
              <div className="left">
                <h4 onClick={handleSubmit}>Get in touch</h4>
                <div className="caption">
                  <h2>
                    Lets Discuss your <br /> project ideas
                  </h2>
                  <img src="/imgs/idea.png" alt="light-bulb" />
                </div>
                <h4>Today !</h4>

                <div className="info">
                  <span>
                    <img src="/imgs/ph.gif" alt="phone-img" /> 09167670473
                  </span>
                  <span>
                    <img src="/imgs/mail.gif" alt="mail-img" />
                    asadusteve456@gmail.com
                  </span>
                  <span>
                    <img src="/imgs/pin.gif" alt="pin" />
                    Yenagoa, Bayelsa State
                  </span>
                </div>
              </div>
              <div className="seperator"></div>
              <div className="right">
                <form onSubmit={handleSubmit} ref={form}>
                  <div className="input_grp">
                    <div>
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder="Your idea"
                      required
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="message">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Leave me a message..."
                      required
                    ></textarea>
                  </div>
                  <div className="row">
                    {loading ? (
                      <div className="loader">
                        <Puff />
                      </div>
                    ) : (
                      <Btn type={"secondary"} btnText="Send Message" />
                    )}
                  </div>
                </form>
                
                <p
                  className={
                    feedBack?.status
                      ? `feedback active ${feedBack?.status}`
                      : "feedback"
                  }
                >
                  {" "}
                  {feedBack?.message || ""}
                </p>
              </div>
            </div>
          </section>
        </Element>

        <div className="divider"></div>

        <footer>
          <button
            onClick={scrollToTop}
            className={`${isVisible ? "totop" : ""}`}
          >
            ↑
          </button>
          <div className="container">
            <p>
              Copyright &copy; {new Date().getFullYear()}. All Rights Reserved.
            </p>
          </div>
        </footer>
      </>
    );
  }
}

export default App;
