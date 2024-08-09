import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType } from "../types";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "@/redux/reducers/cartSlice";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();

  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const addToCart = (menuItem: MenuItemType) => {
    if (!restaurantId) return;

    dispatch(addItem({ ...menuItem, restaurantId: restaurantId }));
  };

  const removeFromCart = (menuItem: MenuItemType) => {
    if (!restaurantId) return;
    dispatch(removeItem({ _id: menuItem._id, restaurantId: restaurantId }));
  };

  if (isLoading || !restaurant) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
              removeFromCart={() => removeFromCart(menuItem)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
