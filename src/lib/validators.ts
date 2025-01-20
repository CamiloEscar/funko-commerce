import { z } from "zod";
import { JSONContent } from "@tiptap/react";

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

const isContentEmpty = (value: JSONContent): boolean => {
  if (!value || !Array.isArray(value.content) || value.content.length === 0) {
    return true;
  }
  return value.content.some(
    (node) =>
      node.type === "paragraph" &&
      node.content &&
      Array.isArray(node.content) &&
      node.content.some(
        (textNode) =>
          textNode.type === "text" &&
          textNode.text &&
          textNode.text.trim() !== ""
      )
  );
};

export const productSchema = z.object({
  name: z.string().min(1, "El nombre del producto es requerido"),
  brand: z.string().min(1, "El producto es requerido"),
  slug: z
    .string()
    .min(1, "El slug es obligatorio")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido"),
  features: z.array(
    z.object({
      value: z.string().min(1, "La caracteristica no puede estar vacia"),
    })
  ),
  description: z.custom<JSONContent>((value) => !isContentEmpty(value), {
    message: "La descripcion no puede estar vacia",
  }),
  variants: z
    .array(
      z.object({
        id: z.string().optional(),
        stock: z.number().min(1, "El stock debe ser mayor a 0"),
        price: z.number().min(0.01, "El precio debe ser mayor a 0"),
        storage: z.string().min(1, "El almacenamiento es requerido"),
        color: z
          .string()
          .regex(
            /^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})|(rgb|hsl)a?\(\s*([0-9]{1,3}\s*,\s*){2}[0-9]{1,3}\s*(,\s*(0|1|0?\.\d+))?\s*\))$/,
            "El color debe ser un valor válido en formato hexadecimal, RGB o HSL"
          ),
        colorName: z.string().min(1, "El color debe ser obligatorio"),
      })
    )
    .min(1, "Debe haber al menos una variante"),
  images: z.array(z.any()).min(1, "Debe haber al menos una imagen"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
