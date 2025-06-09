"use client";

import {useParams} from "next/navigation";
import Image from "next/image";
import {TabNav} from "@/components/tab-nav";
import {Button} from "@/components/ui/button";
import {
  Calendar,
  MapPoint,
  Settings,
  Star,
  User,
  UsersGroupRounded,
} from "@solar-icons/react";
import {Skeleton} from "@/components/ui/skeleton";
import {useAuth} from "@/hooks/useAuth";
import {ReactNode, useState} from "react";
import {EditCityModal} from "@/components/city/edit-city-modal";
import {milestones} from "@/constants";
import {Modal} from "@/components/ui";
import {useCity} from "@/hooks/api/city/useCity";
import {useCreateCityFollow} from "@/hooks/api/follow/useCreateCityFollow";

export default function CityLayout({
                                     children,
                                   }: {
  children: ReactNode;
}) {
  const {cityId} = useParams<{ cityId: string }>();

  const {user} = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const {city, isLoading} = useCity(cityId as string);
  const cityFollow = user?.follows.find((follow) => follow.cityId === city?.id);
  const isFollowingCity = !!cityFollow;
  const {mutate} = useCreateCityFollow(city?.id);
  
  const tabs = [
    {
      title: "Posts",
      href: `/cities/${cityId}/posts`,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      title: "Polls",
      href: `/cities/${cityId}/polls`,
      icon: <Star className="w-5 h-5" />,
    },

    {
      title: "Gallery",
      href: `/cities/${cityId}/gallery`,
      icon: <MapPoint className="w-5 h-5" />,
    },
  ];

  if (!city) return null;

  return (
    <div className="grid min-h-[calc(100dvh_-_48px_-_66px)] grid-cols-1 lg:grid-cols-4 gap-6 p-4 md:p-6 text-white">
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={"New post"}
      >
        <form>post</form>
      </Modal>
      <aside className="lg:col-span-1 space-y-6">
        {/* City Cover */}
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-700 shadow-lg">
          {isLoading ? (
            <Skeleton full={true} />
          ) : (
            <>
              {city?.avatarUrl ? (
                <Image
                  src={city?.avatarUrl}
                  alt={`${city?.name} cover image`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <Skeleton full />
              )}
              {user?.id === city?.mayorId && (
                <button
                  onClick={() => setIsOpen(true)}
                  className="hover:cursor-pointer absolute z-10 right-4 top-4 group"
                >
                  <Settings className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors " />
                </button>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h1 className="text-2xl font-bold drop-shadow-lg">
                  {city?.name}
                </h1>
                <p className="text-sm text-gray-300 drop-shadow-md">
                  {city?.tags?.toString()}
                </p>
              </div>
            </>
          )}
        </div>

        {!isLoading && (
          <EditCityModal
            city={city}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}

        <div className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-xl border border-gray-700 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <UsersGroupRounded className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Population</p>
                {isLoading ? (
                  <Skeleton
                    width={"100%"}
                    height={14}
                  />
                ) : (
                  <p className="font-medium">
                    {city?.population?.toLocaleString()} (
                    {
                      milestones.findLast(
                        (milestone) => milestone.population <= city.population,
                      )?.title
                    }
                    )
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Followers</p>
                {isLoading ? (
                  <Skeleton
                    width={"100%"}
                    height={14}
                  />
                ) : (
                  <p className="font-medium">{city?.follows?.length}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPoint className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-400">Founded</p>
                {isLoading ? (
                  <Skeleton
                    width={"100%"}
                    height={14}
                  />
                ) : (
                  <p className="font-medium">
                    {new Date(city?.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
          {user?.id !== city?.mayorId && (
            <Button
              variant="primary"
              className="w-full"
              disabled={isLoading}
              onClick={() => mutate()}
            >
              {isFollowingCity ? "Following" : "Follow City"}
            </Button>
          )}
        </div>

        {/* Description */}
        <div className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-xl border border-gray-700">
          <h3 className="font-semibold mb-3">About</h3>
          {isLoading ? (
            <Skeleton
              width={"100%"}
              height={19}
            />
          ) : (
            <p className="text-sm text-gray-300 leading-relaxed">
              {city?.description}
            </p>
          )}
        </div>

        {/* Residents */}
        <div className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-xl border border-gray-700">
          <h3 className="font-semibold mb-3">Top Residents</h3>
          <div className="space-y-3">
            {city?.follows?.slice(0, 5).map(({follower}) => (
              <div
                key={follower?.id}
                className="flex items-center gap-3"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-600">
                  {follower?.avatarUrl ? (
                    <Image
                      src={follower?.avatarUrl ?? null}
                      alt={follower?.username}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="absolute -translate-1/2 top-1/2 left-1/2" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{follower?.username}</p>
                </div>
              </div>
            ))}
            {city?.follows?.length !== undefined &&
              city?.follows?.length > 5 && (
                <p className="text-xs text-gray-500 text-center">
                  +{city?.follows?.length - 5} more residents
                </p>
              )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:col-span-3 space-y-6">
        <TabNav
          tabs={tabs}
          isLoading={isLoading}
        />
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 p-5 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
