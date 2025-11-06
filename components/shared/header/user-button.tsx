import Link from 'next/link';
import { auth } from '@/auth';
import { signOutUser } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';


const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button asChild>
          <Link href="/sign-in">
            <UserIcon /> Sign In
          </Link>
      </Button>
    )
  };

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U'; 


  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button 
              variant='ghost' 
              className='relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-orange-500'
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent className='w-56' align='end' forceMount sideOffset={5}>
            <DropdownMenuLabel className='font-normal'>
              <div className="flex flex-col space-y-1 mb-1">
                <div className="text-sm font-medium leading-none px-2">
                  {session.user?.name}
                </div>
                <div className="text-sm text-muted-foreground leading-none px-2">
                  {session.user?.email}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem className='p-0 mb-1' onClick={signOutUser}>
              <Button
                variant='ghost'
                className='w-full py-4 px-2 h-4 justify-start'
              >
                Sign Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
}
 
export default UserButton;