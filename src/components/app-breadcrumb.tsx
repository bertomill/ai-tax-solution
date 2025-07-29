"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Home } from 'lucide-react'
import React from 'react'

interface BreadcrumbItem {
  href: string
  label: string
  icon?: React.ReactNode
  isCurrent?: boolean
}

const pageTitles: Record<string, string> = {
  '/': 'Home',
  '/interview-format': 'Session Format',
  '/problem-identification': 'Approach & Analysis',
  '/documentation': 'Documentation',
  '/search': 'AI Document Search',
  '/market-research': 'Market Research Agent',
  '/tax-research': 'Tax Compliance Simulator',
  '/client-communications': 'Communication Drafting',
  '/about': 'About',
  '/preferences': 'Preferences',
  '/solution-design': 'Solution Design'
}

export function AppBreadcrumb() {
  const pathname = usePathname()
  
  // Don't show breadcrumb on home page
  if (pathname === '/') {
    return null
  }

  const pathSegments = pathname.split('/').filter(Boolean)
  
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      href: '/',
      label: 'Home',
      icon: <Home className="w-4 h-4" />
    }
  ]

  // Build breadcrumb items from path segments
  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const title = pageTitles[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1)
    
    if (index === pathSegments.length - 1) {
      // Last item (current page)
      breadcrumbItems.push({
        href: currentPath,
        label: title,
        isCurrent: true
      })
    } else {
      // Intermediate items
      breadcrumbItems.push({
        href: currentPath,
        label: title
      })
    }
  })

  return (
    <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={item.href}>
                <BreadcrumbItem>
                  {item.isCurrent ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href} className="flex items-center gap-1">
                        {item.icon && item.icon}
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
} 