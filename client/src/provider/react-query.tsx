'use client'
import React from 'react'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { showToast } from '@/lib/toast';

const shouldShowErrorToast = (error: any): boolean => {
    const status = error?.status;
    const code = error?.code;
    
    if (status === 401 || code === 'UNAUTHORIZED') return false;

    return true;
};


const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error: any) => {
            if (!shouldShowErrorToast(error)) return;
            showToast.error(error?.message || 'Something went wrong');
        },
    }),

    mutationCache: new MutationCache({
        onError: (error: any) => {
            if (!shouldShowErrorToast(error)) return;
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