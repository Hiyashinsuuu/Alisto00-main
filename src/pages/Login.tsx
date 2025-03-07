
import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div
        className="w-1/2 flex flex-col justify-center items-center relative shadow-2xl slide-in"
        style={{
          backgroundImage: "url('/clouds.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopRightRadius: '120px',
          borderBottomRightRadius: '120px'
        }}
      >
        <div className="text-center">
          <h1 className="text-[96px] font-bold text-[#007AFF] mt-12">Welcome</h1>
          <h2 className="text-[48px] text-[#007AFF] font-bold mt-2">── to AListō ──</h2>
          <p className="text-[20px] text-white mt-2 mb-4 italic">Your Plans, Your Moves, AListō Grooves</p>
          <p className="mt-2 text-black text-[14px]">Don't have an account?</p>
          <Link to="/register">
            <button
              className="text-[16.91px] mt-2 mb-14 w-[311.6000061035156px] py-2 border-2 border-blue-300 text-[#007AFF] rounded hover:bg-blue-50 transition-colors">
              Register
            </button>
          </Link>
        </div>
        <img src="/cat.png" alt="cat" className="w-64 h-auto rounded" />
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex flex-col justify-start items-center pt-[12rem] blur-effect">
        <div className="w-2/3 flex flex-col items-center">
          <h2 className="text-[40px] font-bold text-[#007AFF] mb-4 text-center">Login</h2>
          <form className="w-full">
            <div className="mb-4">
              <input className="w-full px-4 py-2 border-gray-300 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="Username" type="text" />
            </div>
            <div className="mb-4">
              <input className="w-full px-4 py-2 border-gray-300 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="Password" type="password" />
            </div>
            <div className="mb-4 text-center">
              <Link to="/set-password" className="text-gray-600 hover:text-[#007AFF] transition-colors">Forgot Password?</Link>
            </div>
            <Link to="/dashboard">
              <button className="text-[16px] w-full px-4 py-2 bg-[#007AFF] text-white rounded hover:bg-blue-600 transition-colors">Login</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
