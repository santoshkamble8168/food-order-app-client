import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const cartCount = useSelector((state: RootState) => state.cart.totalItems);

  return (
    <span className="flex space-x-4 items-center">
      <Link to={"/checkout"}>
        <div className="relative inline-flex items-center">
          <ShoppingBag className="w-6 h-6 text-gray-700" />
          <span className="absolute top-[-8px] right-[-12px] flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-rose-500 rounded-full">
            {cartCount}
          </span>
        </div>
      </Link>
      {isAuthenticated ? (
        <UsernameMenu />
      ) : (
        <Button
          variant="ghost"
          className=" hover:bg-white hover:text-rose-500"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainNav;
