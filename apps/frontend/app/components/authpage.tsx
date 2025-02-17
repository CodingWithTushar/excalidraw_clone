"use client";

export function AuthPage({ IsSignIn }: { IsSignIn: boolean }) {
  return <>
  <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#e8edff] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#533ED8] to-[#8168f5] bg-clip-text text-transparent">
          {IsSignIn ? "Welcome Back" : "Join Us"}
        </h1>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-3 bg-[#533ED8] hover:bg-[#3d23e0] text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-300 transform hover:scale-[1.02]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              {/* Google icon */}
              <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a5.94 5.94 0 110-11.88c1.6 0 3.08.549 4.237 1.453l3.027-3.027A9.253 9.253 0 0012.545 2C7.019 2 2.545 6.472 2.545 12s4.474 10 10 10c5.943 0 10.291-4.293 10.291-10 0-.603-.054-1.098-.127-1.602H12.545z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-gray-500 font-medium">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <form className="space-y-5">
            <div className="space-y-1">
              <label className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#533ED8] focus:ring-2 focus:ring-[#533ED8]/20 transition-all outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-700 font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#533ED8] focus:ring-2 focus:ring-[#533ED8]/20 transition-all outline-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-[#533ED8] focus:ring-[#533ED8]"
                />
                Remember me
              </label>
              <a href="#" className="text-[#533ED8] hover:text-[#3d23e0] font-medium">
                Forgot password?
              </a>
            </div>

            <button className="w-full bg-gradient-to-r from-[#533ED8] to-[#8168f5] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#3d23e0] hover:to-[#533ED8] transition-all duration-300 transform hover:scale-[1.02]">
              {IsSignIn ? "Sign In" : "Create Account"}
            </button>
          </form>
          

          <p className="text-center text-gray-600 mt-6">
            {IsSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
            <a href="#" className="text-[#533ED8] hover:text-[#3d23e0] font-semibold">
              {IsSignIn ? "Sign up" : "Sign in"}
            </a>
          </p>
        </div>

        <p className="text-center text-gray-500 text-sm mt-3">
          By continuing, you agree to our{" "}
          <a href="#" className="text-[#533ED8] hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
      
    </div>
  </>
}