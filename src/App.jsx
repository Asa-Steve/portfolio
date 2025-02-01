import "./App.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

function App() {
  const imageRef = useRef(null);
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { xPercent: -100, opacity: 0 }, // Start fully left (-100%)
        { xPercent: 0, opacity: 1, duration: 1.5, ease: "power3.out" } // Move to original position
      );
    }
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="wrap">
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
              </div>
            </div>
            <div className="right">
              <div className="img_wrap">
                <img src="/imgs/hero.png" alt="hero-img" ref={imageRef} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
