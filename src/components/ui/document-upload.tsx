"use client"

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  File, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  Trash2,
  FileText,
  FileImage,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface UploadedDocument {
  fileName: string
  fileType: string
  uploadedAt: string
  totalChunks: number
}

interface DocumentUploadProps {
  userId?: string
  onUploadSuccess?: (document: UploadedDocument) => void
  className?: string
}

export function DocumentUpload({ 
  userId = 'demo-user', 
  onUploadSuccess,
  className 
}: DocumentUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<string>('')
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([])
  const [error, setError] = useState<string | null>(null)

  // Fetch user documents on component mount
  React.useEffect(() => {
    fetchUserDocuments()
  }, [userId])

  const fetchUserDocuments = async () => {
    try {
      const response = await fetch(`/api/upload?userId=${encodeURIComponent(userId)}`)
      const data = await response.json()
      
      if (data.success) {
        setUploadedDocs(data.documents)
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    setError(null)
    setUploadProgress('Preparing upload...')

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

      const formData = new FormData()
      formData.append('file', file)
      formData.append('userId', userId)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setUploadProgress('Processing complete!')
      
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={className}>
      {/* Upload Area */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-500" />
            Upload Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
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
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                  <div>
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Processing Document...
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
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
                    p-4 rounded-full transition-colors duration-200
                    ${isDragOver 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }
                  `}>
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                      Drop files here or click to browse
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Supports PDF, DOCX, DOC, TXT, MD files up to 10MB
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2"
              >
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-700 dark:text-red-400 font-medium">Upload Error</p>
                  <p className="text-red-600 dark:text-red-500 text-sm">{error}</p>
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
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <File className="w-5 h-5 text-green-500" />
                Your Documents
              </span>
              <Badge variant="outline" className="text-xs">
                {uploadedDocs.length} document{uploadedDocs.length !== 1 ? 's' : ''}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedDocs.map((doc, index) => (
                <motion.div
                  key={`${doc.fileName}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(doc.fileType)}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-xs">
                        {doc.fileName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {doc.totalChunks} chunks • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {doc.fileType.toUpperCase()}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDocument(doc.fileName)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 