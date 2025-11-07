'use client';
import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, } from "lucide-react";
import { toast } from 'sonner';
import { addItemToCart } from "@/lib/actions/cart.actions";



const AddToCart = ({ item }: { item: CartItem}) => {
  const router = useRouter();

  const addToCardHandler = async() => {
    const res = await addItemToCart(item);

    if (!res.success){
      toast.error(res.message);

      return;
    }
    // Handle success add to cart
    toast.success(res.message, {
      action: {
        label: "Go to Cart", // built in soonner action button
        onClick: () => router.push('/cart'),
      }
    });

  }
  
  return (
    <Button type="button" className="w-full cursor-pointer" onClick={addToCardHandler}>
      <Plus /> Add To Cart
    </Button>
  );
}
 
export default AddToCart;