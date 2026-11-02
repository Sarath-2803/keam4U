// 'use client';

// import { useState } from 'react';
// import { useNavigate } from 'react-router';
// import {
//   signInWithPopup,
//   GoogleAuthProvider,
// } from 'firebase/auth';
// import { auth } from '../../firebase';
// import { authAPI } from '../api/authAPI';

// export const SignupForm = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     password: '',
//     terms: false,
//   });

//   const handleInputChange = (e) => {
//     const { id, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [id]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleEmailSignup = async (e) => {
//     e.preventDefault();
    
//     if (!formData.name || !formData.phone || !formData.email || !formData.password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     if (!formData.terms) {
//       setError('Please accept the Terms and Conditions');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       // Call backend API instead of Firebase directly
//       const response = await authAPI.signup({
//         name: formData.name,
//         phone: formData.phone,
//         email: formData.email,
//         password: formData.password,
//       });

//       // Store token in localStorage for authenticated requests
//       if (response.token) {
//         localStorage.setItem('authToken', response.token);
//         localStorage.setItem('userId', response.user?.uid || '');
//       }

//       navigate('/');
//     } catch (err) {
//       setError(err.message || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignup = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const provider = new GoogleAuthProvider();
//       const userCredential = await signInWithPopup(auth, provider);
      
//       // Get the ID token from Firebase
//       const idToken = await userCredential.user.getIdToken();

//       // Send ID token to backend for verification and user creation
//       const response = await authAPI.googleSignin({ idToken });

//       // Store token and user info
//       if (response.token) {
//         localStorage.setItem('authToken', response.token);
//         localStorage.setItem('userId', response.user?.uid || '');
//       }

//       navigate('/');
//     } catch (err) {
//       setError(err.message || 'Google signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 mb-15 shadow-xl shadow-slate-200/60 sm:p-8">
//       <div className="mb-8 space-y-2 text-center">
//         <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
//           Sign up
//         </p>
//         <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
//           Create your account
//         </h2>
//         <p className="text-sm leading-6 text-slate-600">
//           Join the platform and get started in just a few seconds.
//         </p>
//       </div>

//       {error && (
//         <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
//           {error}
//         </div>
//       )}

//       <form className="space-y-5" onSubmit={handleEmailSignup}>
//         <div className="space-y-1.5">
//           <label htmlFor="name" className="block text-sm font-medium text-slate-700">
//             Full name
//           </label>
//           <input
//             type="text"
//             id="name"
//             autoComplete="name"
//             placeholder="Enter your full name"
//             value={formData.name}
//             onChange={handleInputChange}
//             disabled={loading}
//             className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
//           />
//         </div>

//         <div className="space-y-1.5">
//           <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
//             Phone number
//           </label>
//           <input
//             type="tel"
//             id="phone"
//             autoComplete="tel"
//             placeholder="Enter your phone number"
//             value={formData.phone}
//             onChange={handleInputChange}
//             disabled={loading}
//             className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
//           />
//         </div>

//         <div className="space-y-1.5">
//           <label htmlFor="email" className="block text-sm font-medium text-slate-700">
//             Email address
//           </label>
//           <input
//             type="email"
//             id="email"
//             autoComplete="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleInputChange}
//             disabled={loading}
//             className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
//           />
//         </div>

//         <div className="space-y-1.5">
//           <label htmlFor="password" className="block text-sm font-medium text-slate-700">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             autoComplete="new-password"
//             placeholder="Create a secure password"
//             value={formData.password}
//             onChange={handleInputChange}
//             disabled={loading}
//             className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
//           />
//         </div>

//         <label htmlFor="terms" className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 cursor-pointer">
//           <input
//             type="checkbox"
//             id="terms"
//             checked={formData.terms}
//             onChange={handleInputChange}
//             disabled={loading}
//             className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//           />
//           <span>
//             I agree to the{' '}
//             <a href="#" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
//               Terms and Conditions
//             </a>
//           </span>
//         </label>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? 'Creating account...' : 'Create account'}
//         </button>
//       </form>

//       <div className="my-6 flex items-center gap-4">
//         <div className="h-px flex-1 bg-slate-200" />
//         <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Or continue with</p>
//         <div className="h-px flex-1 bg-slate-200" />
//       </div>

//       <button
//         type="button"
//         onClick={handleGoogleSignup}
//         disabled={loading}
//         className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
//         aria-label="Sign up with Google"
//       >
//         <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
//           <path
//             fill="#4285F4"
//             d="M22.675 12.204c0-.638-.057-1.252-.163-1.841H12v3.481h6.092a5.2 5.2 0 0 1-2.258 3.415v2.839h3.647c2.134-1.965 3.354-4.864 3.354-8.894Z"
//           />
//           <path
//             fill="#34A853"
//             d="M12 23c3.24 0 5.956-1.074 7.942-2.905l-3.647-2.839c-1.014.68-2.31 1.082-4.295 1.082-3.3 0-6.102-2.227-7.1-5.22H1.15v2.926A11.99 11.99 0 0 0 12 23Z"
//           />
//           <path
//             fill="#FBBC05"
//             d="M4.9 13.118A7.19 7.19 0 0 1 4.5 11c0-.736.127-1.45.4-2.118V5.956H1.15A11.99 11.99 0 0 0 0 11c0 1.93.46 3.754 1.15 5.044l3.75-2.926Z"
//           />
//           <path
//             fill="#EA4335"
//             d="M12 4.75c1.767 0 3.352.608 4.596 1.804l3.444-3.444C17.95 1.177 15.24 0 12 0 7.64 0 3.86 2.49 1.15 5.956l3.75 2.926C5.898 7.02 8.7 4.75 12 4.75Z"
//           />
//         </svg>
//         {loading ? 'Signing up...' : 'Continue with Google'}
//       </button>

//       <p className="mt-6 text-center text-sm text-slate-600">
//         Already have an account?{' '}
//         <a href="/signin" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
//           Log in
//         </a>
//       </p>
//       </div>
//     </div>
//   );
// };