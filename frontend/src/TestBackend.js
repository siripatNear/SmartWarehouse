import React, { useState, useEffect } from 'react';
// import axios from 'axios';

function TestBackend() {

    const [backendData, setBackendData] = useState();

    useEffect(() => {

        /* fetch http://localhost:5000/login
            then receive data from server
        */

        fetch('/login').then(
            response => response.json()
            ).then(
                data => { setBackendData(data) }
            )

    }, [])

    return (
        <div>
            {backendData}

        </div>
    )
}

export default TestBackend