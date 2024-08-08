import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
        <img src={logo} alt="food-app" className="w-[150px]"/>
        </span>
        <span className="text-stone-400	 font-thin tracking-tight flex gap-4">
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
          <Link to="#">Sitemap</Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
