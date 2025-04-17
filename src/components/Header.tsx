"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";

export default function Header() {
  const { setTheme } = useTheme();
  return (
    <header className="relative flex items-center w-full px-0 py-2">
      <div className="flex">
        <ToggleGroup
          type="single"
          defaultValue="company"
          className="space-x-0.5 border border-grey rounded-sm text-xs"
        >
          <Link href="/companydashboard" passHref>
            <ToggleGroupItem
              asChild
              value="company"
              aria-label="Company View"
              className="px-5 py-1 text-xs"
            >
              <button>Company View</button>
            </ToggleGroupItem>
          </Link>

          <Link href="/userdashboard" passHref>
            <ToggleGroupItem
              asChild
              value="user"
              aria-label="User View"
              className="px-2 py-1 text-xs"
            >
              <button>User View</button>
            </ToggleGroupItem>
          </Link>
        </ToggleGroup>
      </div>
      <h1 className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 text-lg font-bold">
        <Image src="/logospare.png" alt="Logo" width={220} height={220} />
      </h1>
      <div className="ml-auto flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button>Connect Wallet</Button>
      </div>
    </header>
  );
}
