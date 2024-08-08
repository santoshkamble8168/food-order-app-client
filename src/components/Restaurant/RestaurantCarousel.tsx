import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSearchRestaurants } from "@/api/RestaurantApi";
import { SearchState } from "@/pages/SearchPage";
import { Restaurant } from "@/types";
import { MapPinIcon, Timer, Salad, Drumstick } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  city: string;
};

export function RestaurantCarousel({ city }: Props) {
  const navigate = useNavigate();
  const [searchState, setSearchState] = React.useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const { results: restaurants } = useSearchRestaurants(searchState, city);

  console.log("restaurants", restaurants);

  const handleMenuSelect = (restaurant: Restaurant) => {
    console.log(restaurant);
    navigate(`/detail/${restaurant._id}`);
  };

  if (!restaurants?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {restaurants?.data.map((restaurant, index) => (
          <CarouselItem
            key={index}
            className="pl-1 md:basis-1/3 lg:basis-1/4 cursor-pointer"
            onClick={() => handleMenuSelect(restaurant)}
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-0">
                  <img src={restaurant.imageUrl} className="w-full h-[200px]" />
                  <CardHeader className="pt-4">
                    <CardTitle>{restaurant.restaurantName}</CardTitle>
                    <CardDescription>
                      <div className="w-72 whitespace-nowrap overflow-hidden text-ellipsis">
                        {restaurant.cuisines.map((cuisine) => `${cuisine}, `)}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 mt-2">
                          <MapPinIcon className="w-5 h-5 opacity-50" />{" "}
                          {restaurant.city}
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <Timer className="w-5 h-5 opacity-50" />{" "}
                          {restaurant.estimatedDeliveryTime} min
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <Salad className="w-5 h-5 opacity-50 text-green-500" />{" "}
                          <Drumstick className="w-5 h-5 opacity-50 text-red-500" />{" "}
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
