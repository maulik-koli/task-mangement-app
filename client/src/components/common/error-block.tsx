import React from 'react'
import { AlertTriangle, Inbox, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorBlockProps {
    type: 'error' | 'no-data'
    title: string
    description?: string
    onRetry?: () => void
}

const ErrorBlock: React.FC<ErrorBlockProps> = ({
    type,
    title,
    description,
    onRetry,
}) => {
    const Icon = type === 'error' ? AlertTriangle : Inbox
    const iconColor = type === 'error' ? 'text-destructive' : 'text-muted-foreground'
    const bgColor = type === 'error' ? 'bg-destructive/10' : 'bg-muted'

    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
            <div className={`flex size-12 items-center justify-center rounded-xl ${bgColor}`}>
                <Icon className={`size-6 ${iconColor}`} />
            </div>
            <h3 className="mt-4 text-base font-semibold tracking-tight">{title}</h3>
            {description && (
                <p className="mt-1.5 text-sm text-muted-foreground max-w-xs">
                    {description}
                </p>
            )}
            
            {onRetry && (
                <Button variant="outline" size="sm" onClick={onRetry} className="mt-5 gap-1.5 h-8">
                    <RefreshCw className="size-3.5" />
                    Retry
                </Button>
            )}
        </div>
    )
}

export default ErrorBlock
