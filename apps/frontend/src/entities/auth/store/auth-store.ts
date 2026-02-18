import { createEffect, createStore } from 'effector';
import {
  getCurrentUserGenReq,
  loginGenReq,
  signupGenReq,
  type LoginData,
  type SignupData,
  type UserUserProfile,
} from '@generated/api';
import { mainApiClient } from '@/shared/api/main-api-client';

export const $authorizedUser = createStore<UserUserProfile | null>(null);

export const submitLoginFormFx = createEffect(
  async (payload: LoginData['body']) => {
    try {
      await loginGenReq({
        client: mainApiClient,
        body: payload,
        throwOnError: true,
      });

      return await getCurrentUserGenReq({
        client: mainApiClient,
        throwOnError: true,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

export const submitSignUpFormFx = createEffect(
  async (payload: SignupData['body']) => {
    try {
      await signupGenReq({
        client: mainApiClient,
        body: payload,
        throwOnError: true,
      });

      return await getCurrentUserGenReq({
        client: mainApiClient,
        throwOnError: true,
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

$authorizedUser
  .on(submitLoginFormFx.doneData, (_, user) => user)
  .on(submitSignUpFormFx.doneData, (_, user) => user);
