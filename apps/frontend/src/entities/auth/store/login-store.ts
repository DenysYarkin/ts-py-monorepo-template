import { createEffect, createStore } from 'effector';
import { loginGenReq, type LoginData } from '@generated/api';
import { mainApiClient } from '@/shared/api/main-api-client';

type LoginStoreState = {
  loginSuccess: boolean;
};

const initialLoginStoreState: LoginStoreState = {
  loginSuccess: false,
};

export const $loginStore = createStore<LoginStoreState>(initialLoginStoreState);

export const submitLoginFormFx = createEffect(
  async (payload: LoginData['body']) => {
    try {
      await loginGenReq({
        client: mainApiClient,
        body: payload,
        throwOnError: true,
      });
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
);

$loginStore.on(submitLoginFormFx.doneData, (state, { success }) => {
  return {
    ...state,
    loginSuccess: success,
  };
});
