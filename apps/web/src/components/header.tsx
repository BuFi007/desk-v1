"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bu/ui/dialog";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="absolute top-0 w-full flex items-center justify-between p-4 z-10">
      <span className="hidden md:block text-sm font-medium">bu.run</span>

      <Link href="/">
        <Image
          src="/BooFi-icon.png"
          alt="bu logo"
          width={60}
          quality={100}
          height={60}
          className="md:absolute md:left-1/2 md:top-5 md:-translate-x-1/2"
        />
      </Link>

      <nav className="md:mt-2">
        <ul className="flex items-center gap-4">
          <li>
            <a
              href="https://github.com/BuFi007"
              className="text-sm px-4 py-2 bg-primary text-secondary rounded-full font-medium"
            >
              Github
            </a>
          </li>
          <li>
            <Dialog>
              <DialogTrigger
                className="text-sm px-4 py-2 bg-secondary text-primary rounded-full font-medium cursor-pointer"
                asChild
              >
                <span>Get updates</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Stay updated</DialogTitle>
                  <DialogDescription>
                    Subscribe to our newsletter to get the latest news and
                    updates.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </li>
        </ul>
      </nav>
    </header>
  );
}
