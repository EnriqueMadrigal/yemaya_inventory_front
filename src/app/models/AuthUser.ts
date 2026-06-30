
export interface UserAuthData {
data: AuthUserResponse;
}


export interface AuthUserResponse {
user_id: number;
token: string;
email: string;
user_type: number;
}


