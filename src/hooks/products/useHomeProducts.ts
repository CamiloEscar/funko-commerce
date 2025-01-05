import { useQueries } from "@tanstack/react-query";
import { getRandomProducts, getRecentProducts } from "../../actions";

export const useHomeProducts = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["recentProducts"],
        queryFn: getRecentProducts,
      },
      {
        queryKey: ["popularFunctions"],
        queryFn: getRandomProducts,
      },
    ],
  });

  const [recentProductsResult, popularProductsResult] = results; //[resultadoquery1, resultadoquery2]

  //combinar los estados de las consultas
  //y de volver un objeto con los datos

  const isLoading =
    recentProductsResult.isLoading || popularProductsResult.isLoading;
  const isError = recentProductsResult.isError || popularProductsResult.isError;

  return {
    recentProducts: recentProductsResult.data || [],
    popularProducts: popularProductsResult.data || [],
    isLoading,
    isError,
    //Agregar funciones para manejar los resultados y las llamadas asíncronas
  };
};
