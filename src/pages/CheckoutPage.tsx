import { useDispatch, useSelector } from "react-redux";
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
import RestaurantFeatures from "@/components/Restaurant/RestaurantFeatures";
import MenuItem from "@/components/MenuItem";
import { MenuItem as MenuItemType } from "@/types";
import { addItem, removeItem } from "@/redux/reducers/cartSlice";
import OrderSummary from "@/components/OrderSummary";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";

type Props = {};

const CheckoutPage = (props: Props) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const restaurantId = useSelector(
    (state: RootState) => state.cart.restaurantId
  );

  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const addToCart = (menuItem: MenuItemType) => {
    if (!restaurant?._id) return;

    dispatch(addItem({ ...menuItem, restaurantId: restaurantId }));
  };

  const removeFromCart = (menuItem: MenuItemType) => {
    if (!restaurant?._id) return;
    dispatch(removeItem({ _id: menuItem._id, restaurantId: restaurantId }));
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

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
          <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
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
                          estimatedDeliveryTime={
                            restaurant.estimatedDeliveryTime
                          }
                        />
                      </div>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {cartItems.map((menuItem) => (
                  <MenuItem
                    menuItem={menuItem}
                    addToCart={() => addToCart(menuItem)}
                    removeFromCart={() => removeFromCart(menuItem)}
                  />
                ))}
              </CardContent>
            </Card>
            <div>
              <Card>
                <OrderSummary restaurant={restaurant} cartItems={cartItems} />
                <CardFooter>
                  <CheckoutButton
                    disabled={cartItems.length === 0}
                    onCheckout={onCheckout}
                    isLoading={isCheckoutLoading}
                  />
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
