import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { memo, useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () =>
    decreaseProductQuantity(cartProduct.id);

  const handleIncreaseQuantityClick = () =>
    increaseProductQuantity(cartProduct.id);

  const handleRemoveClick = () => removeProductFromCart(cartProduct.id);

  return (
    <div className="flex items-center justify-between">
      {/* IMAGEM E INFO */}
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>
          {/* QUANTIDADE */}
          <div className="flex items-center text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 border border-solid border-muted-foreground"
            >
              <ChevronLeftIcon
                size={16}
                onClick={handleDecreaseQuantityClick}
              />
            </Button>
            <span className="block w-7 text-xs">{cartProduct.quantity}</span>
            <Button size="icon" className="h-7 w-7">
              <ChevronRightIcon
                size={16}
                onClick={handleIncreaseQuantityClick}
              />
            </Button>
          </div>
        </div>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7 border border-solid border-muted-foreground"
        onClick={handleRemoveClick}
      >
        <Trash2Icon size={16} />
      </Button>
    </div>
  );
};

export default memo(CartItem, (prevProps, nextProps) => {
  return prevProps.cartProduct.quantity === nextProps.cartProduct.quantity;
});
