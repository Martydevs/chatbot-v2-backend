export default interface BaseResponse<T> {
  data: T,
  exception: null;
  success: true;
  requestDate: string;
  responseDate: string;
}