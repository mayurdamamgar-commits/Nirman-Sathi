import React, { useState } from 'react';
import GoogleIcon from './icons/GoogleIcon';

interface AuthProps {
    onLoginSuccess: () => void;
}

type AuthMode = 'signIn' | 'signUp' | 'otp';

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
    const [authMode, setAuthMode] = useState<AuthMode>('signIn');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (authMode === 'signIn') {
            // Simulate successful sign-in
            onLoginSuccess();
        } else if (authMode === 'signUp') {
            const password = (e.target as any).password.value;
            const confirmPassword = (e.target as any).confirmPassword.value;
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }
            // Move to OTP step on successful sign-up validation
            setAuthMode('otp');
        } else if (authMode === 'otp') {
            // Simulate successful OTP verification
            onLoginSuccess();
        }
    };
    
    const renderSignIn = () => (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email or Phone number</label>
                <input id="email" name="email" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900" />
            </div>
            <div>
                <label htmlFor="password"  className="block text-sm font-medium text-gray-700">Password</label>
                <input id="password" name="password" type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900" />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign in</button>
        </form>
    );

    const renderSignUp = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email or Phone number</label>
                <input id="email" name="email" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900" />
            </div>
            <div>
                <label htmlFor="password"  className="block text-sm font-medium text-gray-700">Create Password</label>
                <input id="password" name="password" type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900" />
            </div>
             <div>
                <label htmlFor="confirmPassword"  className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-900" />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Create Account</button>
        </form>
    );

    const renderOtp = () => (
        <form onSubmit={handleSubmit} className="space-y-6 text-center">
            <p className="text-gray-600">A verification code has been sent to your email/phone. Please enter it below.</p>
            <div>
                <label htmlFor="otp" className="sr-only">Verification Code</label>
                <input id="otp" name="otp" type="text" maxLength={6} required placeholder="_ _ _ _ _ _" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center tracking-[1em] bg-white text-gray-900" />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Verify & Access</button>
        </form>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                 <div className="flex justify-center items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                    </div>
                 </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {authMode === 'signIn' ? 'Sign in to your account' : authMode === 'signUp' ? 'Create a new account' : 'Verify your identity'}
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
                    { authMode !== 'otp' && (
                        <div className="mb-6">
                            <div className="flex border-b">
                                <button onClick={() => { setAuthMode('signIn'); setError(''); }} className={`w-full py-2 text-sm font-medium ${authMode === 'signIn' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Sign In</button>
                                <button onClick={() => { setAuthMode('signUp'); setError(''); }} className={`w-full py-2 text-sm font-medium ${authMode === 'signUp' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Sign Up</button>
                            </div>
                        </div>
                    )}

                    {authMode === 'signIn' && renderSignIn()}
                    {authMode === 'signUp' && renderSignUp()}
                    {authMode === 'otp' && renderOtp()}

                    { authMode !== 'otp' && (
                        <>
                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button onClick={onLoginSuccess} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <GoogleIcon />
                                        <span className="ml-2">Sign in with Google</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;