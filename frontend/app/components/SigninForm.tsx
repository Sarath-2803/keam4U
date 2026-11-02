// 'use client';

// import { useState } from 'react';
// import { useNavigate } from 'react-router';
// import {
// 	signInWithPopup,
// 	GoogleAuthProvider,
// } from 'firebase/auth';
// import { auth } from '../../firebase';
// import { authAPI } from '../api/authAPI';

// export const SigninForm = () => {
// 	const navigate = useNavigate();
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState('');
// 	const [formData, setFormData] = useState({
// 		email: '',
// 		password: '',
// 	});

// 	const handleInputChange = (e) => {
// 		const { id, value } = e.target;
// 		setFormData(prev => ({
// 			...prev,
// 			[id]: value
// 		}));
// 	};

// 	const handleEmailSignin = async (e) => {
// 		e.preventDefault();

// 		if (!formData.email || !formData.password) {
// 			setError('Please fill in all fields');
// 			return;
// 		}

// 		setLoading(true);
// 		setError('');

// 		try {
// 			// Call backend API for sign in
// 			const response = await authAPI.signin({
// 				email: formData.email,
// 				password: formData.password,
// 			});

// 			// Store token and user info
// 			if (response.token) {
// 				localStorage.setItem('authToken', response.token);
// 				localStorage.setItem('userId', response.user?.uid || '');
// 			}

// 			navigate('/');
// 		} catch (err) {
// 			setError(err.message || 'Signin failed');
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const handleGoogleSignin = async () => {
// 		setLoading(true);
// 		setError('');

// 		try {
// 			const provider = new GoogleAuthProvider();
// 			const userCredential = await signInWithPopup(auth, provider);
			
// 			// Get the ID token from Firebase
// 			const idToken = await userCredential.user.getIdToken();

// 			// Send ID token to backend for verification
// 			const response = await authAPI.googleSignin({ idToken });

// 			// Store token and user info
// 			if (response.token) {
// 				localStorage.setItem('authToken', response.token);
// 				localStorage.setItem('userId', response.user?.uid || '');
// 			}

// 			navigate('/');
// 		} catch (err) {
// 			setError(err.message || 'Google signin failed');
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<div className="w-full rounded-2xl mt-10 border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
// 			<div className="mb-8 space-y-2 text-center">
// 				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
// 					Sign in
// 				</p>
// 				<h2 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
// 					Welcome back
// 				</h2>
// 				<p className="text-sm leading-6 text-slate-600">
// 					Sign in to continue to your dashboard.
// 				</p>
// 			</div>

// 			{error && (
// 				<div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
// 					{error}
// 				</div>
// 			)}

// 			<form className="space-y-5" onSubmit={handleEmailSignin}>
// 				<div className="space-y-1.5">
// 					<label htmlFor="email" className="block text-sm font-medium text-slate-700">
// 						Email address
// 					</label>
// 					<input
// 						type="email"
// 						id="email"
// 						autoComplete="email"
// 						placeholder="Enter your email"
// 						value={formData.email}
// 						onChange={handleInputChange}
// 						disabled={loading}
// 						className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
// 					/>
// 				</div>

// 				<div className="space-y-1.5">
// 					<label htmlFor="password" className="block text-sm font-medium text-slate-700">
// 						Password
// 					</label>
// 					<input
// 						type="password"
// 						id="password"
// 						autoComplete="current-password"
// 						placeholder="Enter your password"
// 						value={formData.password}
// 						onChange={handleInputChange}
// 						disabled={loading}
// 						className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
// 					/>
// 				</div>

// 				<button
// 					type="submit"
// 					disabled={loading}
// 					className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
// 				>
// 					{loading ? 'Signing in...' : 'Sign in'}
// 				</button>
// 			</form>

// 			<div className="my-6 flex items-center gap-4">
// 				<div className="h-px flex-1 bg-slate-200" />
// 				<p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Or continue with</p>
// 				<div className="h-px flex-1 bg-slate-200" />
// 			</div>

// 			<button
// 				type="button"
// 				onClick={handleGoogleSignin}
// 				disabled={loading}
// 				className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
// 				aria-label="Sign in with Google"
// 			>
// 				<svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
// 					<path
// 						fill="#4285F4"
// 						d="M22.675 12.204c0-.638-.057-1.252-.163-1.841H12v3.481h6.092a5.2 5.2 0 0 1-2.258 3.415v2.839h3.647c2.134-1.965 3.354-4.864 3.354-8.894Z"
// 					/>
// 					<path
// 						fill="#34A853"
// 						d="M12 23c3.24 0 5.956-1.074 7.942-2.905l-3.647-2.839c-1.014.68-2.31 1.082-4.295 1.082-3.3 0-6.102-2.227-7.1-5.22H1.15v2.926A11.99 11.99 0 0 0 12 23Z"
// 					/>
// 					<path
// 						fill="#FBBC05"
// 						d="M4.9 13.118A7.19 7.19 0 0 1 4.5 11c0-.736.127-1.45.4-2.118V5.956H1.15A11.99 11.99 0 0 0 0 11c0 1.93.46 3.754 1.15 5.044l3.75-2.926Z"
// 					/>
// 					<path
// 						fill="#EA4335"
// 						d="M12 4.75c1.767 0 3.352.608 4.596 1.804l3.444-3.444C17.95 1.177 15.24 0 12 0 7.64 0 3.86 2.49 1.15 5.956l3.75 2.926C5.898 7.02 8.7 4.75 12 4.75Z"
// 					/>
// 				</svg>
// 				{loading ? 'Signing in...' : 'Continue with Google'}
// 			</button>

// 			<p className="mt-6 text-center text-sm text-slate-600">
// 				Don&apos;t have an account?{' '}
// 				<a href="/signup" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
// 					Sign up
// 				</a>
// 			</p>
// 			</div>
// 		</div>
// 	);
// };
