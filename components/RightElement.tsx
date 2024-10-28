'use client'

import React, { useState } from 'react'
import { Calendar, BarChart2, ChevronLeft, Settings, Plus, Users, LayoutDashboard, ClipboardList, ChevronRight, LayoutPanelLeft, LucideIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface CurrentPage {
  todo: number;
  done: number;
}

export default function Component() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Complete project proposal', completed: false },
    { id: 2, text: 'Review team performance', completed: false },
    { id: 3, text: 'Update client presentation', completed: true },
    { id: 4, text: 'Schedule team meeting', completed: false },
    { id: 5, text: 'Prepare monthly report', completed: true },
    { id: 6, text: 'Research new technologies', completed: false },
    { id: 7, text: 'Develop marketing strategy', completed: false },
    { id: 8, text: 'Conduct user interviews', completed: false },
    { id: 9, text: 'Optimize database queries', completed: true },
    { id: 10, text: 'Design new product features', completed: false },
    { id: 11, text: 'Create onboarding documentation', completed: false },
    { id: 12, text: 'Implement security updates', completed: true },
    { id: 13, text: 'Analyze competitor products', completed: false },
    { id: 14, text: 'Refactor legacy code', completed: false },
    { id: 15, text: 'Prepare quarterly presentation', completed: true },
    { id: 16, text: 'Set up CI/CD pipeline', completed: false },
  ])
  const [newTask, setNewTask] = useState('')
  const [currentPage, setCurrentPage] = useState<CurrentPage>({ todo: 1, done: 1 })
  const tasksPerPage = 4

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const maximize = () => {
    setIsMinimized(false)
  }

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <TooltipProvider>
      <div className={`
         h-screen bg-yellow-50 
        transition-all duration-300 ease-in-out
        ${isMinimized ? 'w-16' : ' w-80 z-50 '}
         lg:relative lg:top-0 absolute top-18 right-0
         
      `}>
        <div className={`
          absolute top-0 left-0 h-full bg-yellow-50
          transition-all duration-300 ease-in-out
          ${isMinimized ? 'w-16' : 'w-80'}
          overflow-hidden
        `}>
          <div className="p-4 bg-white border-b flex justify-between items-center">
            {!isMinimized && <h1 className="text-2xl font-bold text-teal-700">Overview</h1>}
            <Button variant="ghost" size="icon" onClick={toggleMinimize} className="text-teal-600 hover:text-teal-700 hover:bg-teal-50">
              <LayoutPanelLeft  className="h-5 w-5" />
            </Button>
          </div>
          <ScrollArea className="flex-1 h-[calc(100vh-64px)]">
            {isMinimized ? (
              <MinimizedContent onIconClick={maximize} />
            ) : (
              <ExpandedContent 
                tasks={tasks} 
                newTask={newTask} 
                setNewTask={setNewTask} 
                addTask={addTask} 
                toggleTask={toggleTask}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                tasksPerPage={tasksPerPage}
              />
            )}
          </ScrollArea>
        </div>
      </div>
    </TooltipProvider>
  )
}

interface MinimizedContentProps {
  onIconClick: () => void;
}

function MinimizedContent({ onIconClick }: MinimizedContentProps) {
  return (
    <div className="flex flex-col items-center justify-start min-h-full py-4 space-y-4">
      <MinimizedSection icon={<LayoutDashboard />} label="Boards" onClick={onIconClick} />
      <MinimizedSection icon={<BarChart2 />} label="Progress" onClick={onIconClick} />
      <MinimizedSection icon={<ClipboardList />} label="Tasks" onClick={onIconClick} />
    </div>
  )
}

interface MinimizedSectionProps {
  icon: React.ReactElement;
  label: string;
  onClick: () => void;
}

function MinimizedSection({ icon, label, onClick }: MinimizedSectionProps) {
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

interface ExpandedContentProps {
  tasks: Task[];
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  addTask: () => void;
  toggleTask: (id: number) => void;
  currentPage: CurrentPage;
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPage>>;
  tasksPerPage: number;
}

function ExpandedContent({ tasks, newTask, setNewTask, addTask, toggleTask, currentPage, setCurrentPage, tasksPerPage }: ExpandedContentProps) {
  return (
    <div className="space-y-4 p-4">
      <Boards />
      <PersonalProgress />
      <Tasks 
        tasks={tasks}
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        toggleTask={toggleTask}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        tasksPerPage={tasksPerPage}
      />
    </div>
  )
}

function Boards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-teal-700 flex items-center justify-between">
          <div className="flex items-center">
            <LayoutDashboard className="h-5 w-5 mr-2 text-teal-600" />
            <span>Boards</span>
          </div>
          <Button variant="ghost" size="icon" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50">
            <Plus className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <BoardItem name="Angola Production" icon={LayoutDashboard} color="bg-blue-500" />
        <BoardItem name="Attendance Reporting" icon={Users} color="bg-green-500" />
        <BoardItem name="CHIVA RYH" icon={Calendar} color="bg-purple-500" />
      </CardContent>
      <CardFooter>
        <Button variant="link" className="text-teal-600 hover:text-teal-700 w-full">
          View All Boards
        </Button>
      </CardFooter>
    </Card>
  )
}

