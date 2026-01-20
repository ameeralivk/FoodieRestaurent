
import { CartVariant } from "../types/cart";
const unwrapVariant = (
  variant: CartVariant | null | undefined | { toObject?: () => any }
): CartVariant | null => {
  if (!variant) return null;

  if (typeof (variant as any).toObject === "function") {
    return (variant as any).toObject();
  }

  return variant as CartVariant;
};

export default unwrapVariant