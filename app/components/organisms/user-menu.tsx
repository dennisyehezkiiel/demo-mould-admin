"use client";

import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { useCookies } from "react-cookie";
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
import { AUTH_COOKIES } from "@/lib/auth";
import { getInitials } from "@/lib/utils";

export function UserMenu() {
  const router = useRouter();
  const [cookies, , removeCookie] = useCookies([...AUTH_COOKIES]);
  // cookies only exist in the browser, so render them after hydration to avoid a mismatch
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const user = {
    name: mounted ? (cookies.name ?? "") : "",
    role: mounted ? (cookies.role ?? "") : "",
  };

  function logout() {
    AUTH_COOKIES.forEach((c) => removeCookie(c, { path: "/" }));
    router.push("/login");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto gap-3 p-1.5">
          <Avatar size="lg">
            <AvatarFallback className="bg-primary text-primary-foreground">{getInitials(user.name)}</AvatarFallback>
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
        <DropdownMenuItem variant="destructive" onSelect={logout}>
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
