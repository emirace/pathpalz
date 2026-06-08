import { IPData } from "@/types/location";
import axios from "axios";

export const fetchIPInfo = async (): Promise<IPData | null> => {
  const response = await axios.get<IPData>("https://ipinfo.io");
  return response.data;
};
