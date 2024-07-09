import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import Stairs from "../transitions/Stair";
import Experience from "./Experience/Experience";
import "./project.css";
import ProjectBody from "./ProjectsBody";
import { FaLongArrowAltRight } from "react-icons/fa";

const HtmlComponent = () => {
  useEffect(() => {
    const canvasElement = document.querySelector(".web-gl");
    const app = new Experience(canvasElement);

    // Cleanup if necessary
    return () => {
      // Assuming Experience has a cleanup method
      if (app && typeof app.cleanup === "function") {
        app.cleanup();
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/style.css" />
      </Helmet>

      <canvas className="web-gl"></canvas>
    </>
  );
};

function Project() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Stairs>
      <div className="fixed top-0 left-0 w-full h-screen">
        <HtmlComponent />
      </div>

      <ProjectBody open={open} setOpen={setOpen} />

      <button
        onClick={handleOpen}
        className={`project-button ${open ? "rotate-arrow" : ""}`}
      >
        <span className="project-span">
          <p className="flex justify-center items-center gap-2">
            <em>{open ? "Close Projects" : "View Projects"}</em>
            {/* <span className="arrowIcon">
              <FaLongArrowAltRight />
            </span> */}
          </p>
        </span>
        <span className="project-span">
          <p className="flex justify-center items-center gap-2">
            <em>{open ? "Close Projects" : "View Projects"}</em>
            {/* <span className="arrowIcon">
              <FaLongArrowAltRight />
            </span> */}
          </p>
        </span>
      </button>
    </Stairs>
  );
}

export default Project;
