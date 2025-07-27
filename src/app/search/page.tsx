import { RAGSearch } from '@/components/rag-search'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(156,146,172,0.15)_1px,transparent_0)] bg-[length:20px_20px] opacity-30" />
      
      <div className="relative z-10 py-8">
        <RAGSearch />
      </div>
    </div>
  )
}