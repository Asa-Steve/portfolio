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

function App() {
  // hero image ref
  const imageRef = useRef(null);

  // about me image refs
  const containerRef = useRef(null);
  const imageRefAnimated = useRef(null);
  const totalFrames = 135; // Number of frames

  // blob ref
  const blobRef = useRef(null);
  const containerRefBlob = useRef(null);

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
          start: "bottom center",
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
      height: "45px",
      top: "30%",
      scrollTrigger: {
        trigger: containerRefBlob.current,
        start: "top bottom", // Start when the top of the container is at the bottom of the viewport
        end: "bottom top", // End when the bottom of the container reaches the top of the viewport
        scrub: true, // Smooth the animation based on the scroll position
      },
    });
  }, []);

  return (
    <>
      <section className="hero" ref={containerRef}>
        <div className="container">
          <div className="left">
            <div className="text_wrap">
              <h4>Hi, My name is </h4>
              <h1>Asadu Stephen</h1>
              <h3 className="fancy">Software Developer</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                perferendis nam sunt repellat. Labore minima illum fuga quos
                officia accusantium pariatur distinctio quasi nesciunt deserunt.
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                quisquam eos nemo expedita consequuntur hic eius cupiditate
                recusandae error iusto illum, pariatur nulla blanditiis minima
                et totam aspernatur, corrupti velit doloribus cum tenetur
                doloremque suscipit explicabo ab. Vero nam quia porro
                exercitationem odio, delectus perspiciatis est dolore esse
                tempora magni earum sunt accusamus fuga hic. Iusto sequi error
                tempora ipsam provident laboriosam odit veniam fugiat quam,
                omnis ducimus deleniti ipsum labore molestias voluptate
                assumenda illo maxime dignissimos? Harum beatae corporis
                expedita dolores saepe ducimus, qui eos perspiciatis impedit
                enim cumque. Accusamus atque dignissimos praesentium doloremque
                sunt dolorum nam maiores velit!
              </p>
              <div className="btn_wrap">
                <Btn
                  color={"white"}
                  bgColor={"black"}
                  type={"primary"}
                  btnText="Hire Me"
                />
                <a href="/imgs/animate/male0001.png" download={"male0001.png"}>
                  <Btn type={"secondary"} btnText="Download CV" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tech_stack">
        <div className="container">
          <h2>My Stack</h2>
          <div className="stacks">
            {myStack.map((stack) => (
              <div className="stack">
                <div className="card-front">
                  <img src={`/imgs/${stack.img}.png`} alt={`${stack}-logo`} />
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

          <div className="projects">
            <div className="proj">
              <div className="top">
                <span></span>
                <span></span> 
                <span></span>
              </div>
            </div>
            <div className="proj">
              <div className="top">
                <span></span>
                <span></span> 
                <span></span>
              </div>
            </div>
            <div className="proj">
              <div className="top">
                <span></span>
                <span></span> 
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
