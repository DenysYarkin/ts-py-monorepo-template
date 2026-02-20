'use client';

import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $authState, fetchAuthorizedUserFx } from '@/entities/auth/store';

export function AuthBootstrap() {
  const [authState, fetchAuthorizedUser] = useUnit([
    $authState,
    fetchAuthorizedUserFx,
  ]);

  useEffect(() => {
    if (authState.loadStatus === 'not_loaded') {
      fetchAuthorizedUser();
    }
  }, [authState.loadStatus, fetchAuthorizedUser]);

  return null;
}
