import axios from "axios";
import { useQuery } from "react-query";
import { TData } from "../types";

/*
 *Used to get location name from coordinates
 */
export const useGeoCoder = (lng: number, lat: number) => {
  const url = `http://api.positionstack.com/v1/reverse?access_key=${import.meta.env.VITE_API_KEY}&query=${lng},${lat}&limit=1`;

  const { data, isLoading } = useQuery<TData>({
    queryKey: ["location", lat, lng],
    queryFn: async () =>
      await axios
        .get(url)
        .then((res) => res.data)
        .catch((err) => err),
  });

  return { data, isLoading };
};
