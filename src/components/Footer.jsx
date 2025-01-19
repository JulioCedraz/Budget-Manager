import React from "react";
import { FaGithub } from "react-icons/fa";
import { useTheme, themeColors } from './Themes.jsx';

function Footer() {
  const { theme } = useTheme();
  return (
    <div className={`fixed bottom-0 w-full p-2 text-center ${themeColors[theme].background}`}>
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
              color={`${theme === 'light' ? 'black' : 'white'}`}
              className="inline-block ml-1 mb-1.5"
            />
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Footer;