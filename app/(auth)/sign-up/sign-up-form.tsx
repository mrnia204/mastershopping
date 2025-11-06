'use client';

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { signUpDefaultValus } from "@/lib/constants";
import { signUpUser} from "@/lib/actions/user.actions";


const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false, 
    message: ""
  }); 

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignUpButton = () => {
    const { pending} = useFormStatus();

    return (
      <Button className="w-full" variant='default'>
        { pending ? 'Submitting...' : 'Sign up'}
      </Button>
    )
  }

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name" className="pb-2">Full Name</Label>
          <Input 
            id="name" 
            name="name" 
            type="text" 
            required 
            autoComplete="name"
            defaultValue={signUpDefaultValus.name}
            placeholder="Full Name"
          />
        </div>
        <div>
          <Label htmlFor="email" className="pb-2">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            required 
            autoComplete="email"
            defaultValue={signUpDefaultValus.email}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <Label htmlFor="password" className="pb-2">Password</Label>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            required 
            autoComplete="password"
            defaultValue={signUpDefaultValus.password}
            placeholder="Password"
          />
        </div>
        <div>
          <Label htmlFor="password" className="pb-2">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            name="confirmPassword" 
            type="password" 
            required 
            autoComplete="confirmPassword"
            defaultValue={signUpDefaultValus.confirmPassword}
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        { data && !data.success && (
          <div className="text-center text-destructive">
            { data.message }
          </div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          Already have an account? {' '}
          <Link href='/sign-in' target="_self" className="link">Sign In</Link>
        </div>
      </div>
    </form>
  );
}
 
export default SignUpForm;