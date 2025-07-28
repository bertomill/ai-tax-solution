"use client"

import * as React from "react"
import { 
  Brain, 
  FileText, 
 
  Target, 
  Users, 
  Zap,
  Search,
  Check,
  Home,
  BookOpen,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarInput,
  useSidebar,
} from "@/components/ui/sidebar"

// TypeScript interfaces for navigation data
interface NavigationItem {
  title: string
  icon: React.ReactElement
  url: string
  isActive?: boolean
  badge?: string
}

interface NavigationSection {
  title: string
  items: NavigationItem[]
}

// Navigation data for our AI Tax Use Cases application
const navigationData: { sections: NavigationSection[] } = {
  sections: [
    {
      title: "Main",
      items: [
        {
          title: "Home",
          icon: <Home className="size-4" />,
          url: "/",
          isActive: true,
        },
        {
          title: "Documentation",
          icon: <BookOpen className="size-4" />,
          url: "/documentation",
        },
      ],
    },
    {
      title: "Interview Sections",
      items: [
        {
          title: "Assignment Overview",
          icon: <FileText className="size-4" />,
          url: "/assignment-overview",
        },
        {
          title: "Interview Format",
          icon: <Users className="size-4" />,
          url: "/interview-format",
        },
        {
          title: "What We're Looking For",
          icon: <Target className="size-4" />,
          url: "/expectations",
        },
        {
          title: "Problem Identification",
          icon: <Brain className="size-4" />,
          url: "/problem-identification",
        },
      ],
    },
    {
      title: "AI Tools",
      items: [
        {
          title: "RAG Search",
          icon: <Search className="size-4" />,
          url: "/search",
        },
        {
          title: "Automation Analysis",
          icon: <Zap className="size-4" />,
          url: "/problem-identification",
          badge: "Hot",
        },
        {
          title: "Tax Research & Compliance",
          icon: <Check className="size-4" />,
          url: "/tax-research",
          badge: "New",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          {state === "expanded" && (
            <div className="flex flex-col gap-0.5 leading-none animate-in slide-in-from-left-2 duration-300">
              <span className="font-medium text-gray-900">AI Tax Use Cases</span>
              <span className="text-xs text-muted-foreground">Interview Prep</span>
            </div>
          )}
        </div>
        
        {/* Search - only show when expanded */}
        {state === "expanded" && (
          <div className="relative px-2 animate-in slide-in-from-left-2 duration-300 delay-100">
            <SidebarInput
              placeholder="Search sections..."
              className="pl-8 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
            />
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 opacity-50 select-none" />
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        {/* Navigation Sections */}
        {navigationData.sections.map((section) => (
          <SidebarGroup key={section.title}>
            {state === "expanded" && (
              <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={item.isActive}
                      tooltip={state === "collapsed" ? item.title : undefined}
                      className="group relative transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700"
                    >
                      <a href={item.url} className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className="transition-transform duration-200 group-hover:scale-110">
                            {item.icon}
                          </div>
                          {state === "expanded" && (
                            <span className="font-medium transition-all duration-200">{item.title}</span>
                          )}
                        </div>
                        {state === "expanded" && item.badge && (
                          <div className={`px-2 py-0.5 text-xs font-medium rounded-full transition-all duration-200 ${
                            item.badge === "New" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-orange-100 text-orange-700"
                          }`}>
                            {item.badge}
                          </div>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarRail />
    </Sidebar>
  )
} 