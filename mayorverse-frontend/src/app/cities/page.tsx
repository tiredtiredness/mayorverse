"use client";

import {CityCard} from "@/components/city/city-card";
import {Skeleton} from "@/components/ui/skeleton";
import {useSearchParams} from "next/navigation";
import {useCities} from "@/hooks/api/city/useCities";
import {useTagSearch} from "@/hooks/useTagSearch";

export default function Cities() {
  const searchParams = useSearchParams();
  const tags = searchParams.get("tags")?.split(",") ?? [];
  const cityName = searchParams.get("name") ?? "";

  const {cities, isLoading} = useCities({name: cityName, tags});
  
  const {
    isAltPressed,
    selectedTags,
    handleTagClick
  } = useTagSearch();

  const array = Array.from({length: 15}).map((_, i) => i);

  return (
    <div className="p-4 min-h-[calc(100dvh_-_48px_-_66px)]">
      {/*TODO: add filters*/}

      <ul className="grid justify-center grid-cols-1 lg:grid-cols-[repeat(3,_minmax(0,_448px))] sm:grid-cols-[repeat(2,_minmax(0,_448px))] xl:grid-cols-[repeat(4,_minmax(0,_448px))] 2xl:grid-cols-[repeat(5,_minmax(0,_448px))]  gap-4">
        {isLoading
          ? array.map((i) => (
            <li key={i}>{<Skeleton
              width={"100%"}
              height={240}
            />}</li>
          ))
          : cities?.map((city) => (
            <li
              key={city.id}
              className="z-1"
            >
              <CityCard
                city={city}
                onClick={handleTagClick}
                selectedTags={isAltPressed || isLoading ? selectedTags : tags}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
