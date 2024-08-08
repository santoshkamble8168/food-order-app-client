"use client";

import * as React from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Cities } from "@/config/city-options-config";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "@/redux/reducers/citySlice";
import { RootState } from "@/redux/store";

export function CitySelect() {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state: RootState) => state.city.name);
  const [open, setOpen] = React.useState(false);

  const selectedCityLabel = React.useMemo(
    () => Cities.find((city) => city.value === selectedCity)?.label,
    [selectedCity]
  );

  const handleCitySelect = React.useCallback(
    (cityValue: string) => {
      dispatch(setCity(cityValue));
      setOpen(false);
    },
    [dispatch]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 opacity-50" />
            {selectedCityLabel || "Select City..."}
          </span>

          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search city..." />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              {Cities.map((city) => (
                <CommandItem
                  key={city.value}
                  value={city.value}
                  onSelect={() => handleCitySelect(city.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCity === city.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {city.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
