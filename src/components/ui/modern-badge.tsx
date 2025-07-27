import * as React from "react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        modern: "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg",
        success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg",
        warning: "bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg",
        info: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg",
      },
      size: {
        default: "h-6 px-2.5 text-xs",
        sm: "h-5 px-2 text-xs",
        lg: "h-8 px-3 text-sm",
        xl: "h-10 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ModernBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode
  animated?: boolean
}

const ModernBadge = React.forwardRef<HTMLDivElement, ModernBadgeProps>(
  ({ className, variant, size, animated = true, children, ...props }, ref) => {
    const BadgeComponent = animated ? motion.div : "div"
    
    return (
      <BadgeComponent
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        initial={animated ? { scale: 0.8, opacity: 0 } : undefined}
        animate={animated ? { scale: 1, opacity: 1 } : undefined}
        transition={animated ? { duration: 0.2, ease: "easeOut" } : undefined}
        whileHover={animated ? { scale: 1.05 } : undefined}
        {...props}
      >
        {children}
      </BadgeComponent>
    )
  }
)
ModernBadge.displayName = "ModernBadge"

export { ModernBadge, badgeVariants } 