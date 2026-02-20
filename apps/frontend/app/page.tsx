'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUnit } from 'effector-react';
import { $authState, submitLogoutFx } from '@/entities/auth/store';
import { Button } from '@/shared/components/ui/button';

export default function Home() {
  const router = useRouter();
  const [authState, logout] = useUnit([$authState, submitLogoutFx]);
  const isLoading = authState.loadStatus === 'loading';
  const authorizedUser = authState.user;

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  if (authState.loadStatus === 'not_loaded' || isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!authorizedUser) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="w-[420px] p-6 rounded bg-secondary flex flex-col gap-4">
          <div className="text-center">You are not authenticated</div>

          <div className="flex gap-2 justify-center">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-[420px] p-6 rounded bg-secondary flex flex-col gap-4">
        <div className="text-center">
          You are logged in as <strong>{authorizedUser.username}</strong>
        </div>

        <Button onClick={handleLogout} disabled={isLoading}>
          {isLoading ? 'Logging out...' : 'Log out'}
        </Button>
      </div>
    </div>
  );
}
