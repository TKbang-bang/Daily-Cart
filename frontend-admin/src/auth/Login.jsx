// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./auth.css";
// import { toast } from "sonner";
// import { login } from "../Services/auth.service";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login(email, password);

//       if (!res.ok) throw new Error(res.message);

//       toast.success(res.message);
//       navigate("/");
//     } catch (error) {
//       return toast.error(error.message);
//     }
//   };

//   return (
//     <div className="auth">
//       <form onSubmit={handleSubmit}>
//         <h1>Log in</h1>

//         <article className="feild_container">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </article>

//         <article className="feild_container">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             maxLength={12}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </article>

//         <button type="submit">Log in</button>

//         <p className="or">Or</p>

//         <p className="other">
//           Don't have an account? <Link to={"/signup"}>Sign up</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React from "react";

function Login() {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}

export default Login;
