import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Convert a prisma object into regular js object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const[int, decimal] =num.toString().split('.');
  const fixedDecimal = (decimal || '').padEnd(2, '0').slice(0,2);
  return `${int}.${fixedDecimal}`;
};

// can use this too.
// export const formatNumberWithDecimal = (num: number): string => num.toFixed(2);


// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
  if (error.name === 'ZodError' || error.name === 'TypeError') {
    // Handle Zod validation errors
    if (error.errors) {
      const fieldErrors = Object.keys(error.errors).map((field) => error.errors[field].message);
      return fieldErrors.join('. ');
    } else { 
      return error.message || 'Validation error occurred.'; // handle case where errors object is not present.
    }
  } else if (
    error.name === 'PrismaClientKnownRequestError' && 
    error.code === 'P2002') 
  {
    // Handle Prisma unique constraint violation
    const field = error.meta?.target ? error.meta.target[0] : 'field';

    return `${field.charAt(0).toUpperCase() + field.slice(1)}  already exists.`;
  } else {
    // Handle other errors
    return typeof error.message === 'string' ? error.message : JSON.stringify(error);
  }
}


// Round number to 2 decimal places
export function round2( value: number | string ) {
  if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error ("value is not number or string");
  }
}