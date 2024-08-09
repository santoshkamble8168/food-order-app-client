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
import { useNavigate } from "react-router-dom";
import RestaurantFeatures from "./RestaurantFeatures";

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

  const { results: restaurants, isLoading } = useSearchRestaurants(
    searchState,
    city
  );

  React.useEffect(() => {
    setSearchState((prevState) => ({
      ...prevState,
      city,
    }));
  }, [city]);

  const handleMenuSelect = (restaurant: Restaurant) => {
    console.log(restaurant);
    navigate(`/detail/${restaurant._id}`);
  };

  if (!restaurants?.data || !city) {
    return <span>No results found</span>;
  }

  if (isLoading) {
    return <span>Loading...</span>;
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
                      <RestaurantFeatures
                        city={restaurant.city}
                        estimatedDeliveryTime={restaurant.estimatedDeliveryTime}
                      />
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
