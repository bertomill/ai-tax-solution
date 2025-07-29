"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  File, 
  Loader2, 
  XCircle, 
  Trash2,
  FileText,
  FileImage,
  X,
  Type,
  FolderOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface UploadedDocument {
  fileName: string
  fileType: string
  uploadedAt: string
  totalChunks: number
}

interface DocumentUploadProps {
  userId?: string
  onUploadSuccess?: (document: UploadedDocument) => void
  onUploadStart?: (fileName: string) => void
  onUploadProgress?: (progress: number) => void
  onUploadError?: () => void
  className?: string
}

export function DocumentUpload({ 
  userId = 'demo-user', 
  onUploadSuccess,
  onUploadStart,
  onUploadProgress,
  onUploadError,
  className 
}: DocumentUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string>('')
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([])
  const [error, setError] = useState<string | null>(null)
  const [pastedText, setPastedText] = useState('')
  const [textTitle, setTextTitle] = useState('')

  const fetchUserDocuments = useCallback(async () => {
    try {
      const response = await fetch(`/api/upload?userId=${encodeURIComponent(userId)}`)
      const data = await response.json()
      
      if (data.success) {
        setUploadedDocs(data.documents)
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }, [userId])

  // Fetch user documents on component mount
  useEffect(() => {
    fetchUserDocuments()
  }, [fetchUserDocuments])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileUpload = useCallback(async (file: File) => {
    setIsUploading(true)
    setError(null)
    setUploadProgress('Preparing upload...')

    // Call upload start callback
    onUploadStart?.(file.name)

    // Simulate progress updates
    const simulateProgress = (targetProgress: number, duration: number) => {
      return new Promise(resolve => {
        const steps = 20
        const increment = targetProgress / steps
        let currentProgress = 0
        
        const interval = setInterval(() => {
          currentProgress += increment
          if (currentProgress >= targetProgress) {
            currentProgress = targetProgress
            clearInterval(interval)
            resolve(currentProgress)
          }
          onUploadProgress?.(currentProgress)
        }, duration / steps)
      })
    }

    try {
      // Validate file type
      const allowedTypes = ['pdf', 'docx', 'doc', 'txt', 'md']
      const fileExtension = file.name.split('.').pop()?.toLowerCase()
      
      if (!fileExtension || !allowedTypes.includes(fileExtension)) {
        throw new Error('Unsupported file type. Please upload PDF, DOCX, DOC, TXT, or MD files.')
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size too large. Maximum size is 10MB.')
      }

      setUploadProgress('Uploading and processing...')
      
      // Simulate upload progress - increased from 2.5s to 6s
      await simulateProgress(30, 6000)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('userId', userId)

      // Simulate more progress during API call - increased from 5s to 12s
      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      const progressPromise = simulateProgress(80, 12000)
      
      const [response] = await Promise.all([uploadPromise, progressPromise])
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setUploadProgress('Processing complete!')
      
      // Final progress update - increased from 1.5s to 2s
      await simulateProgress(100, 2000)
      
      // Refresh document list
      await fetchUserDocuments()
      
      // Call success callback
      onUploadSuccess?.(data)

      setTimeout(() => {
        setUploadProgress('')
        setIsUploading(false)
      }, 1000)

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Upload failed')
      setIsUploading(false)
      setUploadProgress('')
      onUploadError?.()
    }
  }, [userId, onUploadStart, onUploadProgress, onUploadSuccess, onUploadError, fetchUserDocuments])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [handleFileUpload])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleTextSubmit = async () => {
    if (!pastedText.trim()) {
      setError('Please enter some text to process')
      return
    }

    if (!textTitle.trim()) {
      setError('Please provide a title for your text document')
      return
    }

    setIsUploading(true)
    setError(null)
    setUploadProgress('Processing text...')

    // Call upload start callback
    onUploadStart?.(textTitle)

    // Simulate progress updates
    const simulateProgress = (targetProgress: number, duration: number) => {
      return new Promise(resolve => {
        const steps = 20
        const increment = targetProgress / steps
        let currentProgress = 0
        
        const interval = setInterval(() => {
          currentProgress += increment
          if (currentProgress >= targetProgress) {
            currentProgress = targetProgress
            clearInterval(interval)
            resolve(currentProgress)
          }
          onUploadProgress?.(currentProgress)
        }, duration / steps)
      })
    }

    try {
      // Validate text length
      if (pastedText.length > 1000000) { // 1MB text limit
        throw new Error('Text is too long. Maximum length is 1MB.')
      }

      setUploadProgress('Uploading and processing...')
      
      // Simulate progress during processing - increased from 2.5s to 6s
      await simulateProgress(40, 6000)

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: pastedText,
          title: textTitle,
          userId: userId,
        }),
      })
      
      // Simulate more progress during API call - increased from 4s to 12s
      const progressPromise = simulateProgress(85, 12000)
      
      const [response] = await Promise.all([uploadPromise, progressPromise])
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setUploadProgress('Processing complete!')
      
      // Final progress update - increased from 1.5s to 2s
      await simulateProgress(100, 2000)
      
      // Clear the form
      setPastedText('')
      setTextTitle('')
      
      // Refresh document list
      await fetchUserDocuments()
      
      // Call success callback
      onUploadSuccess?.(data)

      setTimeout(() => {
        setUploadProgress('')
        setIsUploading(false)
      }, 1000)

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Text processing failed')
      setIsUploading(false)
      setUploadProgress('')
      onUploadError?.()
    }
  }

  const handleDeleteDocument = async (fileName: string) => {
    try {
      const response = await fetch('/api/upload', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName, userId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Delete failed')
      }

      // Refresh document list
      await fetchUserDocuments()
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Delete failed')
    }
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FileImage className="w-4 h-4 text-red-500" />
      case 'docx':
      case 'doc':
        return <FileText className="w-4 h-4 text-blue-500" />
      case 'txt':
      case 'md':
        return <FileText className="w-4 h-4 text-gray-500" />
      default:
        return <File className="w-4 h-4 text-gray-500" />
    }
  }


  return (
    <div className={className}>
      {/* Upload Area */}
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-500" />
              Add Documents
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="w-full">
            <div className="flex justify-end mb-3">
              <TabsList className="h-7 bg-gray-50 dark:bg-gray-900 border">
                <TabsTrigger value="upload" className="text-xs px-2 py-1 h-5 flex items-center gap-1">
                  <FolderOpen className="w-3 h-3" />
                  Files
                </TabsTrigger>
                <TabsTrigger value="paste" className="text-xs px-2 py-1 h-5 flex items-center gap-1">
                  <Type className="w-3 h-3" />
                  Text
                </TabsTrigger>
              </TabsList>
            </div>

            {/* File Upload Tab */}
            <TabsContent value="upload">
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200
              ${isDragOver 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }
              ${isUploading ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => {
              if (!isUploading) {
                document.getElementById('file-input')?.click()
              }
            }}
          >
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept=".pdf,.docx,.doc,.txt,.md"
              onChange={handleFileSelect}
              disabled={isUploading}
            />

            <AnimatePresence mode="wait">
              {isUploading ? (
                <motion.div
                  key="uploading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center gap-4"
                >
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Processing...
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 px-2 text-center">
                      {uploadProgress}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className={`
                    p-3 rounded-full transition-colors duration-200
                    ${isDragOver 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }
                  `}>
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                      Drop or click to upload
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                      PDF, DOCX, TXT, MD
                      <br />
                      Up to 10MB
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
            </TabsContent>

            {/* Paste Text Tab */}
            <TabsContent value="paste">
              <div className="space-y-3">
                {/* Title Input */}
                <div>
                  <label htmlFor="text-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Document Title
                  </label>
                  <input
                    id="text-title"
                    type="text"
                    value={textTitle}
                    onChange={(e) => setTextTitle(e.target.value)}
                    placeholder="Document title..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                    disabled={isUploading}
                  />
                </div>

                {/* Text Area */}
                <div>
                  <label htmlFor="text-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Text Content
                  </label>
                  <textarea
                    id="text-content"
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder="Paste text content here..."
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-vertical text-sm"
                    disabled={isUploading}
                  />
                  <div className="mt-2 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>{pastedText.length.toLocaleString()} characters</span>
                    <span>Maximum: 1MB</span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={handleTextSubmit}
                    disabled={isUploading || !pastedText.trim() || !textTitle.trim()}
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xs"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Type className="w-3 h-3 mr-1" />
                        Process
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2"
              >
                <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-red-700 dark:text-red-400 font-medium text-xs">Error</p>
                  <p className="text-red-600 dark:text-red-500 text-xs break-words">{error}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setError(null)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Uploaded Documents List */}
      {uploadedDocs.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <File className="w-4 h-4 text-green-500" />
                Documents
              </span>
              <Badge variant="outline" className="text-xs">
                {uploadedDocs.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {uploadedDocs.map((doc, index) => (
                <motion.div
                  key={`${doc.fileName}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {getFileIcon(doc.fileType)}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100 truncate text-xs">
                        {doc.fileName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteDocument(doc.fileName)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 h-6 w-6 p-0 flex-shrink-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 