import { FaGithub } from "react-icons/fa";
import { useTheme, colors } from '../context/Themes';

function Footer() {
  const { theme } = useTheme();
  return (
    <div className={`p-4 w-full text-center`}>
      <footer>
        <p className={`text-sm ${colors[theme].footer}`}>
          Desenvolvido por{" "}
          <a
          className="font-bold hover:underline inline-flex items-center gap-1"
            href="https://github.com/juliocedraz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Julio Cedraz
            <FaGithub
              size={16}
              className="inline-block"
            />
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Footer;