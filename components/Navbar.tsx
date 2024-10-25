import React from 'react'
import { Bell, MessageSquareText, Zap, ChevronDown, Plus, Star, MoreHorizontal, User, Search, LayoutList, SquareMenu } from 'lucide-react'
import Image from 'next/image'
import logoBig from "../assets/logoBig.png"
import logoSmall from "../assets/logoSmall.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
  return (
    <nav className="bg-white font-baloo shadow-sm top-0 z-10">
      <div className="mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image className="hidden lg:flex w-40 -mr-8 -my-4" src={logoBig} alt="Logo" />
            <Image className=" lg:hidden w-12 mx-4" src={logoSmall} alt="Logo" />
          </div>

          {/* Navigation Links */}
          <div className="hidden align-middle items-center sm:flex sm:space-x-2 mr-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-lg font-medium">
                  My Apps
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>App 1</DropdownMenuItem>
                <DropdownMenuItem>App 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="mr-2 -ml-2 text-lg font-medium">Home</div>
            <div className="mr-2 text-lg font-medium">Explore</div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 w-full flex justify-center mx-2 items-center align-middle lg:justify-end">
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search for contacts etc"
                className="pl-10 pr-3 py-2"
              />
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Notification Icons */}
            <Button variant="ghost" size="icon" className="text-blue-400 hover:text-white hover:bg-blue-400 relative p-0 px-1">
              <Bell />
              <span className="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">1</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-green-400 hover:text-white hover:bg-green-400">
              <MessageSquareText className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-yellow-400 hover:text-white hover:bg-yellow-400 relative">
              <Zap className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 block h-4 w-4 rounded-full bg-red-500 text-xs text-white text-center">3</span>
            </Button>

            {/* User Profile */}
            <span className="lg:flex items-center text-base font-medium hidden text-gray-700">
              <User className="h-6 w-6 mr-2" />
              <span className=' '></span> Yoel Adamson
            </span>

            {/* Action Buttons */}
            <Button variant="destructive" size="sm" className="text-base hidden xl:flex">
              <Plus className="mr-1 h-5 w-5" />
              Create
            </Button>
            <Button variant="outline" size="sm" className="text-base hidden xl:flex">
              <Star className="mr-1 text-yellow-400 h-5 w-5" />
              Upgrade
            </Button>

            <Button variant="destructive" size="sm" className=" rounded-full p-0 p-2 absolute 
            -bottom-[80vh] right-4 text-base flex xl:hidden">
              <Plus className=" w-8" />
              
            </Button>
            <Button variant="outline" size="sm" className="rounded-full p-0 p-2 absolute 
            -bottom-[71vh] right-4 text-base flex xl:hidden">
              <Star className="text-yellow-400 w-8" />
              
            </Button>

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-base">
                 <span className='hidden xl:flex'>More</span> 
                  <LayoutList className="xl:ml-2 h-5 w-5 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <SquareMenu className='lg:hidden' size={28} strokeWidth={1} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <Button variant="ghost" className="w-full justify-start">My Apps</Button>
                <Button variant="ghost" className="w-full justify-start">Home</Button>
                <Button variant="ghost" className="w-full justify-start">Explore</Button>
                <Button variant="destructive" className="w-full justify-start">
                  <Plus className="mr-2 h-5 w-5" />
                  Create
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="mr-2 h-5 w-5" />
                  Upgrade
                </Button>
                <Button variant="ghost" className="w-full justify-start">Edit Profile</Button>
                <Button variant="ghost" className="w-full justify-start">Settings</Button>
                <Button variant="ghost" className="w-full justify-start">Sign out</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}