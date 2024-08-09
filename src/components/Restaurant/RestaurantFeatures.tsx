import { Drumstick, MapPinIcon, Salad, Timer } from "lucide-react";

type Props = {
  city: string;
  estimatedDeliveryTime: number;
};

const RestaurantFeatures = ({ city, estimatedDeliveryTime }: Props) => {
  return (
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center gap-1 mt-2">
        <MapPinIcon className="w-5 h-5 opacity-50" /> {city}
      </div>
      <div className="flex items-center gap-1 mt-2">
        <Timer className="w-5 h-5 opacity-50" /> {estimatedDeliveryTime} min
      </div>
      <div className="flex items-center gap-1 mt-2">
        <Salad className="w-5 h-5 opacity-50 text-green-500" />{" "}
        <Drumstick className="w-5 h-5 opacity-50 text-red-500" />{" "}
      </div>
    </div>
  );
};

export default RestaurantFeatures;
