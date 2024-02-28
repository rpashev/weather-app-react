import { Outlet } from 'react-router-dom';
import { BaseHeader } from '../components/layout/BaseHeader';
import { BaseFooter } from '../components/layout/BaseFooter';

export const BaseLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-cyan-800">
      <BaseHeader />
      <main className="max-container flex flex-1 justify-center">
        <Outlet />
      </main>
      <BaseFooter />
    </div>
  );
};
