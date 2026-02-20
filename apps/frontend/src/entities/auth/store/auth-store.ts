import { createEffect, createStore } from 'effector';
import {
  getCurrentUserGenReq,
  loginGenReq,
  logoutGenReq,
  signupGenReq,
  type LoginData,
  type SignupData,
  type UserUserProfile,
} from '@generated/api';
import type { LoadingStatus } from '@/shared/lib/types';
import { mainApiClient } from '@/shared/api/main-api-client';

type AuthState = {
  user: UserUserProfile | null;
  loadStatus: LoadingStatus;
};

export const $authState = createStore<AuthState>({
  user: null,
  loadStatus: 'not_loaded',
});

export const submitLoginFormFx = createEffect(
  async (payload: LoginData['body']) => {
    await loginGenReq({
      client: mainApiClient,
      body: payload,
      throwOnError: false,
    });

    return (
      (await getCurrentUserGenReq({
        client: mainApiClient,
        throwOnError: false,
      })) ?? null
    );
  }
);

export const submitSignUpFormFx = createEffect(
  async (payload: SignupData['body']) => {
    await signupGenReq({
      client: mainApiClient,
      body: payload,
      throwOnError: false,
    });

    return (
      (await getCurrentUserGenReq({
        client: mainApiClient,
        throwOnError: false,
      })) ?? null
    );
  }
);

export const fetchAuthorizedUserFx = createEffect(async () => {
  return (
    (await getCurrentUserGenReq({
      client: mainApiClient,
      throwOnError: false,
    })) ?? null
  );
});

export const submitLogoutFx = createEffect(async () => {
  await logoutGenReq({
    client: mainApiClient,
    throwOnError: false,
  });

  return null;
});

$authState
  .on(fetchAuthorizedUserFx, (state) => ({
    ...state,
    loadStatus: 'loading',
  }))
  .on(submitLoginFormFx, (state) => ({
    ...state,
    loadStatus: 'loading',
  }))
  .on(submitSignUpFormFx, (state) => ({
    ...state,
    loadStatus: 'loading',
  }))
  .on(submitLogoutFx, (state) => ({
    ...state,
    loadStatus: 'loading',
  }))
  .on(fetchAuthorizedUserFx.doneData, (_, user) => ({
    user,
    loadStatus: 'loaded',
  }))
  .on(submitLoginFormFx.doneData, (_, user) => ({
    user,
    loadStatus: 'loaded',
  }))
  .on(submitSignUpFormFx.doneData, (_, user) => ({
    user,
    loadStatus: 'loaded',
  }))
  .on(submitLogoutFx.doneData, (_, user) => ({
    user,
    loadStatus: 'loaded',
  }));
