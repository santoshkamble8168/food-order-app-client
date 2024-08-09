import { useSelector } from "react-redux";
import { MenuItem as MenuItemType } from "../types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Plus, Minus } from "lucide-react";
import { RootState } from "@/redux/store";
import Currency from "./Restaurant/Currency";

type Props = {
  menuItem: MenuItemType;
  addToCart: () => void;
  removeFromCart: () => void;
};

const MenuItem = ({ menuItem, addToCart, removeFromCart }: Props) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isItemOnCart = cartItems.find((item) => item._id === menuItem._id);

  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div>
          <Currency>{(menuItem.price / 100).toFixed(2)}</Currency>
        </div>
        {isItemOnCart ? (
          <div className="flex items-center gap-2 rounded-sm border-rose-500">
            <Button
              size="icon"
              className="text-rose-500 border-transparent bg-white hover:bg-white"
              onClick={removeFromCart}
            >
              <Minus className="w-5" />
            </Button>
            <span className="text-xl font-semibold text-rose-500">
              {isItemOnCart.quantity}
            </span>
            <Button
              size="icon"
              className="text-rose-500 border-transparent border-none bg-white hover:bg-white"
              onClick={addToCart}
            >
              <Plus className="w-5" />
            </Button>
          </div>
        ) : (
          <Button
            className="text-rose-500 border-transparent border-none bg-white hover:bg-white w-[100px]"
            onClick={addToCart}
          >
            Add
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
