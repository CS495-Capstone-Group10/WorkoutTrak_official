import React, { useState } from 'react'
import axios from 'axios'

function SignupForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = userState('')
    const [name, setName] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post('/api/register/', { email, password, name })
            console.log(response.data)
        } catch (error) {
            setError(error.response.data)
        }

    }
}

return (
    <form onSubmit={handleSubmit}>
        <div>
            <label> Email:</label>
            <input type ="email" value = {email} onChange ={e => setEmail(e.target.value)} required />
            
        </div>
    </form>
)