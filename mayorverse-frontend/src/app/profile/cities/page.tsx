"use client";

import {CityCard} from "@/components/city/city-card";
import {Button} from "@/components/ui/button";
import {TCity} from "@/types";
import {CupStar} from "@solar-icons/react";
import {useAuth} from "@/hooks";
import {useCities} from "@/hooks/api/city/useCities";
import {Skeleton} from "@/components/ui";

export default function CitiesPage() {
  const {user} = useAuth();

  const {cities: createdCities, isLoading} = useCities({userId: user?.id});

  const array = Array.from({length: 6}).map((_, i) => i);

  return (
    <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {isLoading ? (
        array.map((item) => (
          <li key={item}>
            <Skeleton
              width={"100%"}
              height={240}
            />
          </li>
        ))
      ) : <>{createdCities?.length ? (
        createdCities.map((city: TCity) => (
          <li key={city.id}>
            <CityCard city={city} />
          </li>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <CupStar className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-medium mb-2">Not a mayor yet</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            You haven&apos;t founded or been elected mayor of any cities. Create
            your first city to get started!
          </p>
          <Button
            href="/create-city"
            className="mt-4"
            variant="primary"
          >
            Create City
          </Button>
        </div>
      )}</>}
    </ul>
  );
}