interface BoardItemProps {
  name: string;
  icon: LucideIcon;
  color: string;
}

function BoardItem({ name, icon: Icon, color }: BoardItemProps) {
  return (
    <div className="flex items-center space-x-3 group">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <span className="text-sm text-gray-600 group-hover:text-teal-600">{name}</span>
    </div>
  )
}

function PersonalProgress() {
  const progressItems = [
    { question: "Are either of your parents living?", color: "bg-orange-500", progress: 70, value: 7 },
    { question: "Do you belong to any groups in which you feel a strong connection?", color: "bg-blue-500", progress: 60, value: 6 },
    { question: "1-2-1 Events", color: "bg-pink-500", progress: 27, value: 27 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-teal-700 flex items-center justify-between">
          <div className="flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-teal-600" />
            <span>Personal Progress</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                  <ClipboardList className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Go to Board</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {progressItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
              {Math.round(item.value)}
            </div>
            <div className="flex-grow">
              <p className="text-xs font-medium text-gray-700 mb-1">{item.question}</p>
              <div className="flex items-center">
                <Progress value={item.progress} className="h-2 flex-grow mr-2" />
                <span className="text-xs font-medium text-gray-600 w-8">{item.progress}%</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="w-6 h-6 rounded-full shrink-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="link" className="text-teal-600 hover:text-teal-700 w-full">
          Show All Progress
        </Button>
      </CardFooter>
    </Card>
  )
}

interface TasksProps {
  tasks: Task[];
  newTask: string;
  setNewTask: React.Dispatch<React.SetStateAction<string>>;
  addTask: () => void;
  toggleTask: (taskId: number) => void;
  currentPage: CurrentPage;
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPage>>;
  tasksPerPage: number;
}

function Tasks({ tasks, newTask, setNewTask, addTask, toggleTask, currentPage, setCurrentPage, tasksPerPage }: TasksProps) {
  const todoTasks = tasks.filter(t => !t.completed)
  const doneTasks = tasks.filter(t => t.completed)
  
  const paginateTasks = (taskList: Task[], page: number): Task[] => {
    const startIndex = (page - 1) * tasksPerPage;
    return taskList.slice(startIndex, startIndex + tasksPerPage);
  };
  
  const getPageCount = (taskList: Task[]): number => 
    Math.ceil(taskList.length / tasksPerPage);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-teal-700 flex items-center justify-between">
          <div className="flex items-center">
            <ClipboardList className="h-5 w-5 mr-2 text-teal-600" />
            <span>Tasks</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4 space-x-2">
          <Input
            type="text"
            placeholder="Add your next task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={addTask} className="bg-teal-600 hover:bg-teal-700 text-white">
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Add Task</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Tabs defaultValue="todo" className="w-full">
          
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="todo">To Do ({todoTasks.length})</TabsTrigger>
            <TabsTrigger value="done">Done ({doneTasks.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="todo">
            <TaskList 
              tasks={paginateTasks(todoTasks, currentPage.todo)} 
              toggleTask={toggleTask} 
            />
            <Pagination 
              currentPage={currentPage.todo}
              totalPages={getPageCount(todoTasks)}
              onPageChange={(page) => setCurrentPage(prev => ({ ...prev, todo: page }))}
            />
          </TabsContent>
          <TabsContent value="done">
            <TaskList 
              tasks={paginateTasks(doneTasks, currentPage.done)} 
              toggleTask={toggleTask} 
            />
            <Pagination 
              currentPage={currentPage.done}
              totalPages={getPageCount(doneTasks)}
              onPageChange={(page) => setCurrentPage(prev => ({ ...prev, done: page }))}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
}

function TaskList({ tasks, toggleTask }: TaskListProps) {
  return (
    <ul className="space-y-2 mb-4">
      {tasks.map(task => (
        <li key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex items-center flex-grow  mr-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mr-2 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-700'} text-sm break-words`}>
              {task.text}
            </span>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 shrink-0">
            <Settings className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </ul>
  )
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-between items-center mt-4">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}