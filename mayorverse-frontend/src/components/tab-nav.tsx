"use client";

import { BlackHole3 } from "@solar-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

type Tab = {
  title: string;
  href: string;
  icon: JSX.Element;
};

interface ITabNav {
  tabs: Tab[];
  isLoading: boolean;
}

export function TabNav({ tabs, isLoading }: ITabNav) {
  const currentPath = usePathname();

  return (
    <ul className="flex gap-4 mb-4 border-b border-gray-700">
      {tabs.map((tab) => (
        <li key={tab.title}>
          <Link
            href={tab.href}
            className={`relative transition-colors focus:outline-2 focus:rounded focus:outline-teal-500 group focus:outline-offset-2 py-2 px-4 text-sm font-medium flex gap-2 items-center ${
              currentPath.includes(tab.href)
                ? " border-b-2  text-teal-400"
                : "text-gray-400 hover:text-teal-400"
            } `}
          >
            {tab?.icon}
            {tab.title}
          </Link>
        </li>
      ))}
      {isLoading && (
        <li className="ml-auto px-4">
          <BlackHole3 className="  h-full animate-spin size-5" />
        </li>
      )}
    </ul>
  );
}
