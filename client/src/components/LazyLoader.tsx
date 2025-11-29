// src/components/LazyLoader.tsx
import { Suspense, ReactNode } from "react";

interface LazyLoaderProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export const LazyLoader = ({
                               children,
                               fallback = (
                                   <div className="text-center py-20 text-gray-500">
                                       Loading...
                                   </div>
                               ),
                           }: LazyLoaderProps) => {
    return <Suspense fallback={fallback}>{children}</Suspense>;
};
