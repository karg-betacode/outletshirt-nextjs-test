import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import Cart from 'components/cart';
import CartIcon from 'components/icons/cart';
import { getMenu } from 'lib/bigcommerce';
import { VercelMenu as Menu } from 'lib/bigcommerce/types';
import MobileMenu from './mobile-menu';
import Search from './search';

export default async function Navbar() {
  // Some error with retrieveing categories
  const menu = await getMenu('next-js-frontend-header-menu');
  
  return (
    <nav className="relative flex items-center justify-between bg-primary p-4 text-white lg:px-6">
      <div className="block w-1/3 md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex justify-self-center md:w-1/3 md:justify-self-start">
        <div className="md:mr-4">
          <Link href="/" aria-label="Go back home">
            <Image src="/outletshirts-logo.png"  alt="Outletshirts" width={100} height={48}  className="h-8 transition-transform object-cover"/>
          </Link>
        </div>
        {menu.length ? (
          <ul className="hidden md:flex items-center">
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  className="rounded-lg px-2 py-1 text-gray-200 hover:text-white"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="hidden w-1/3 md:block">
        <Search />
      </div>

      <div className="flex w-1/3 justify-end">
        <Suspense fallback={<CartIcon className="h-6" />}>
          <Cart />
        </Suspense>
      </div>
    </nav>
  );
}
