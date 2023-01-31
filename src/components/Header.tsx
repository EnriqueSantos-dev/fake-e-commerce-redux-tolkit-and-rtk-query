import { Link } from 'react-router-dom';
import { Cart } from './Cart';

export function Header() {
  return (
    <header className="h-16 w-full border-b border-gray-200 bg-gray-50 px-6 shadow-md xl:px-0">
      <div className="container mx-auto flex h-full items-center justify-between">
        <Link
          to="/"
          preventScrollReset
          className="text-xl font-bold text-zinc-700 transition-opacity hover:opacity-70"
        >
          FakeShop
        </Link>
        <Cart />
      </div>
    </header>
  );
}
