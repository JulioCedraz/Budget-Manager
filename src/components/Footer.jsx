import React from "react";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className="fixed bottom-0 w-full bg-gray-200 p-2 text-center text-gray-700">
      <footer>
        <p>
          Desenvolvido por{" "}
          <a
            href="https://github.com/juliocedraz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Julio Cedraz</strong>
            <FaGithub
              size={20}
              color="black"
              className="inline-block ml-1 mb-1.5"
            />
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Footer;
