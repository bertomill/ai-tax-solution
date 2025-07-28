"use client";

/**
 * @author: @dorian_baffier
 * @description: Smooth Tab
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface TabItem {
    id: string;
    title: string;
    icon?: LucideIcon;
    content?: React.ReactNode;
    cardContent?: React.ReactNode;
    color: string;
}

interface SmoothTabProps {
    items: TabItem[];
    defaultTabId?: string;
    className?: string;
    activeColor?: string;
    onChange?: (tabId: string) => void;
}



export default function SmoothTab({
    items,
    defaultTabId,
    className,
    activeColor = "bg-[#1F9CFE]",
    onChange,
}: SmoothTabProps) {
    const [selected, setSelected] = React.useState<string>(defaultTabId || items[0]?.id || '');
    const [direction, setDirection] = React.useState(0);
    const [dimensions, setDimensions] = React.useState({ width: 0, left: 0 });

    // Reference for the selected button
    const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Update dimensions whenever selected tab changes or on mount
    React.useLayoutEffect(() => {
        const updateDimensions = () => {
            const selectedButton = buttonRefs.current.get(selected);
            const container = containerRef.current;

            if (selectedButton && container) {
                const rect = selectedButton.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                setDimensions({
                    width: rect.width,
                    left: rect.left - containerRect.left,
                });
            }
        };

        // Initial update
        requestAnimationFrame(() => {
            updateDimensions();
        });

        // Update on resize
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [selected]);

    const handleTabClick = (tabId: string) => {
        const currentIndex = items.findIndex((item) => item.id === selected);
        const newIndex = items.findIndex((item) => item.id === tabId);
        setDirection(newIndex > currentIndex ? 1 : -1);
        setSelected(tabId);
        onChange?.(tabId);
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLButtonElement>,
        tabId: string
    ) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTabClick(tabId);
        }
    };

    const selectedItem = items.find((item) => item.id === selected);

    return (
        <div className="flex flex-col h-full space-y-6">
            {/* Tab Navigation */}
            <div
                ref={containerRef}
                role="tablist"
                aria-label="Smooth tabs"
                className={cn(
                    "flex items-center justify-center gap-1 py-1 relative",
                    "bg-white/80 backdrop-blur-sm w-fit mx-auto",
                    "border border-gray-200/50 rounded-xl shadow-sm",
                    "transition-all duration-200",
                    className
                )}
            >
                {/* Sliding Background */}
                <motion.div
                    className={cn(
                        "absolute rounded-lg z-[1]",
                        selectedItem?.color || activeColor
                    )}
                    initial={false}
                    animate={{
                        width: dimensions.width - 8,
                        x: dimensions.left + 4,
                        opacity: 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                    }}
                    style={{ height: "calc(100% - 8px)", top: "4px" }}
                />

                <div className="flex gap-1 relative z-[2]">
                    {items.map((item) => {
                        const isSelected = selected === item.id;
                        const IconComponent = item.icon;
                        
                        return (
                            <motion.button
                                key={item.id}
                                ref={(el) => {
                                    if (el) buttonRefs.current.set(item.id, el);
                                    else buttonRefs.current.delete(item.id);
                                }}
                                type="button"
                                role="tab"
                                aria-selected={isSelected}
                                aria-controls={`panel-${item.id}`}
                                id={`tab-${item.id}`}
                                tabIndex={isSelected ? 0 : -1}
                                onClick={() => handleTabClick(item.id)}
                                onKeyDown={(e) => handleKeyDown(e, item.id)}
                                className={cn(
                                    "relative flex items-center justify-center gap-2 rounded-lg px-4 py-2.5",
                                    "text-sm font-medium transition-all duration-300",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    "whitespace-nowrap",
                                    isSelected
                                        ? "text-white"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                )}
                            >
                                {IconComponent && <IconComponent className="w-4 h-4" />}
                                <span>{item.title}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 w-full">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={selected}
                        custom={direction}
                        initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full"
                    >
                        {selectedItem?.content}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export { type TabItem }; 