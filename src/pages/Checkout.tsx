import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import emptyCart from "../assets/empty-cart.png";
import { Link } from "react-router-dom";
import { useGetRestaurant } from "@/api/RestaurantApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bike } from "lucide-react";
import RestaurantFeatures from "@/components/Restaurant/RestaurantFeatures";

type Props = {};

const Checkout = (props: Props) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const restaurantId = useSelector(
    (state: RootState) => state.cart.restaurantId
  );
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  console.log("restaurant", restaurant);

  if (isLoading || !restaurant) {
    return "Loading...";
  }

  return (
    <div className="w-full">
      {cartItems.length === 0 ? (
        <>
          <div className="flex flex-col items-center justify-center py-5">
            <img src={emptyCart} alt="empty cart" className="w-[350px]" />
            <h1 className="text-xl font-semibold pt-3 text-gray-600">
              Your cart is empty
            </h1>
            <p className="font-normal text-gray-400">
              You can go to home page to view more restaurants
            </p>
            <Link
              to="/"
              className="bg-rose-500 mt-4 px-4 py-2 rounded-md text-white font-semibold"
            >
              See restaurants near you
            </Link>
          </div>
        </>
      ) : (
        <>
          <Card>
            <CardHeader>
              <div className="flex gap-3">
                <img src={restaurant.imageUrl} className="w-[150px] " />
                <div>
                  <CardTitle>{restaurant.restaurantName}</CardTitle>
                  <CardDescription>
                    <div className="pt-2">
                      {restaurant.cuisines.map((cuisine) => (
                        <span>{`${cuisine}, `}</span>
                      ))}
                    </div>
                    <div className="w-[300px]">
                      <RestaurantFeatures
                        city={restaurant.city}
                        estimatedDeliveryTime={restaurant.estimatedDeliveryTime}
                      />
                    </div>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default Checkout;
