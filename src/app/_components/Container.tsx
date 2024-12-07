import React from 'react';

function Container({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="p-4">
            {children}
        </div>
    );
}

export default Container;