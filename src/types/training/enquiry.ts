import { ITrack } from "./tracks";

export interface IEnquiryRequest {
  full_name: string;
  email: string;
  type: string;
  training_track_id: number;
  motivation: string;
  experience_level: string;
  goal: string;
  availability: string;
  timeline: string;
  extra_notes: string;
}

export interface IEnquiryResponse {
  message: string;
  recommended_track: ITrack;
}
