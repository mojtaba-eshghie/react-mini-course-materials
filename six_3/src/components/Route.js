// we do not need to import react since we have not written any jsx here
// import React from 'react';

import React, { useState, useEffect } from 'react'

const Route = ( { path, children } ) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    const onLocationChange = () => {
        setCurrentPath(window.location.pathname)
    }

    useEffect(() => {
        window.addEventListener('popstate', onLocationChange);

        return () => {
            window.removeEventListener('popstate', onLocationChange); 
        }

    }, []);

    return window.location.pathname === path ? children : null
};   

export default Route;