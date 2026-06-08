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

export interface IJoinWaitingListRequest {
  full_name: string;
  email: string;
  training_track_id: number;
}

export interface IJoinWaitingListResponse {
  message: string;
  success: boolean;
  data: {
    full_name: string;
    email: string;
    training_track_id: number;
    id: number;
    created_at: string;
    updated_at: string;
  }
}

export interface IGetWaitingList {
  message: string;
  succcess: boolean;
  data: {
    id: number;
    full_name: string;
    email: string;
    training_track_id: number;
    type_id: string;
    sub_type_id: string;
    status: string;
    notified_at: string;
    created_at: string;
    updated_at: string;
    track: ITrack;
    type: any;
    sub_type: any;
  }
}