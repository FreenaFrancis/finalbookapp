// import { useState, useEffect, useContext, createContext } from "react";
// import axios from 'axios';

// // Create Auth Context
// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     user: null,
//     token: "",
//   });

//   // Set default Authorization header for axios requests
//   axios.defaults.headers.common['Authorization'] = auth?.token;

//   // Load auth data from localStorage when the app loads
//   useEffect(() => {
//     const data = localStorage.getItem('auth');
//     if (data) {
//       const parseData = JSON.parse(data);
//       setAuth({
//         user: parseData.user,
//         token: parseData.token,
//       });
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use AuthContext
// const useAuth = () => useContext(AuthContext);

// export { useAuth, AuthProvider };
