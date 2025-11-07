import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart  } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import UserButton from "./user-button";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button asChild variant="ghost">
          <Link href="/cart">
            <ShoppingCart /> Cart
          </Link>
        </Button>
        <UserButton />
      </nav>

      {/* Mobile Menu */}
      <nav className="md:hidden flex justify-end">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start p-4 ouverflow-auto max-h-[80vh]">
            <SheetTitle>Menu</SheetTitle>
            <div className="w-full flex justify-end">
              <ModeToggle />
            </div>
            <Button asChild variant="ghost" className="w-full flex justify-end">
              <Link href='/cart'>
                <ShoppingCart /> Cart
              </Link>
            </Button>
            <div className="w-full flex justify-end mt-4">
              <UserButton />
            </div>
            <SheetDescription />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
 
export default Menu;