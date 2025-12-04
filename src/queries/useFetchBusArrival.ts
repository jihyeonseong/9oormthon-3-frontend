import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_PREFIX, URLS } from "./consts";

const useFetchBusArrivalQueryKey = [URLS.BUS_ARRIVAL];

type BusInfoResponse = {
  ARRV_STATION_ID: number;
  CURR_STATION_ID: number;
  CURR_STATION_NM: string;
  LOW_PLATE_TP: "N" | "Y";
  PLATE_NO: string;
  PREDICT_TRAV_TM: number;
  REMAIN_STATION: number;
  ROUTE_ID: number;
  ROUTE_NUM: string;
  ROUTE_SUB_NM: string;
  VH_ID: number;
};

const fetchBusArrival = async (
  stationId: string
): Promise<BusInfoResponse[]> => {
  const { data } = await axios.get(
    `${API_PREFIX}${URLS.BUS_ARRIVAL}?station_id=${stationId}`
  );
  return data.data;
};

export const useFetchBusArrival = ({ stationId }: { stationId: string }) => {
  return useQuery({
    queryKey: [...useFetchBusArrivalQueryKey, stationId],
    queryFn: () => fetchBusArrival(stationId),
  });
};
