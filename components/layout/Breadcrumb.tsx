import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  name: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-gray-50 py-3" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
              )}
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="text-green-700 hover:text-green-900 transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-gray-500">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}