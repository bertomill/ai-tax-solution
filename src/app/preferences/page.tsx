"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Save
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useTheme } from '@/lib/theme-provider'

interface AIModel {
  id: string
  name: string
  description: string
}

const aiModels: AIModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'OpenAI\'s most advanced model, excellent for complex analysis and reasoning'
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Fast and efficient model, great for detailed tax research and analysis'
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    description: 'Anthropic\'s latest model, exceptional for complex reasoning and detailed explanations'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'Most capable Claude model, perfect for advanced tax planning and strategy'
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    description: 'Google\'s advanced multimodal model, powerful for diverse tax research tasks'
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    description: 'Fast and efficient Gemini model, ideal for quick tax queries and analysis'
  }
]

const themeOptions = [
  {
    id: 'light' as const,
    name: 'Light',
    description: 'Clean, bright interface'
  },
  {
    id: 'dark' as const, 
    name: 'Dark',
    description: 'Easy on the eyes'
  },
  {
    id: 'system' as const,
    name: 'System',
    description: 'Follow device preference'
  }
]

export default function PreferencesPage() {
  const { theme, setTheme } = useTheme()
  const [defaultModel, setDefaultModel] = useState('claude-3-5-sonnet')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Save to localStorage for now
    localStorage.setItem('userPreferences', JSON.stringify({
      defaultModel
    }))
    
    setIsSaving(false)
  }

  // Load preferences on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('userPreferences')
    if (saved) {
      const preferences = JSON.parse(saved)
      setDefaultModel(preferences.defaultModel || 'claude-3-5-sonnet')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(156,146,172,0.15)_1px,transparent_0)] bg-[length:20px_20px] opacity-30" />
      
      <div className="relative z-10 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-black dark:text-gray-100">
                Preferences
              </h1>
            </div>
            <p className="text-base text-black dark:text-gray-300">
              Customize your AI Tax Research Platform experience
            </p>
          </motion.div>

          <div className="space-y-6">

            {/* Theme and Appearance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    Theme & Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Label className="text-base font-medium">Theme Preference</Label>
                  <RadioGroup value={theme} onValueChange={setTheme} className="mt-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {themeOptions.map((option) => (
                        <div key={option.id} className="relative">
                          <RadioGroupItem
                            value={option.id}
                            id={option.id}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={option.id}
                            className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-gray-700 dark:hover:border-gray-600 dark:peer-checked:border-blue-500 dark:peer-checked:bg-blue-950/20"
                          >
                            <div className="font-medium text-sm">{option.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                              {option.description}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>

            {/* Default AI Model */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    Default AI Model
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Label className="text-base font-medium">Choose your preferred AI model</Label>
                  <RadioGroup value={defaultModel} onValueChange={setDefaultModel} className="mt-3">
                    <div className="space-y-3">
                      {aiModels.map((model) => (
                        <div key={model.id} className="relative">
                          <RadioGroupItem
                            value={model.id}
                            id={model.id}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={model.id}
                            className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:border-gray-700 dark:hover:border-gray-600 dark:peer-checked:border-blue-500 dark:peer-checked:bg-blue-950/20"
                          >
                            <div className="flex-1">
                              <div className="font-medium">{model.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {model.description}
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-end"
            >
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}