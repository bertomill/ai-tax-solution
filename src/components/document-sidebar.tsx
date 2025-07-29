"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  FileText, 
  Database, 
  Plus,
  Type,
  FolderOpen,
  Trash2,
  X,
  CheckCircle2,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DocumentUpload } from '@/components/ui/document-upload'

interface DocumentSidebarProps {
  className?: string
}

export function DocumentSidebar({ className }: DocumentSidebarProps) {
  const [showUpload, setShowUpload] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<'file' | 'text'>('file')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadFileName, setUploadFileName] = useState('')

  const handleUploadStart = (fileName: string) => {
    setIsUploading(true)
    setUploadProgress(0)
    setUploadFileName(fileName)
  }

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress)
  }

  const handleUploadSuccess = () => {
    console.log('Document uploaded successfully!')
    setUploadProgress(100)
    setTimeout(() => {
      setIsUploading(false)
      setShowUpload(false)
      setUploadProgress(0)
      setUploadFileName('')
    }, 1000)
  }

  const handleUploadError = () => {
    setIsUploading(false)
    setUploadProgress(0)
    setUploadFileName('')
  }

  // Mock data for demonstration
  const sampleDocuments = [
    { id: '1', name: 'Tax Code Section 199A', type: 'txt', uploadedAt: '2024-01-15' },
    { id: '2', name: 'Corporate Tax Rates 2024', type: 'pdf', uploadedAt: '2024-01-14' },
    { id: '3', name: 'IRS Regulation Updates', type: 'txt', uploadedAt: '2024-01-13' },
  ]

  const getFileIcon = (type: string) => {
    return <FileText className="w-4 h-4" />
  }

  const getFileColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-500'
      case 'txt': return 'text-blue-500'
      case 'docx': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="sticky top-8 space-y-4"
      >
        {/* Project Knowledge Header */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Database className="w-5 h-5 text-blue-500" />
                Project Knowledge
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowUpload(!showUpload)}
                className="h-7 text-xs px-2 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 dark:text-gray-400">
            <p>Upload tax documents and paste text content to expand your AI research capabilities.</p>
          </CardContent>
        </Card>

        {/* Upload Interface */}
        <AnimatePresence>
          {showUpload && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DocumentUpload 
                onUploadSuccess={handleUploadSuccess}
                onUploadStart={handleUploadStart}
                onUploadProgress={handleUploadProgress}
                onUploadError={handleUploadError}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Documents List */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Documents ({sampleDocuments.length})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sampleDocuments.map((doc) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <div className={`${getFileColor(doc.type)}`}>
                    {getFileIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </motion.div>
              ))}
            </div>

            {sampleDocuments.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No documents uploaded yet</p>
                <p className="text-xs">Add documents to enhance AI research</p>
              </div>
            )}
          </CardContent>
        </Card>


      </motion.div>

      {/* Upload Progress Drawer */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <div className="max-w-md mx-auto p-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {uploadProgress === 100 ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </motion.div>
                  ) : (
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {uploadProgress === 100 ? 'Upload complete!' : 'Uploading...'}
                    </p>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {Math.round(uploadProgress)}%
                    </span>
                  </div>
                  
                  {uploadFileName && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-2">
                      {uploadFileName}
                    </p>
                  )}
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        uploadProgress === 100 
                          ? 'bg-green-500 dark:bg-green-400' 
                          : 'bg-blue-500 dark:bg-blue-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                {uploadProgress !== 100 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsUploading(false)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 