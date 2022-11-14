import axios from "axios";
import { useQuery } from "react-query";
import { TTrains } from "../types";

export const useTrainQuery = () =>
  useQuery<Array<TTrains>>({
    queryKey: ["trains"],
    queryFn: async () =>
      await axios
        .get("https://rata.digitraffic.fi/api/v1/train-locations/latest/")
        .then((res) => res.data)
        .catch((err) => err),
  });
