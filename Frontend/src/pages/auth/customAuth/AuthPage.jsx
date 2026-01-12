import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaUser,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser, registerUser } from "@/Services/login";
import { Loader2, Sparkles, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import authBackground from "@/assets/auth-background.png";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignInSubmit = async (event) => {
    setSignInError("");
    event.preventDefault();
    const { email, password } = event.target.elements;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      setSignInError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const data = {
      email: email.value,
      password: password.value,
    };

    try {
      console.log("Login Started in Frontend");
      const user = await loginUser(data);
      console.log("Login Completed");

      if (user?.statusCode === 200) {
        navigate("/");
      }
      console.log(user);
    } catch (error) {
      setSignInError(error.message);
      console.log("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (event) => {
    setSignUpError("");
    event.preventDefault();
    const { fullname, email, password } = event.target.elements;

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      setSignUpError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    console.log("User Registration Started");
    const data = {
      fullName: fullname.value,
      email: email.value,
      password: password.value,
    };
    try {
      const response = await registerUser(data);
      if (response?.statusCode === 201) {
        console.log("User Registration Started");
        handleSignInSubmit(event);
      }
    } catch (error) {
      console.log("User Registration Failed");
      setSignUpError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Professional Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${authBackground})`,
        }}
      >
        {/* Dark Overlay for Better Contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/85 to-indigo-900/90"></div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/20 animate-pulse"></div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Branding & Features */}
            <motion.div
              className="text-white space-y-8 hidden lg:block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Logo & Title */}
              <div className="space-y-4">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    AI Resume Builder
                  </h1>
                </motion.div>
                
                <motion.p
                  className="text-xl text-blue-100 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Build Your Professional Future with AI-Powered Tools
                </motion.p>
              </div>

              {/* Features List */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  { icon: Zap, text: "AI-Powered Resume Generation" },
                  { icon: Shield, text: "Secure & Private Data" },
                  { icon: FaCheckCircle, text: "Professional Templates" },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-blue-300" />
                    </div>
                    <span className="text-blue-50 font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Testimonial or Quote */}
              <motion.div
                className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <p className="text-blue-100 italic text-lg">
                  &ldquo;Transform your career journey with intelligent resume building and skill matching.&rdquo;
                </p>
              </motion.div>
            </motion.div>

            {/* Right Side - Auth Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full"
            >
              {/* Glass Card */}
              <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                {/* Decorative Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                
                {/* Card Content */}
                <div className="p-8 sm:p-10 lg:p-12">
                  {/* Tab Switcher */}
                  <div className="flex gap-2 mb-8 bg-gray-100 rounded-2xl p-1.5">
                    <button
                      onClick={() => setIsSignUp(false)}
                      className={`flex-1 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                        !isSignUp
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setIsSignUp(true)}
                      className={`flex-1 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                        isSignUp
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Forms Container */}
                  <AnimatePresence mode="wait">
                    {/* Sign In Form */}
                    {!isSignUp ? (
                      <motion.div
                        key="signin"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-8 text-center">
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome Back!
                          </h2>
                          <p className="text-gray-600">
                            Sign in to continue to your account
                          </p>
                        </div>

                        <form onSubmit={handleSignInSubmit} className="space-y-6">
                          {/* Email Input */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <FaEnvelope size={18} />
                              </div>
                              <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-900 placeholder-gray-400"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                              />
                            </div>
                          </div>

                          {/* Password Input */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Password
                            </label>
                            <div className="relative">
                              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <FaLock size={18} />
                              </div>
                              <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                required
                                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-900 placeholder-gray-400"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                              </button>
                            </div>
                            <div className="text-right mt-2">
                              <button
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                              >
                                Forgot Password?
                              </button>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="animate-spin" size={20} />
                                Signing In...
                              </>
                            ) : (
                              <>
                                Sign In
                                <FaArrowRight />
                              </>
                            )}
                          </button>

                          {/* Error Message */}
                          {signInError && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm text-center"
                            >
                              {signInError}
                            </motion.div>
                          )}

                          {/* Sign Up Link */}
                          <p className="text-center text-gray-600 text-sm">
                            Don't have an account?{" "}
                            <button
                              type="button"
                              onClick={() => setIsSignUp(true)}
                              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                            >
                              Sign Up
                            </button>
                          </p>
                        </form>
                      </motion.div>
                    ) : (
                      /* Sign Up Form */
                      <motion.div
                        key="signup"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-8 text-center">
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Create Account
                          </h2>
                          <p className="text-gray-600">
                            Join us to start building your resume
                          </p>
                        </div>

                        <form onSubmit={handleSignUpSubmit} className="space-y-6">
                          {/* Full Name Input */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Full Name
                            </label>
                            <div className="relative">
                              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <FaUser size={18} />
                              </div>
                              <input
                                type="text"
                                name="fullname"
                                placeholder="John Doe"
                                required
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-900 placeholder-gray-400"
                              />
                            </div>
                          </div>

                          {/* Email Input */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <FaEnvelope size={18} />
                              </div>
                              <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-900 placeholder-gray-400"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                              />
                            </div>
                          </div>

                          {/* Password Input */}
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Password
                            </label>
                            <div className="relative">
                              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <FaLock size={18} />
                              </div>
                              <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create a strong password"
                                required
                                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-900 placeholder-gray-400"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                              </button>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="animate-spin" size={20} />
                                Creating Account...
                              </>
                            ) : (
                              <>
                                Create Account
                                <FaArrowRight />
                              </>
                            )}
                          </button>

                          {/* Error Message */}
                          {signUpError && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm text-center"
                            >
                              {signUpError}
                            </motion.div>
                          )}

                          {/* Sign In Link */}
                          <p className="text-center text-gray-600 text-sm">
                            Already have an account?{" "}
                            <button
                              type="button"
                              onClick={() => setIsSignUp(false)}
                              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                            >
                              Sign In
                            </button>
                          </p>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobile Branding */}
              <motion.div
                className="lg:hidden mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-white/80 text-sm">
                  © 2024 AI Resume Builder. All rights reserved.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
