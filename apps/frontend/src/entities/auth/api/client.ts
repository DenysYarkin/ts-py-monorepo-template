import axios from 'axios';
import { LoginDto, LoginResponseDto } from '../types';
import { BaseApi } from '@/shared/api/base-api';
import { SignUpDto, SignUpResponseDto } from '../types/signup-dto';

export class AuthApi extends BaseApi {
  async login(params: LoginDto): Promise<LoginResponseDto> {
    const res = await axios.post(`${this.baseUrl}/auth/login`, params);
    return res.data;
  }

  async signUp(params: SignUpDto): Promise<SignUpResponseDto> {
    const res = await axios.post(`${this.baseUrl}/auth/signup`, params);
    return res.data;
  }

  async isAuthenticated(): Promise<boolean> {
    const res = await axios.get(`${this.baseUrl}/auth/is-authenticated`);
    return res.data.success;
  }
}

export const authClient = new AuthApi({
  baseUrl: '/api/proxy/main-api',
});
