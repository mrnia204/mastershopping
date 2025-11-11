import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

const currency = z.coerce.number().refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))), 
    'Price must have exactely 2 demical places'
  );

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  category: z.string().min(3, 'Category must be at least 3 characters'),
  brand: z.string().min(3, 'Brand must be at least 3 characters'),
  description: z.string().min(3, 'Slug must be at least 3 characters'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have at least once image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
  numReviews: z.number().default(0),
});


// Shema for siging user in
export const signInFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, "Password must be at least 6 characters."),
});


// Shema for siging up a user
export const signUpFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});


// Cart schemas
export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  qty: z.int().int().nonnegative('Quantatiy must be a postive integer'),
  image: z.string().min(1, 'Image is required'),
  price: currency,
})


export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, 'Session Cart ID is required'),
  userId: z.string().optional().nullable(),
});

// Shema for the shipping address
export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, 'Name must be at leaset 3 characters'),
  streetAddress: z.string().min(3, 'Address must be at leaset 3 characters'),
  city: z.string().min(3, 'City must be at leaset 3 characters'),
  postalCode: z.string().min(3, 'Postal Code must be at leaset 3 characters'),
  country: z.string().min(3, 'Country must be at leaset 3 characters'),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

