import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../actions"


export const useProducts = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts(),
        staleTime: 1000 * 60 * 5, //una hora
    });

    return { products: data, isLoading}
}