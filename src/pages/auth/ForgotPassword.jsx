import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (value) => {
        if (!value) {
            return "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
            return "Please enter a valid email";
        }
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateEmail(email);
        if (validationError) {
            setError(validationError);
            return;
        }
        setError("");
        setIsSubmitting(true);
        try {
            // Replace with API call to request reset link
            await new Promise((res) => setTimeout(res, 1200)); // simulate API
            toast.success("If your email exists, we've sent a reset link.");
            setEmail("");
        } catch {
            toast.error("Failed to send reset link. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-md mx-auto">
                <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
                    Forgot your password?
                </h2>
                <p className="text-gray-600 text-center mb-8">
                    Forgot your password? No worries — enter your email below to receive a password reset link..
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${error.email ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                                autoComplete="email"
                                disabled={isSubmitting}
                            />
                        </div>
                        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none transition disabled:opacity-50"
                    >
                        {isSubmitting ? "Sending link..." : "Send reset link"}
                    </button>
                </form>
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="block mx-auto mt-6 text-blue-600 hover:text-blue-700 font-medium"
                >
                    Back to login
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
