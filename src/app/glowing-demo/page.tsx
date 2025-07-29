"use client"

import GlowingEffectDemo from '@/components/ui/glowing-effect-demo'

export default function GlowingDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Glowing Effect Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Move your mouse over the cards below to see the subtle glowing effect in action. 
            This demonstrates the Aceternity UI glowing border effect that responds to mouse movement.
          </p>
        </div>
        
        <GlowingEffectDemo />
      </div>
    </div>
  )
} 