export interface LoginResponse {
  response: {
    tokenApp: string;
    rolUser: string;
  };
  status: number;
  message: string;
  name: string;
}
