export interface IApiResponse<T = any> {
  message?: string;
  data: T;
}

export interface IAdminTrackCreatePayload {
  title: string;
  slug: string;
  description: string;
  duration_weeks: number;
  price: number;
  status: string;
}

export interface IAdminTrackUpdatePayload {
  title?: string;
  description?: string;
  duration_weeks?: number;
  price?: number;
  status?: string;
}

export interface IType {
  id: number;
  training_track_id: number;
  title: string;
  description: string;
  price: string;
  created_at: string;
  updated_at: string;
  sub_types?: ISubType[];
}

export interface ITypeCreatePayload {
  training_track_id: number;
  title: string;
  description: string;
  price: string;
}

export interface ITypeUpdatePayload {
  training_track_id?: number;
  title?: string;
  description?: string;
  price?: string;
}

export interface ISubType {
  id: number;
  training_track_id: number;
  type_id: number;
  title: string;
  description: string;
  price: string;
  created_at: string;
  updated_at: string;
  type?: IType;
}

export interface ISubTypeCreatePayload {
  training_track_id: number;
  type_id: number;
  title: string;
  description: string;
  price: string;
}

export interface ISubTypeUpdatePayload {
  training_track_id?: number;
  type_id?: number;
  title?: string;
  description?: string;
  price?: string;
}

export interface ICourseModuleHeader {
  id: number;
  training_track_id: number;
  type_id: number;
  sub_type_id: number;
  title: string;
  created_at: string;
  updated_at: string;
  modules?: any[];
}

export interface ICourseModuleHeaderCreatePayload {
  training_track_id: number;
  type_id: number;
  sub_type_id: number;
  title: string;
}

export interface ICourseModuleHeaderUpdatePayload {
  training_track_id?: number;
  type_id?: number;
  sub_type_id?: number;
  title?: string;
}

export interface ICourseModule {
  id: number;
  training_track_id: number;
  type_id: number;
  sub_type_id: number;
  course_module_header_id: number;
  title: string;
  created_at: string;
  updated_at: string;
  header?: ICourseModuleHeader;
}

export interface ICourseModuleCreatePayload {
  training_track_id: number;
  type_id: number;
  sub_type_id: number;
  course_module_header_id: number;
  title: string;
}

export interface ICourseModuleUpdatePayload {
  training_track_id?: number;
  type_id?: number;
  sub_type_id?: number;
  course_module_header_id?: number;
  title?: string;
}
