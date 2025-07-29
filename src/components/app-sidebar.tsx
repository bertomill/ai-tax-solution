"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { 
  Brain, 
  Users, 
  Zap,
  Search,
  Check,
  Home,
  BookOpen,
  ChevronRight,
  ChevronDown,
  Settings,
  MessageSquare,
  Shield,
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// TypeScript interfaces for navigation data
interface NavigationSubItem {
  title: string
  url: string
  section: string // for scroll highlighting
}

interface NavigationItem {
  title: string
  icon: React.ReactElement
  url: string
  badge?: string
  subItems?: NavigationSubItem[]
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
        },
        {
          title: "Documentation",
          icon: <BookOpen className="size-4" />,
          url: "/documentation",
          subItems: [
            {
              title: "Overview",
              url: "/documentation#overview",
              section: "overview"
            },
            {
              title: "Different Forms of AI",
              url: "/documentation#ai-forms",
              section: "ai-forms"
            },
            {
              title: "Efficiency Gains",
              url: "/documentation#efficiency",
              section: "efficiency"
            },
            {
              title: "Strategic Insights",
              url: "/documentation#insights",
              section: "insights"
            },
            {
              title: "Practical Lessons",
              url: "/documentation#practical-lessons",
              section: "practical-lessons"
            },
            {
              title: "AI Tools Used",
              url: "/documentation#ai-tools",
              section: "ai-tools"
            },
            {
              title: "Automation vs AI",
              url: "/documentation#automation-vs-ai",
              section: "automation-vs-ai"
            }
          ]
        },
      ],
    },
    {
      title: "Whiteboarding Sections",
      items: [
        {
          title: "Session Format",
          icon: <Users className="size-4" />,
          url: "/interview-format",
          subItems: [
            {
              title: "Overview",
              url: "/interview-format#assignment-overview",
              section: "assignment-overview"
            },
            {
              title: "Process",
              url: "/interview-format#interview-process", 
              section: "interview-process"
            },
            {
              title: "Success Factors",
              url: "/interview-format#expectations",
              section: "expectations"
            }
          ]
        },
        {
          title: "Approach",
          icon: <Brain className="size-4" />,
          url: "/problem-identification",
          subItems: [
            {
              title: "Research Approach",
              url: "/problem-identification#problem-identification",
              section: "problem-identification"
            },
            {
              title: "Research Methodology",
              url: "/problem-identification#research-methodology",
              section: "research-methodology"
            },
            {
              title: "User Analysis",
              url: "/problem-identification#user-analysis",
              section: "user-analysis"
            },
            {
              title: "Day-to-Day Tax Tasks",
              url: "/problem-identification#task-list",
              section: "task-list"
            },
            {
              title: "Automation Opportunities",
              url: "/problem-identification#automation-opportunities",
              section: "automation-opportunities"
            },
            {
              title: "Development Strategy",
              url: "/problem-identification#mvp-strategy",
              section: "mvp-strategy"
            },
            {
              title: "Enterprise Scale Rollout",
              url: "/problem-identification#enterprise-rollout",
              section: "enterprise-rollout"
            }
          ] 
        },
      ],
    },
    {
      title: "AI Tools",
      items: [
        {
          title: "AI Search",
          icon: <Search className="size-4" />,
          url: "/search",
          subItems: [
            {
              title: "AI Search",
              url: "/search",
              section: "search"
            },
            {
              title: "Solution Design",
              url: "/search?tab=design",
              section: "design"
            }
          ]
        },
        {
          title: "Market Research",
          icon: <Zap className="size-4" />,
          url: "/market-research",
          subItems: [
            {
              title: "Market Research",
              url: "/market-research",
              section: "research"
            },
            {
              title: "Solution Design",
              url: "/market-research?tab=design",
              section: "design"
            }
          ]
        },
        {
          title: "Tax Compliance",
          icon: <Check className="size-4" />,
          url: "/tax-research",
          subItems: [
            {
              title: "Compliance Simulator",
              url: "/tax-research",
              section: "simulator"
            },
            {
              title: "Solution Design",
              url: "/tax-research?tab=design",
              section: "design"
            }
          ]
        },
        {
          title: "Comm. Drafting",
          icon: <MessageSquare className="size-4" />,
          url: "/client-communications",
          subItems: [
            {
              title: "Communication Drafting",
              url: "/client-communications",
              section: "communications"
            },
            {
              title: "Solution Design",
              url: "/client-communications?tab=design",
              section: "design"
            }
          ]
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const pathname = usePathname()
  const [activeSection, setActiveSection] = React.useState<string>("")
  const [expandedItems, setExpandedItems] = React.useState<string[]>([])
  const [searchQuery, setSearchQuery] = React.useState<string>("")

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('ai-tax-auth')
    localStorage.removeItem('ai-tax-auth-timestamp')
    // Redirect to home page or reload to trigger password protection
    window.location.href = '/'
  }
  
  // Helper function to determine if a navigation item is active
  const isActiveItem = (url: string): boolean => {
    if (url === "/" && pathname === "/") {
      return true
    }
    if (url !== "/" && pathname.startsWith(url.split('#')[0])) {
      return true
    }
    return false
  }

  // Helper function to check if a sub-item is active based on scroll position
  const isActiveSubItem = (section: string): boolean => {
    return activeSection === section
  }

  // Toggle expanded state for items with sub-items
  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems(prev => 
      prev.includes(itemTitle) 
        ? prev.filter(item => item !== itemTitle)
        : [...prev, itemTitle]
    )
  }

  // Filter navigation data based on search query
  const filteredNavigationData = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return navigationData
    }

    const query = searchQuery.toLowerCase().trim()
    
    return {
      sections: navigationData.sections.map(section => ({
        ...section,
        items: section.items.filter(item => {
          // Check if main item matches
          const itemMatches = item.title.toLowerCase().includes(query)
          
          // Check if any sub-item matches
          const subItemMatches = item.subItems?.some(subItem => 
            subItem.title.toLowerCase().includes(query)
          ) || false
          
          return itemMatches || subItemMatches
        }).map(item => ({
          ...item,
          // If searching, show matching sub-items and expand the parent
          subItems: item.subItems?.filter(subItem => 
            item.title.toLowerCase().includes(query) || 
            subItem.title.toLowerCase().includes(query)
          )
        }))
      })).filter(section => section.items.length > 0)
    }
  }, [searchQuery])

  // Auto-expand items when searching
  React.useEffect(() => {
    if (searchQuery.trim()) {
      const itemsToExpand = filteredNavigationData.sections.flatMap(section => 
        section.items
          .filter(item => item.subItems && item.subItems.length > 0)
          .map(item => item.title)
      )
      setExpandedItems(itemsToExpand)
    }
  }, [searchQuery, filteredNavigationData])

  // Effect to listen for scroll events and update active section
  React.useEffect(() => {
    let sections: string[] = []
    let itemToExpand = ""
    
    if (pathname === "/interview-format") {
      sections = ["assignment-overview", "interview-process", "expectations"]
      itemToExpand = "Session Format"
    } else if (pathname === "/problem-identification") {
      sections = ["problem-identification", "research-methodology", "user-analysis", "task-list", "automation-opportunities", "mvp-strategy", "enterprise-rollout"]
      itemToExpand = "Approach"
    } else if (pathname === "/documentation") {
      sections = ["overview", "ai-forms", "efficiency", "insights", "practical-lessons", "ai-tools", "automation-vs-ai"]
      itemToExpand = "Documentation"
    } else if (pathname === "/search") {
      sections = ["search", "design"]
      itemToExpand = "AI Document Search"
    } else if (pathname === "/market-research") {
      sections = ["research", "design"]
      itemToExpand = "Market Research Agent"
    } else if (pathname === "/client-communications") {
      sections = ["communications", "design"]
      itemToExpand = "Communication Drafting"
    }
    
    if (sections.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Auto-expand the appropriate item when on that page
    if (itemToExpand && !expandedItems.includes(itemToExpand)) {
      setExpandedItems(prev => [...prev, itemToExpand])
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, expandedItems])
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pt-4">
        <div className="flex items-center gap-2 px-2">
          <SidebarTrigger className="-ml-1" />
          {state === "expanded" && (
            <div className="flex flex-col gap-0.5 leading-none animate-in slide-in-from-left-2 duration-300">
              <span className="font-medium text-gray-900">AI Tax Use Cases</span>
              <span className="text-xs text-muted-foreground">Robert Mill</span>
            </div>
          )}
        </div>
        
        {/* Search - only show when expanded */}
        {state === "expanded" && (
          <div className="relative px-2 animate-in slide-in-from-left-2 duration-300 delay-100">
            <SidebarInput
              placeholder="Search sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
            />
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 opacity-50 select-none" />
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        {/* No results message */}
        {searchQuery.trim() && filteredNavigationData.sections.length === 0 && state === "expanded" && (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            <Search className="size-8 mx-auto mb-2 opacity-30" />
            <p>No sections found</p>
            <p className="text-xs mt-1">Try a different search term</p>
          </div>
        )}
        
        {/* Navigation Sections */}
        {filteredNavigationData.sections.map((section) => (
          <SidebarGroup key={section.title}>
            {state === "expanded" && (
              <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isExpanded = expandedItems.includes(item.title)
                  const hasSubItems = item.subItems && item.subItems.length > 0
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild={!hasSubItems}
                        isActive={isActiveItem(item.url)}
                        tooltip={state === "collapsed" ? item.title : undefined}
                        className="group relative transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700"
                        onClick={hasSubItems ? () => toggleExpanded(item.title) : undefined}
                      >
                        {hasSubItems ? (
                          <div className="flex items-center justify-between w-full cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="transition-transform duration-200 group-hover:scale-110">
                                {item.icon}
                              </div>
                              {state === "expanded" && (
                                <span className="font-medium transition-all duration-200">{item.title}</span>
                              )}
                            </div>
                            {state === "expanded" && (
                              <div className="flex items-center gap-2">
                                {item.badge && (
                                  <div className={`px-2 py-0.5 text-xs font-medium rounded-full transition-all duration-200 ${
                                    item.badge === "New" 
                                      ? "bg-green-100 text-green-700" 
                                      : "bg-orange-100 text-orange-700"
                                  }`}>
                                    {item.badge}
                                  </div>
                                )}
                                {isExpanded ? (
                                  <ChevronDown className="size-4 transition-transform duration-200" />
                                ) : (
                                  <ChevronRight className="size-4 transition-transform duration-200" />
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
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
                        )}
                      </SidebarMenuButton>
                      
                      {/* Sub-items */}
                      {hasSubItems && isExpanded && state === "expanded" && (
                        <SidebarMenuSub>
                          {item.subItems!.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.section}>
                              <SidebarMenuSubButton 
                                asChild
                                isActive={isActiveSubItem(subItem.section)}
                                className="transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700 data-[active=true]:font-medium"
                              >
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              tooltip={state === "collapsed" ? "Preferences" : undefined}
              className="group relative transition-all duration-200 hover:bg-gray-50 hover:text-gray-700 border-t border-gray-200 dark:border-gray-700"
            >
              <a href="/preferences" className="flex items-center gap-3 py-3">
                <div className="transition-transform duration-200 group-hover:scale-110">
                  <Settings className="size-4" />
                </div>
                {state === "expanded" && (
                  <span className="font-medium transition-all duration-200">Preferences</span>
                )}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          {/* Sign Out Button */}
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              tooltip={state === "collapsed" ? "Sign Out" : undefined}
              className="group relative transition-all duration-200 hover:bg-red-50 hover:text-red-700 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 py-3 w-full">
                <div className="transition-transform duration-200 group-hover:scale-110">
                  <Shield className="size-4" />
                </div>
                {state === "expanded" && (
                  <span className="font-medium transition-all duration-200">Sign Out</span>
                )}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
} 