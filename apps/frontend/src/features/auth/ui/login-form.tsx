'use client';

import { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import { Button } from '@shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { $authorizedUser, submitLoginFormFx } from '@/entities/auth/store';

type LoginFormProps = {
  loginSuccessCallback?: () => void;
};

export function LoginForm(props: LoginFormProps) {
  const [authorizedUser, submitForm] = useUnit([
    $authorizedUser,
    submitLoginFormFx,
  ]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginSuccessCallback } = props;

  useEffect(() => {
    if (authorizedUser !== null) {
      loginSuccessCallback?.();
    }
  }, [authorizedUser, loginSuccessCallback]);

  return (
    <div className="w-full h-full p-4 rounded">
      <div className="w-full flex justify-center">Login</div>

      <div className="flex flex-col gap-3">
        <Input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <Button onClick={() => submitForm({ username, password })}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
