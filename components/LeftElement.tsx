'use client'

import React, { useState } from 'react'
import { Calendar, Folder, User, BarChart2, ChevronRight, Settings, Plus, Image, Building, Users, FolderKanban, PanelsTopLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function LeftElement() {
  const [isMinimized, setIsMinimized] = useState(false)

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const maximize = () => {
    setIsMinimized(false)
  }

  return (
    <TooltipProvider>
      <div className={`
         h-screen bg-yellow-50 z-50
        transition-all duration-300 ease-in-out
        ${isMinimized ? 'w-16' : 'w-80'}
       lg:relative lg:top-0 absolute top-18 left-0
      `}>
        <div className="p-4 bg-white border-b flex justify-between items-center">
          {!isMinimized && <h1 className="text-2xl font-bold text-teal-700">Dashboard</h1>}
          <Button variant="ghost" size="icon" onClick={toggleMinimize} className="text-teal-600 hover:text-teal-700 hover:bg-teal-50">
            <PanelsTopLeft className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="flex-1 h-[calc(100vh-64px)]">
          {isMinimized ? (
            <MinimizedContent onIconClick={maximize} />
          ) : (
            <ExpandedContent />
          )}
        </ScrollArea>
      </div>
    </TooltipProvider>
  )
}

function MinimizedContent({ onIconClick }:{ onIconClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-start min-h-full py-4 space-y-4">
      <MinimizedSection icon={<Folder />} label="Quick Access" onClick={onIconClick} />
      <MinimizedSection icon={<Users />} label="Contacts" onClick={onIconClick} />
      <MinimizedSection icon={<Folder />} label="Projects" onClick={onIconClick} />
      <MinimizedSection icon={<Image />} label="Albums" onClick={onIconClick} />
      <MinimizedSection icon={<Building />} label="Organisations" onClick={onIconClick} />
      <MinimizedSection icon={<Users />} label="Followers" onClick={onIconClick} />
      <MinimizedSection icon={<Users />} label="People You Follow" onClick={onIconClick} />
    </div>
  )
}

function MinimizedSection({ icon, label, onClick }: {
  icon: React.ReactElement
  label: string
  onClick: () => void
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 bg-white text-teal-600 hover:text-teal-700 hover:bg-teal-50"
          onClick={onClick}
        >
          {React.cloneElement(icon, { className: "h-5 w-5" })}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function ExpandedContent() {
  return (
    <div className="space-y-2 p-4">
      <QuickAccess />
      <Contacts />
      <Projects />
      <Albums />
      <Organisations />
      <Followers />
      <PeopleYouFollow />
    </div>
  )
}

function QuickAccess() {
  return (
    <Card className='bg-white'>
      <CardHeader>
        <CardTitle className="text-lg bg-white font-semibold text-teal-700 flex items-center">
          <Folder className="h-5 w-5 mr-2 text-teal-600" />
          Quick Access
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <QuickAccessItem icon={<Calendar />} label="Upcoming Events" />
        <QuickAccessItem icon={<FolderKanban />} label="Projects" />
        <QuickAccessItem icon={<User />} label="Contacts" />
        <QuickAccessItem icon={<BarChart2 />} label="Progress Boards" />
      </CardContent>
    </Card>
  )
}

function Contacts() {
  return (
    <Card>
      <CardHeader>
        <SectionHeader title="Contacts" icon={<Users className="h-5 w-5 text-teal-600" />} />
      </CardHeader>
      <CardContent className="space-y-2">
        <ContactItem name="harry" />
        <ContactItem name="siyamadli" />
        <ContactItem name="Claire" />
        <ShowAllLink />
      </CardContent>
    </Card>
  )
}

function Projects() {
  return (
    <Card>
      <CardHeader>
        <SectionHeader title="Projects" icon={<Folder className="h-5 w-5 text-teal-600" />} />
      </CardHeader>
      <CardContent className="space-y-2">
        <ProjectItem name="4359 test" />
        <ProjectItem name="a test 5146" />
        <ProjectItem name="A Training Project" />
        <ShowAllLink />
      </CardContent>
    </Card>
  )
}

function Albums() {
  return (
    <Card>
      <CardHeader>
        <SectionHeader title="Albums" icon={<Image className="h-5 w-5 text-teal-600" />} />
      </CardHeader>
      <CardContent className="space-y-2">
        <AlbumItem name="2021 Portfolio" />
        <AlbumItem name="All Partners" />
        <AlbumItem name="Big Lottery Fund" />
        <ShowAllLink />
      </CardContent>
    </Card>
  )
}

function Organisations() {
  return (
    <Card>
      <CardHeader>
        <SectionHeader title="Organisations" icon={<Building className="h-5 w-5 text-teal-600" />} />
      </CardHeader>
      <CardContent className="space-y-2">
        <OrganisationItem name="An Organisation Demo" role="Admin" />
        <OrganisationItem name="A Showcase Charity" role="Member" />
        <OrganisationItem name="Oak Tree School" role="Admin" />
        <ShowAllLink />
      </CardContent>
    </Card>
  )
}

function Followers() {
  return (
    <Card>
      <CardHeader>
        <SectionHeader title="Followers" icon={<Users className="h-5 w-5 text-teal-600" />} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Follower 1" />
            <AvatarFallback>F1</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Follower 2" />
            <AvatarFallback>F2</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Follower 3" />
            <AvatarFallback>F3</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Follower 4" />
            <AvatarFallback>F4</AvatarFallback>
          </Avatar>
        </div>
        <ShowAllLink />
      </CardContent>
    </Card>
  )
}

function PeopleYouFollow() {
  return (
    <Card>
      <CardHeader>
        <SectionHeader title="People You Follow" icon={<Users className="h-5 w-5 text-teal-600" />} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Following 1" />
            <AvatarFallback>P1</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Following 2" />
            <AvatarFallback>P2</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Following 3" />
            <AvatarFallback>P3</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Following 4" />
            <AvatarFallback>P4</AvatarFallback>
          </Avatar>
        </div>
        <ShowAllLink />
      </CardContent>
    </Card>
  )
}

function SectionHeader({ title, icon }:{icon: React.ReactElement, title: string}) {
  return (
    <CardTitle className="text-lg font-semibold text-teal-700 flex items-center justify-between">
      <div className="flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </div>
      <Button variant="ghost" size="icon" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50">
        <Plus className="h-4 w-4" />
      </Button>
    </CardTitle>
  )
}

function QuickAccessItem({ icon, label }:{ icon: React.ReactElement ,label: string}) {
  return (
    <a href="#" className="flex items-center text-gray-600 hover:text-teal-600 transition-colors duration-200 group">
      {React.cloneElement(icon, { className: "h-5 w-5 mr-2" })}
      <span>{label}</span>
      <ChevronRight className="h-5 w-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </a>
  )
}

function ContactItem({ name }:{name:string}) {
  return (
    <div className="flex items-center space-x-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={name} />
        <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="text-sm text-gray-600">{name}</span>
    </div>
  )
}

function ProjectItem({ name }:{name:string}) {
  return (
    <div className="flex justify-between items-center group">
      <span className="text-sm text-gray-600">{name}</span>
      <Settings className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  )
}

function AlbumItem({ name }:{name:string}) {
  return (
    <div className="flex justify-between items-center group">
      <span className="text-sm text-gray-600">{name}</span>
      <Settings className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  )
}

function OrganisationItem({ name, role }:{name:string, role:string}) {
  return (
    <div className="flex justify-between items-center group">
      <div>
        <span className="text-sm text-gray-600">{name}</span>
        <span className="text-xs text-gray-400 block">{role}</span>
      </div>
      <Settings className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  )
}

function ShowAllLink() {
  return (
    <a href="#" className="text-sm text-teal-600 hover:text-teal-700 hover:underline flex items-center mt-2">
      <span>Show All</span>
      <ChevronRight className="h-4 w-4 ml-1" />
    </a>
  )
}