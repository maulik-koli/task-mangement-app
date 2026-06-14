'use client'
import React from 'react'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { showToast } from '@/lib/toast';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error: any) => {
            showToast.error(error?.message || 'Something went wrong');
        },
    }),

    mutationCache: new MutationCache({
        onError: (error: any) => {
            showToast.error(error?.message || 'Something went wrong');
        },
    }),
})

const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider