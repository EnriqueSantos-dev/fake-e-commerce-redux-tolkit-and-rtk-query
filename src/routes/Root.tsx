import { Header } from '~/components';

import { Outlet, ScrollRestoration } from 'react-router-dom';

export function Root() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)] w-full bg-slate-100 px-6 md:px-0">
        <Outlet />
        <ScrollRestoration getKey={(location) => location.pathname} />
      </main>
    </>
  );
}
