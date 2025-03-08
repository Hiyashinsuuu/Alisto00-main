import React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Right Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center blur-effect">
        <div className="w-2/3 flex flex-col items-center">
          <h2 className="text-[40px] font-bold text-[#007AFF] mb-4 text-center">Registration</h2>
          <form className="w-full">
            <div className="mb-4">
              <input className="w-full px-4 py-2 border-gray-300 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="Fullname" type="text" />
            </div>
            <div className="mb-4">
              <input className="w-full px-4 py-2 border-gray-300 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="Username" type="text" />
            </div>
            <div className="mb-4">
              <input className="w-full px-4 py-2 border-gray-300 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="Password" type="password" />
            </div>
            <div className="mb-4">
              <input className="w-full px-4 py-2 border-gray-300 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="Confirm Password" type="password" />
            </div>
            <div className="mb-4 text-center"></div>
            <Link to="/">
              <button className="text-[16px] w-full px-4 py-2 bg-[#007AFF] text-white rounded hover:bg-blue-600 transition-colors">Register</button>
            </Link>
          </form>
        </div>
      </div>

      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center relative custom-rounded shadow-2xl slide-in-right" 
           style={{ backgroundImage: "url('/clouds.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="text-center">
          <h1 className="text-[74px] font-bold text-[#007AFF] mt-[150px]">Welcome Back!</h1>
          <p className="mt-3 text-black text-[14px]">Already have an account?</p>
          <Link to="/">
            <button className="text-[16.91px] mt-[25px] mb-[92px] w-[311.6000061035156px] py-2 border-2 border-blue-300 text-[#007AFF] rounded hover:bg-blue-50 transition-colors">
              Login
            </button>
          </Link>
        </div>
        <img src="/cat.png" alt="cat" className="w-64 h-auto rounded" />
      </div>
    </div>
  );
};

export default Register;
