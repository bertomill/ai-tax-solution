"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Eye, EyeOff, Shield, Building2, Users, FileText, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PasswordProtectionProps {
  children: React.ReactNode
}

export function PasswordProtection({ children }: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('ai-tax-auth')
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        setIsAuthenticated(true)
        localStorage.setItem('ai-tax-auth', 'authenticated')
        // Add a timestamp for potential session expiry
        localStorage.setItem('ai-tax-auth-timestamp', Date.now().toString())
      } else {
        setError(data.message || 'Incorrect password. Please try again.')
        setPassword('')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
      setPassword('')
    }
    
    setIsLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
    setError('')
    localStorage.removeItem('ai-tax-auth')
    localStorage.removeItem('ai-tax-auth-timestamp')
  }

  // Check for session expiry (24 hours)
  useEffect(() => {
    const authTimestamp = localStorage.getItem('ai-tax-auth-timestamp')
    if (authTimestamp) {
      const timestamp = parseInt(authTimestamp)
      const now = Date.now()
      const hoursDiff = (now - timestamp) / (1000 * 60 * 60)
      
      if (hoursDiff > 24) {
        handleLogout()
      }
    }
  }, [])

  if (isAuthenticated) {
    return (
      <div className="relative">
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Main Card */}
            <Card className="bg-white border border-gray-200 shadow-2xl">
              <CardHeader className="text-center pb-8 pt-8">
                {/* Lock Icon */}
                <motion.div 
                  className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Lock className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                    AI Tax Whiteboarding Session
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600">
                    This application contains confidential information
                  </CardDescription>
                </motion.div>
              </CardHeader>
              
                              <CardContent className="px-8 pb-8">
                  <motion.form 
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="space-y-3">
                      <label htmlFor="password" className="text-sm font-semibold text-gray-900">
                        Access Password
                      </label>
                      <div className="relative group">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password to access"
                          className="pr-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-lg py-3 text-gray-900 placeholder-gray-500"
                          disabled={isLoading}
                        />
                                              <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 rounded-md hover:bg-gray-100"
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4 flex-shrink-0" />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] rounded-lg"
                    disabled={isLoading || !password.trim()}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Verifying Access...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Access Application
                      </div>
                    )}
                  </Button>
                </motion.form>

                {/* Security Notice */}
                <motion.div 
                  className="mt-8 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-center space-y-2">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Authorized personnel only
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
} 