import React from 'react'
import { FaPlay, FaSearch, FaUserGraduate } from 'react-icons/fa';
import Aboutus from './Aboutus';
import Features from './Features';
function Home() {
  return (
    <>
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Master <span className="text-indigo-600">Class 11 & 12</span> with Expert Guidance
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Comprehensive learning platform for class 11 and 12.
          </p>

          {/* Search Bar */}
          {/* <div className="relative mb-8">
            <input 
              type="text" 
              placeholder="Search for courses, chapters or topics..." 
              className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-14"
            />
            <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div> */}

          {/* CTA Buttons */}
          {/* <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 font-medium flex items-center">
              <FaPlay className="mr-2" /> Watch Demo
            </button>
            <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 font-medium">
              Download Syllabus
            </button>
          </div> */}
        </div>

        {/* Right Column - Image */}
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
            alt="Students learning together" 
            className="rounded-lg shadow-xl w-full"
          />
          
          {/* Stats Badge */}
          <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-full mr-3">
                <FaUserGraduate className="text-indigo-600 text-xl" />
              </div>
              <div>
                <p className="font-bold">95%</p>
                <p className="text-sm text-gray-500">Board Exam Success</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Features/>
    <Aboutus/>
    
    </>
  )
}

export default Home