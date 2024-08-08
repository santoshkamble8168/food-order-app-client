import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import AvatarIcon from "./AvatarIcon";
import { Store, User, LogOut } from "lucide-react";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();

  console.log("user", user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 hover:text-rose-500 gap-2">
        {user?.name}
        <AvatarIcon imageUrl={user?.picture} name={user?.name} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to="/manage-restaurant"
            className="flex items-center gap-3 hover:text-rose-500"
          >
            <Store className="h-4 w-4 shrink-0 opacity-50" />
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/user-profile"
            className="flex items-center gap-3 hover:text-rose-500"
          >
            <User className="h-4 w-4 shrink-0 opacity-50" />
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Link
            to="#"
            className="flex items-center gap-3 hover:text-rose-500"
            onClick={() => logout()}
          >
            <LogOut className="h-4 w-4 shrink-0 opacity-50" />
            Log Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
