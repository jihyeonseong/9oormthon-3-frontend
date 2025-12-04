import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useFetchBusInfoQueryKey = ["searchArrivalInfoList"];

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

const fetchBusInfo = async (stationId: string): Promise<BusInfoResponse[]> => {
  const { data } = await axios.get(`/api/busInfo?station_id=${stationId}`);
  return data;
};

export const useFetchBusInfo = ({ stationId }: { stationId: string }) => {
  return useQuery({
    queryKey: [...useFetchBusInfoQueryKey, stationId],
    queryFn: () => fetchBusInfo(stationId),
  });
};
