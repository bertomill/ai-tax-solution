import * as React from "react"
import { 
  Brain, 
  FileText, 
  Lightbulb, 
  Target, 
  Users, 
  Zap,
  Search,
  Check,
  ChevronsUpDown,
  GalleryVerticalEnd
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
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Navigation data for our whiteboarding interview preparation
const navigationData = {
  sections: [
    {
      title: "Assignment Context",
      items: [
        {
          title: "Overview",
          icon: <FileText className="size-4" />,
          url: "#overview",
          isActive: true,
        },
        {
          title: "Interview Format",
          icon: <Users className="size-4" />,
          url: "#format",
        },
        {
          title: "What We're Looking For",
          icon: <Target className="size-4" />,
          url: "#expectations",
        },
      ],
    },
    {
      title: "Our Approach",
      items: [
        {
          title: "Problem Identification",
          icon: <Brain className="size-4" />,
          url: "#problem-identification",
        },
        {
          title: "Solution Design",
          icon: <Lightbulb className="size-4" />,
          url: "#solution-design",
        },
        {
          title: "AI Integration",
          icon: <Zap className="size-4" />,
          url: "#ai-integration",
        },
        {
          title: "MVP Strategy",
          icon: <Target className="size-4" />,
          url: "#mvp-strategy",
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
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white flex aspect-square size-8 items-center justify-center rounded-lg">
            <Brain className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-medium">AI Tax Use Cases</span>
            <span className="text-xs text-muted-foreground">Interview Prep</span>
          </div>
        </div>
        
        {/* Search */}
        <div className="px-2">
          <SidebarInput
            placeholder="Search sections..."
            className="pl-8"
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Navigation Sections */}
        {navigationData.sections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={item.isActive}
                      tooltip={item.title}
                    >
                      <a href={item.url}>
                        {item.icon}
                        <span>{item.title}</span>
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