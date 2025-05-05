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
import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext, useUser } from "@/context/UserContext";

export default function Header() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const { userId, wallet, setUserId, setWallet } = useUser();

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWallet(address);
      console.log("Connected Wallet Address:", address);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  useEffect(() => {
    if (wallet) {
      const checkWallet = async () => {
        try {
          const res = await fetch(`/api/user?wallet=${wallet}`);
          if (res.ok) {
            const data = await res.json();
            console.log("User exists:", data.user_id);
            setUserId(data.user_id);
            if (!wallet) {
              setWallet(data.wallet);
            }
            router.push("/companydashboard"); // ✅ navigate when user is set
          } else if (res.status === 404) {
            // User doesn't exist, create one
            const postRes = await fetch("/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ wallet: wallet }),
            });

            if (postRes.ok) {
              const newUser = await postRes.json();
              console.log("User created:", newUser);
              setUserId(newUser.id);
              setWallet(wallet);
              router.push("/companydashboard");
            } else {
              const err = await postRes.json();
              console.error("Error creating user:", err.error);
            }
          } else {
            const err = await res.json();
            console.error("Fetch error:", err.error);
          }
        } catch (error) {
          console.error("Error fetching or creating wallet info:", error);
        }
      };

      checkWallet();
    }
  }, [wallet, setUserId, setWallet, router]);

  return (
    <header className="w-full px-4 py-5">
      <div className="relative flex items-center max-w-7xl mx-auto">
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
          <Image src="/logospare.png" alt="Logo" width={300} height={300} />
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
          <Button className="bg-emerald-600" onClick={connectWallet}>
            {wallet
              ? wallet.slice(0, 6) + "..." + wallet.slice(-4)
              : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </header>
  );
}
