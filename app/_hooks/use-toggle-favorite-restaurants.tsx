import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { useRouter } from "next/navigation";

interface UseToggleFavoriteRestaurantProps {
  userId?: string;
  restaurantId: string;
  restaurantIsFavorite?: boolean;
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorite,
}: UseToggleFavoriteRestaurantProps) => {
  const router = useRouter();
  const handleFavoriteClick = async () => {
    if (!userId) return;

    try {
      await toggleFavoriteRestaurant(userId, restaurantId);

      toast(
        restaurantIsFavorite
          ? "Restaurante removido dos favoritos!"
          : "Restaurante adicionado aos favoritos",
        {
          action: {
            label: "Ver meus favoritos",
            onClick: () => router.push("/my-favorites-restaurants"),
          },
        },
      );
    } catch (error) {
      toast.error("Falha ao favoritar");
    }
  };
  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;
