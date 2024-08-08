import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
type menuItem = {
  name: string;
  image: string;
  url: string;
};
const menuItems = [
  {
    name: "Juice",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/1/6507461/32ececd9dbc305a85f62c448daba3a16.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    url: "",
  },
  {
    name: "Kababb",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/1/6507461/0c912063734ff522539278a7962688ce.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    url: "",
  },
  {
    name: "Cake",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/1/6507461/38e419b0e3c444cde26ea8927a83d1ad.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    url: "",
  },
  {
    name: "Pasta",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/1/6507461/ab4549d7812154a28651814ef22dae3c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    url: "",
  },
  {
    name: "Juice",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/1/6507461/32ececd9dbc305a85f62c448daba3a16.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    url: "",
  },
  {
    name: "Juice",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/1/6507461/32ececd9dbc305a85f62c448daba3a16.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    url: "",
  },
  {
    name: "Juice",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/1/6507461/32ececd9dbc305a85f62c448daba3a16.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    url: "",
  },
  {
    name: "Juice",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/1/6507461/32ececd9dbc305a85f62c448daba3a16.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    url: "",
  },
  {
    name: "Juice",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/1/6507461/32ececd9dbc305a85f62c448daba3a16.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    url: "",
  },
];
export function MenuCarousel() {
  const handleMenuSelect = (item: menuItem) => {
    console.log(item);
  };

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {menuItems.map((item, index) => (
          <CarouselItem
            key={index}
            className="pl-1 md:basis-1/3 lg:basis-1/6 cursor-pointer"
            onClick={() => handleMenuSelect(item)}
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-0 relative">
                  <img src={item.image} className="w-full" />
                  <div className="absolute bottom-0 p-1 bg-rose-400 bg-opacity-40 w-full text-center">
                    <span className="text-black">{item.name}</span>
                  </div>
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
