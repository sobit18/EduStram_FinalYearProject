import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

function Footer() {
  return (
    <>
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-indigo-600 p-2 rounded-lg mr-2">📚</span>
              EduStream
            </h3>
            <p className="text-gray-400 mb-4">
              Neapl's online learning platform for Class 11-12 students, bridging school education with competitive exam preparation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaLinkedin />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Courses</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">fetures</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About us</a></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-white">JEE/NEET Crash Courses</a></li> */}
              {/* <li><a href="#" className="text-gray-400 hover:text-white">Board Exam Preparation</a></li> */}
            </ul>
          </div>

          {/* Column 3: Streams */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Our Streams</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white">Science (PCMB)</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Arts</a></li>
              {/* <li className="mt-6">
                <h5 className="text-md font-medium mb-2">Competitive Exams</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-800 text-xs px-2 py-1 rounded">JEE</span>
                  <span className="bg-gray-800 text-xs px-2 py-1 rounded">NEET</span>
                  <span className="bg-gray-800 text-xs px-2 py-1 rounded">CUET</span>
                  <span className="bg-gray-800 text-xs px-2 py-1 rounded">NDA</span>
                </div>
              </li> */}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MdEmail className="text-indigo-400 text-xl mr-3 mt-1" />
                <div>
                  <p className="text-gray-400">Email</p>
                  <a href="mailto:contact@edusphere.com" className="hover:text-white">edustream@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start">
                <MdPhone className="text-indigo-400 text-xl mr-3 mt-1" />
                <div>
                  <p className="text-gray-400">Phone</p>
                  <a href="tel:+919876543210" className="hover:text-white">+977 9876543210</a>
                </div>
              </li>
              <li className="flex items-start">
                <MdLocationOn className="text-indigo-400 text-xl mr-3 mt-1" />
                <div>
                  <p className="text-gray-400">Address</p>
                  <p>EduStream Education Pvt. Ltd.<br />Pokhara, Nepal</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} EduStream. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>

    </>
   
  )
}

export default Footer