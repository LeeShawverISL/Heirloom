
import React from "react";
import { 
  Moon, 
  Sun, 
  Menu,
  X,
  Home,
  Settings,
  User,
  ShoppingCart,
  LogOut,
  LogIn,
  PlusCircle,
  Heart
} from "lucide-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: Home, // Using Home as logo temporarily
  moon: Moon,
  sun: Sun,
  menu: Menu,
  close: X,
  home: Home,
  settings: Settings,
  user: User,
  cart: ShoppingCart,
  logout: LogOut,
  login: LogIn,
  add: PlusCircle,
  heart: Heart
};
