import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import { MenuCarousel } from "@/components/Menu/MenuCarousel";
import { RestaurantCarousel } from "@/components/Restaurant/RestaurantCarousel";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const HomePage = () => {
  const selectedCity = useSelector((state: RootState) => state.city.name);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 mb-5">
        <h2 className="text-2xl font-bold">What's on your mind?</h2>
        <MenuCarousel />
      </div>

      <div className="flex flex-col gap-5 mb-5">
        <h2 className="text-2xl font-bold">
          Top restaurant chains {selectedCity ? `in ${selectedCity}` : ""}
        </h2>
        <RestaurantCarousel city={selectedCity} />
      </div>

      {/* <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div> */}
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the MernEats App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
