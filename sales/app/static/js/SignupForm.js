// import React, { useState } from 'react'
// import axios from 'axios'

// function SignupForm() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = userState('');
//     const [name, setName] = useState('');
//     const [error, setError] = useState(null);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await axios.post('/api/register/', { email, password, name });
//             console.log(response.data);
//         } catch (error) {
//             setError(error.response.data);
//         }

//     };

//     return (
//     <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="email"> Email:</label>
//                 <input type ="email" id="email" value={email} onChange={e =>setEmail(e.target.value)} required />

//             </div>
//             <div>
//                 <label htmlFor="password"> Password:</label>
//                 <input type = "password" id="password" value ={password} onChange={e => setPassword(e.target.value)} required />

//             </div>
//             <div>
//                 <label htmlFor="name">Name:</label>
//                 <input type ="text" id="name" value={name} onChange={e => setName(e.target.value)} required />

//             </div>
//             {error && <p> {error}</p>}
//             <button type="submit">Sign up</button>
//         </form>
//     );
// }
// export default SignupForm;