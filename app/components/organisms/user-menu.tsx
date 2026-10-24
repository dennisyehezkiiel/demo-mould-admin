"use client";

import { useRouter } from "next/navigation";
import { ChevronDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/app/components/atoms/avatar";
import { Button } from "@/app/components/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/atoms/dropdown-menu";

// ponytail: hardcoded user. Read from session once real auth exists.
const user = { name: "John Doe", role: "Administrator", initials: "JD" };

export function UserMenu() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto gap-3 p-1.5">
          <Avatar size="lg">
            <AvatarFallback className="bg-primary text-primary-foreground">{user.initials}</AvatarFallback>
          </Avatar>
          <span className="hidden text-left text-sm leading-tight sm:block">
            <span className="block font-medium">{user.name}</span>
            <span className="block text-xs text-muted-foreground">{user.role}</span>
          </span>
          <ChevronDown className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <p className="font-medium text-foreground">{user.name}</p>
          <p className="text-xs font-normal text-muted-foreground">{user.role}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={() => router.push("/login")}>
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
