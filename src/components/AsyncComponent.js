import React, { lazy, Suspense } from 'react';

export function asyncComponent(importComponent) {
    const DynamicComponent = lazy(() => importComponent);

    return () => (
        <Suspense fallback={<div></div>}>
            <DynamicComponent />
        </Suspense>
    );
}
