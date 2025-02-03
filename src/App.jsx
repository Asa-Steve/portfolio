import "./App.css";
import { useEffect, useRef, useState } from "react";
import Btn from "./components/Button/Button";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
    desc: "Developed a church management system that facilitates <b> donations, mass requests, and infant baptism registrations. </b>The platform provides a seamless user experience with a clean UI, secure backend operations, and email notifications. It integrates <b>payment processing </b>for donations and registrations while ensuring efficient data management with MongoDB.",
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
    desc: "Developed a church management system that facilitates <b> donations, mass requests, and infant baptism registrations. </b>The platform provides a seamless user experience with a clean UI, secure backend operations, and email notifications. It integrates <b>payment processing </b>for donations and registrations while ensuring efficient data management with MongoDB.",
    URL: "https://theprimeside.com/",
  },
];

function App() {
  const [flipId, setFlipId] = useState(null);

  // hero image ref
  const imageRef = useRef(null);

  // about me image refs
  const containerRef = useRef(null);
  const imageRefAnimated = useRef(null);
  const totalFrames = 135; // Number of frames

  // blob ref
  const blobRef = useRef(null);

  // Hero image animation using GSAP
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { xPercent: -100, opacity: 0 }, // Start fully left (-100%)
        { xPercent: 0, opacity: 1, duration: 1.5, ease: "power3.out" } // Move to original position
      );
    }
  }, []);

  // About Me image animation using GSAP
  useEffect(() => {
    let currentFrame = 1;

    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            // const newFrame = Math.round(self.progress * (totalFrames - 1)) + 1;
            const newFrame = Math.floor(self.progress * (totalFrames - 1)) + 1;
            if (newFrame !== currentFrame) {
              currentFrame = newFrame;
              const newSrc = `/imgs/animate/male${String(currentFrame).padStart(
                4,
                "0"
              )}.png`;
              console.log("Loading Image:", newSrc); // Debugging output
              requestAnimationFrame(() => {
                imageRefAnimated.current.src = newSrc;
              });
            }
          },
        },
      }
    );
  }, []);

  // Blob animation using GSAP
  useEffect(() => {
    // GSAP animation for scaling the blob as you scroll
    gsap.to(blobRef.current, {
      scale: 7, // Max scale
      height: "40px",
      top: "30%",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center", // Start when the top of the container is at the bottom of the viewport
        end: "bottom top", // End when the bottom of the container reaches the top of the viewport
        scrub: true, // Smooth the animation based on the scroll position
      },
    });
  }, []);

  {
    return (
      <>
        <section className="hero">
          <div className="container">
            <div className="left">
              <div className="text_wrap">
                <h4>Hi, My name is </h4>
                <h1>Asadu Stephen</h1>
                <h3 className="fancy">Software Developer</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                  perferendis nam sunt repellat. Labore minima illum fuga quos
                  officia accusantium pariatur distinctio quasi nesciunt
                  deserunt.
                </p>
                <div className="btn_wrap">
                  <Btn
                    btnText="Hire Me"
                    bgColor={"#213547 "}
                    color={"white"}
                    type={"primary"}
                  />
                  <Btn btnText="Connect with me" type={"secondary"} />
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

        <div className="divider" ref={containerRef}></div>

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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Numquam quisquam eos nemo expedita consequuntur hic eius
                  cupiditate recusandae error iusto illum, pariatur nulla
                  blanditiis minima et totam aspernatur, corrupti velit
                  doloribus cum tenetur doloremque suscipit explicabo ab. Vero
                  nam quia porro exercitationem odio, delectus perspiciatis est
                  dolore esse tempora magni earum sunt accusamus fuga hic. Iusto
                  sequi error tempora ipsam provident laboriosam odit veniam
                  fugiat quam, omnis ducimus deleniti ipsum labore molestias
                  voluptate assumenda illo maxime dignissimos? Harum beatae
                  corporis expedita dolores saepe ducimus, qui eos perspiciatis
                  impedit enim cumque. Accusamus atque dignissimos praesentium
                  doloremque sunt dolorum nam maiores velit!
                </p>
                <div className="btn_wrap">
                  <Btn
                    color={"white"}
                    bgColor={"black"}
                    type={"primary"}
                    btnText="Hire Me"
                  />
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

        <div className="divider"></div>

        <section className="tech_stack">
          <div className="container">
            <h2>My Stack</h2>
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

        <div className="divider"></div>

        <section className="project">
          <div className="container">
            <h2>
              <span className="style1">Think It,</span>
              <span className="style2">I Build It</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem,
              eligendi rerum obcaecati perferendis voluptatum iusto facere
              possimus atque aperiam iste voluptates enim modi, molestiae
              laudantium.
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
                    <a href={`${project.URL}`}>
                      <Btn btnText="View Project" type={"secondary"} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider"></div>

        <section className="form-section">
          <div className="container">
            <div className="left">
              <h4>Get in touch</h4>
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
              <form action="">
                <div className="input_grp">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Enter email"
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
                  />
                </div>
                <div className="row">
                  <label htmlFor="message">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Leave me a message..."
                  ></textarea>
                </div>
                <div className="row">
                  <Btn type={"secondary"} btnText="Send Message" />
                </div>
              </form>
            </div>
          </div>
        </section>
        <div className="divider"></div>

        <footer>
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
