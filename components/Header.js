"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function Header() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/admin")) return null;

  return <Navbar />;
}
