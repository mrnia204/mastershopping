import Link from 'next/link';
import { auth } from '@/auth';
import { signOutUser } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';


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
          <div className="flex">
            <Button 
              variant='ghost' 
              className='relative w-8 h-8 rounded-full ml-2 flex  justify-center bg-orange-500'
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent 
            className='flex-col justify-start items-start px-4' 
            align='end' 
            forceMount 
            sideOffset={5}
            style={{ zIndex: 9999 }}
          >
            <DropdownMenuLabel className='font-normal'>
              {session.user?.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className='text-sm text-gray-500 mb-2'>
              {session.user?.email}
            </DropdownMenuLabel>
            
            <DropdownMenuItem onClick={signOutUser}>
              <Button
                variant='outline'
                className='w-full'
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