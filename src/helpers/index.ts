import { Color, Product, VariantProduct } from "../interfaces";

//funcion para formatear el precio a dolares
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const prepareProducts = (products: Product[]) => {
  return products.map((product) => {
    //agrupar las variantes por color

    const colors = product.variants.reduce(
      (acc: Color[], variant: VariantProduct) => {
        const existingColor = acc.find((item) => item.color === variant.color);

        if (existingColor) {
          // si ya existe el color, compraramos los precios
          existingColor.price = Math.min(existingColor.price, variant.price);
        } //mantenemos el precio minimo
        else {
          acc.push({
            color: variant.color,
            price: variant.price,
            name: variant.color_name,
          });
        }
        return acc;
      },
      []
    );

    //obtener el precio mas bajo de las variantes agrupadas
    const price = Math.min(...colors.map((item) => item.price));

    //devolver el producto formateado
    return {
      ...product,
      price,
      colors: colors.map(({ name, color }) => ({ name, color })),
      variants: product.variants,
    };
  });
};

//funcion para formatear la fecha a formato dia de mes de año
export const formatDateLong = (date: string): string => {
  const dateObject = new Date(date);

  return dateObject.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

//Funcion para formatear la fecha a formato dd/mm/yyyy
export const formatDate = (date: string): string => {
  const dateObject = new Date(date);

  return dateObject.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
};

//FUNCION PARA OBTENER EL ESTADO DEL PEDIDO EN ESPAÑOL
export const getStatus = (status: string): string => {
  switch (status) {
    case "pending":
      return "Pendiente";
    case "Paid":
      return "Pagado";
    case "Shipped":
      return "Enviado";
    case "Delivered":
      return "Entregado";
    default:
      return "Desconocido";
  }
};

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

//funcion para extraer el path relativo al bucket de una url
export const extractFilePath = (url: string) => {
  const parts = url.split("/storage/v1/object/public/product-images/"); 
  // EJEMPLO ['storage/v1/object/public/product-images/' POSICION 1 =>  asdasdjhgasjdhvasjdvasjhdbashjdasd-funko-marvel.webp]
  if (parts.length !== 2) {
    throw new Error(`URL de la imagen no valida: ${url}`);
  }
  return parts[1];
};
