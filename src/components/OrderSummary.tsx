import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import Currency from "./Restaurant/Currency";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
};

const OrderSummary = ({ restaurant, cartItems }: Props) => {
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <span>
              {item.name} x{"  "}
              <Badge variant="outline" className="mr-2 rounded-full">
                {item.quantity}
              </Badge>
            </span>
            <span className="flex items-center gap-1">
              <Currency>
                {((item.price * item.quantity) / 100).toFixed(2)}
              </Currency>
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <Currency>{(restaurant.deliveryPrice / 100).toFixed(2)}</Currency>
        </div>
        <Separator className="h-[2px] bg-gray-800" />
        <div className="flex items-center justify-between">
          <span className="font-semibold uppercase">To pay</span>
          <span className="font-semibold">
            <Currency>{getTotalCost()}</Currency>
          </span>
        </div>
      </CardContent>
    </>
  );
};

export default OrderSummary;
