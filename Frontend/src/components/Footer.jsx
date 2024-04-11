import { faXTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="pt-10">
      <div className="flex items-center justify-between w-full py-4 px-16 bg-gray-300 ">
        <span className="w-[45%] ">Designed and Developed by Opeyemi Aderemi</span>
        <span className="w-[32%]">
          <p>Copyright &copy; 2024</p>
        </span>
        <span className="space-x-10 w-[23%]">
          <a href="https://github.com/Amplejohnny" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} size="lg" className="hover:text-white" />
          </a>
          <a href="https://linkedin.com/in/amplejohnny" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="lg" className="hover:text-white" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faXTwitter} size="lg" className="hover:text-white" />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;