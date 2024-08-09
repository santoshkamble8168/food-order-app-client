import { Link, useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import logo from "../assets/logo.png";
import { CitySelect } from "./CitySelect";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Header = () => {
  const navigate = useNavigate();
  const selectedCity = useSelector((state: RootState) => state.city.name);

  return (
    <div className="border-b-2 border-b-rose-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link
            to="/"
            className="text-3xl font-bold tracking-tight text-orange-500"
          >
            <img src={logo} alt="food-app" className="w-[150px]" />
          </Link>
          <CitySelect />
          <Button
            className="bg-white border-0"
            onClick={() =>
              selectedCity ? navigate(`/search/${selectedCity}`) : null
            }
          >
            <Search className="opacity-50 text-gray-400" />
            <span className="text-gray-400">Search</span>
          </Button>
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
