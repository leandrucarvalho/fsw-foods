"use client";

import { Button } from "@/app/_components/ui/button";
import { isRestaurantFavorited } from "@/app/_helpers/restaurant";
import useToggleFavoriteRestaurant from "@/app/_hooks/use-toggle-favorite-restaurants";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl" | "id">;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const RestaurantImage = ({
  restaurant,
  userFavoriteRestaurants,
}: RestaurantImageProps) => {
  const { data } = useSession();
  const router = useRouter();

  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavoriteRestaurants,
  );

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    userId: data?.user.id,
    restaurantId: restaurant.id,
    restaurantIsFavorite: isFavorite,
  });

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className={`absolute right-4 top-4 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
