import { createEffect, createStore } from 'effector';
import { signupGenReq, type SignupData } from '@generated/api';
import { mainApiClient } from '@/shared/api/main-api-client';

type SignUpStoreState = {
  signUpSuccess: boolean;
};

const initialSignUpStoreState: SignUpStoreState = {
  signUpSuccess: false,
};

export const $signUpStore = createStore<SignUpStoreState>(
  initialSignUpStoreState
);

export const submitSignUpFormFx = createEffect(
  async (payload: SignupData['body']) => {
    try {
      await signupGenReq({
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

$signUpStore.on(submitSignUpFormFx.doneData, (state, { success }) => {
  return {
    ...state,
    signUpSuccess: success,
  };
});
