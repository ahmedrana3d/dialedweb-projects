import React, { useEffect, useRef, useState } from "react";
import img1 from "/dial.png";
import img2 from "/meteor.png";
import img3 from "/pirate.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProjectBody({ open }) {
  const projects = [
    {
      text1: "DIALEDWEB AGENCIES INTO A ",
      text2: "WEB 3.0 PLATFORM",
      img: img2,
      info: "We are you",
      info1: "UI/UX",
      date: "2019",
      button: "View project",
    },
    {
      text1: "DIALEDWEB Help to build",
      text2: "3D PLATFORM",
      img: img1,
      info: "Mentors",
      info1: "UI/UX",
      date: "2020",
      button: "View project",
    },
    {
      text1: "DIALEDWEB BRINGS BACK THE LIFE",
      text2: "WEB PLATFORM",
      img: img3,
      info: "GALAXY WORLD",
      info1: "UI/UX",
      date: "2019",
      button: "View project",
    },
  ];

  const projectRefs = useRef([]);
  projectRefs.current = [];

  const menuRef = useRef();

  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!open) {
      const tl = gsap.timeline();
      tl.to(menuRef.current, {
        left: "-100%",
        duration: 1,
        ease: "power3.inOut",
      });
    }

    if (open) {
      const tl = gsap.timeline();
      tl.to(menuRef.current, {
        left: "0",
        duration: 1,
        ease: "power3.inOut",
      });
    }


    projectRefs.current.forEach((project, index) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: project,
            start: "top 60%",
            end: "top 30%",
            scrub: 1,
            // markers: true,
          },
        })
        .fromTo(
          project,
          { scale: 0.8, y: 100, opacity: 0, duration: 1, ease: "power3.inOut" },
          { scale: 1, y: 0, duration: 1, opacity: 1, ease: "power3.inOut" }
        );
    });
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [open]);

  const [hovered1, setHovered1] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <div
      ref={menuRef}
      className="absolute w-full h-[400vh] top-0 -left-[100%] bg-[#02210a] text-[#43ea67] z-40  "
    >
      <div className="relative max-w-[90%] h-full mx-auto ">
        {projects.map((project, index) => (
          <div ref={addToRefs} key={index} className="relative pt-40">
            <div
              onMouseEnter={() => setHovered1(index)}
              onMouseLeave={() => setHovered1(null)}
              style={
                hovered1 === index
                  ? {
                      transform:
                        "perspective(1200px) rotateX(-5deg) rotateY(4deg)",
                      transition: "transform 0.5s ease-in-out",
                    }
                  : { transition: "transform 4s ease-in-out" }
              }
              className={`absolute z-10 tracking-wider `}
            >
              <h1 className="lg:text-8xl text-3xl font-SFPRO ">
                {project.text1}
              </h1>
              <h1 className="lg:text-6xl text-3xl font-Opti ">
                {project.text2}
              </h1>
            </div>

            <div className="relative lg:pt-20 pt-32 z-0 flex flex-col-reverse lg:flex-row  lg:justify-between lg:items-end  ">
              <div className="mx-2">
                <h1 className="lg:text-3xl font-bebas-neue ">{project.info}</h1>
                <h1 className="lg:text-3xl font-bebas-neue ">
                  {project.info1}
                </h1>
                <h1 className="lg:text-3xl font-bebas-neue ">{project.date}</h1>
                <button className="border-2 border-[#43ea67]  px-2 py-1  lg:px-4 lg:py-2 rounded-3xl mt-3 hover:bg-yellow-300 hover:text-black transition-all duration-200 ease-linear">
                  {project.button}
                </button>
              </div>
              <div className="overflow-hidden">
                <div
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  style={
                    hovered === index
                      ? {
                          transform: "scale(1.1) ",
                          transition: "transform 0.5s ease-in-out",
                        }
                      : { transition: "transform 1s ease-in-out" }
                  }
                >
                  <img src={project.img} alt="" className="lg:h-[560px]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
