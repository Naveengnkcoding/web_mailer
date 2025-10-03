import React from 'react';
import { Button } from "@/components/ui/button"
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-black p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-bold">WEB Mailer & Manager</Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/firebase" className="hover:text-gray-300">Firebase</Link>
          <Link href="/tools" className="hover:text-gray-300">Tools</Link>
          <Button className="" size="sm" variant="outline">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;