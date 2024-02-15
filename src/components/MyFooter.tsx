import React from "react";

function MyFooter() {
  return (
    <div className="bg-cyan-700 p-4 text-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <a href="/about" className="text-white hover:underline">
            LiLu
          </a>
          <a
            href="https://www.codeacademyberlin.com/"
            className="text-white hover:underline"
          >
            @ CodeAcademy Berlin
          </a>

          <div className="flex space-x-4">
            <a href="/contact" className="text-white hover:underline">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyFooter;
