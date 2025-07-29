"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  FileText, 
  Download, 
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DocumentViewerProps {
  isOpen: boolean
  onClose: () => void
  document: {
    fileName: string
    fileType: string
    storagePath?: string
  }
  userId: string
}

export function DocumentViewer({ isOpen, onClose, document, userId }: DocumentViewerProps) {
  const [documentUrl, setDocumentUrl] = useState<string | null>(null)
  const [textContent, setTextContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadDocument = useCallback(async () => {
    if (!document.storagePath) {
      setError('Document storage path not available')
      return
    }

    setLoading(true)
    setError(null)
    setTextContent(null)
    setDocumentUrl(null)

    try {
      const response = await fetch(
        `/api/view-document?storagePath=${encodeURIComponent(document.storagePath)}&userId=${encodeURIComponent(userId)}`
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load document')
      }

      setDocumentUrl(data.documentUrl)
      
      console.log('Document URL:', data.documentUrl)
      console.log('Document type:', document.fileType)

      // For text files, fetch the content directly to display inline
      if (document.fileType === 'txt' || document.fileType === 'md') {
        try {
          const textResponse = await fetch(data.documentUrl)
          const text = await textResponse.text()
          setTextContent(text)
        } catch (textError) {
          console.error('Error loading text content:', textError)
          // Still allow download even if inline preview fails
        }
      }

    } catch (err) {
      console.error('Error loading document:', err)
      setError(err instanceof Error ? err.message : 'Failed to load document')
    } finally {
      setLoading(false)
    }
  }, [document.storagePath])

  useEffect(() => {
    if (isOpen && document.storagePath) {
      loadDocument()
    }
  }, [isOpen, document.storagePath, loadDocument])

  const handleDownload = () => {
    if (documentUrl) {
      const link = window.document.createElement('a')
      link.href = documentUrl
      link.download = document.fileName
      window.document.body.appendChild(link)
      link.click()
      window.document.body.removeChild(link)
    }
  }

  const handleOpenInNewTab = () => {
    if (documentUrl) {
      window.open(documentUrl, '_blank')
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading document...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 font-medium mb-2">Error loading document</p>
            <p className="text-gray-600 text-sm">{error}</p>
          </div>
        </div>
      )
    }

    // Render based on file type
    switch (document.fileType.toLowerCase()) {
      case 'pdf':
        return (
          <div className="h-96 md:h-[600px]">
            {documentUrl ? (
              <div className="h-full">
                <iframe
                  src={`${documentUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                  className="w-full h-full border rounded-lg"
                  title={document.fileName}
                  allow="fullscreen"
                  onError={() => {
                    console.error('PDF iframe failed to load')
                  }}
                />
                <div className="mt-2 text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    Having trouble viewing? 
                  </p>
                  <Button 
                    onClick={handleOpenInNewTab} 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Open PDF in new tab
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full border rounded-lg bg-gray-50">
                <p className="text-gray-500">PDF preview not available</p>
              </div>
            )}
          </div>
        )

      case 'txt':
      case 'md':
        return (
          <div className="h-96 md:h-[600px] overflow-y-auto">
            {textContent ? (
              <div className="p-4 bg-gray-50 rounded-lg border">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                  {textContent}
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full border rounded-lg bg-gray-50">
                <p className="text-gray-500">Text content not available for preview</p>
              </div>
            )}
          </div>
        )

      case 'docx':
      case 'doc':
        return (
          <div className="h-96 md:h-[600px] flex items-center justify-center border rounded-lg bg-gray-50">
            <div className="text-center">
              <FileText className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-2">Word Document Preview</p>
              <p className="text-gray-500 text-sm mb-4">
                Word documents cannot be previewed inline.
              </p>
              <div className="space-x-2">
                <Button onClick={handleDownload} size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button onClick={handleOpenInNewTab} variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open
                </Button>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="h-96 flex items-center justify-center border rounded-lg bg-gray-50">
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-2">Preview Not Available</p>
              <p className="text-gray-500 text-sm mb-4">
                This file type cannot be previewed inline.
              </p>
              <div className="space-x-2">
                <Button onClick={handleDownload} size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button onClick={handleOpenInNewTab} variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open
                </Button>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="bg-white dark:bg-gray-800 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate flex-1 mr-4">
                  {document.fileName}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {documentUrl && (
                    <>
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        size="sm"
                        className="hidden sm:flex"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        onClick={handleOpenInNewTab}
                        variant="outline"
                        size="sm"
                        className="hidden sm:flex"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open
                      </Button>
                    </>
                  )}
                  <Button
                    onClick={onClose}
                    variant="outline"
                    size="sm"
                    className="p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {renderContent()}
                
                {/* Mobile action buttons */}
                {documentUrl && (
                  <div className="mt-4 flex space-x-2 sm:hidden">
                    <Button onClick={handleDownload} className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button onClick={handleOpenInNewTab} variant="outline" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 