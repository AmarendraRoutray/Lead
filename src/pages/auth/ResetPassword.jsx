import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Lock } from "lucide-react";
import { resetPasswordApi } from "../../services/AuthService";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { token } = useParams();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            // API call with token in URL
            await resetPasswordApi(token, { password: formData.password });

            toast.success("Password reset successful! Please log in.");
            navigate("/login");
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Reset failed. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-md mx-auto">
                <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
                    Reset Password
                </h2>
                <p className="text-gray-600 text-center mb-8">
                    Choose a strong new password and confirm it below to secure your
                    account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
                                    }`}
                                disabled={isSubmitting}
                            />
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-enter new password"
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.confirmPassword
                                        ? "border-red-300 bg-red-50"
                                        : "border-gray-300"
                                    }`}
                                disabled={isSubmitting}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none transition disabled:opacity-50"
                    >
                        {isSubmitting ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
