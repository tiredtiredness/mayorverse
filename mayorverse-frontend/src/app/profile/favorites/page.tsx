"use client";

import {CityCard} from "@/components/city/city-card";
import {Skeleton} from "@/components/ui/skeleton";
import {HeartAngle} from "@solar-icons/react";
import {useCities} from "@/hooks/api/city/useCities";
import {TCity} from "@/types";
import {useAuth} from "@/hooks";

export default function FavoritesPage() {
  const {user} = useAuth();

  const {cities: followedCities, isLoading} = useCities({
    userId: user?.id,
    isFollowing: true
  });

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
      ) : (
        <>
          {followedCities?.length ? (
            followedCities.map((city: TCity) => (
              <li key={city.id}>
                <CityCard
                  city={city}
                />
              </li>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <HeartAngle className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">
                No favorite cities yet
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Cities you mark as favorite will appear here. Start exploring to
                find cities you love!
              </p>
            </div>
          )}
        </>
      )}
    </ul>
  );
}
