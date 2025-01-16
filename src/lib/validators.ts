import { z } from "zod";

export const userRegisterSchema = z.object({
  email: z.string().email("El correo no es valido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  fullName: z.string().min(1, "El nombre completo es requerido"),
  phone: z.string().optional(),
});

export const addressSchema = z.object({
  addressLine1: z
    .string()
    .min(1, "la direccion es requerida")
    .max(100, "la direccion no debe exceder los 100 caracteres"),
  addressLine2: z
    .string()
    .max(100, "la direccion no debe exceder los 100 caracteres")
    .optional(),
  city: z
    .string()
    .min(1, "la ciudad es requerida")
    .max(50, "la direccion no debe exceder los 100 caracteres"),
  state: z
    .string()
    .min(1, "el estado es requerida")
    .max(50, "el estado no debe exceder los 100 caracteres"),
  postalCode: z.string().max(10, "el codigo postal es requerido").optional(),
  country: z.string().min(1, "el pais es requerido"),
});

export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;

export type AddressFormValues = z.infer<typeof addressSchema>;
