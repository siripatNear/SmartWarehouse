import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TestBackend() {

    const [backendData, setBackendData] = useState([{}]);

    useEffect(() => {

        fetch('/api').then(
            response => response.json()
            ).then(
                data => { setBackendData(data) }
            )

    }, [])

    return (
        <div>
            {backendData.users}
            {/* {(typeof backendData.users === 'undefined') ? (
                <p> Loading... </p>
            ):(
                backendData.users.map((user,i) =>{
                    return <p key={i}>{user}</p>
                })
            )} */}
        </div>
    )
}

export default TestBackend