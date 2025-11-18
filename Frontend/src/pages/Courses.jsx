import React, { useState } from 'react';
import { FaSearch, FaFlask, FaChartBar } from 'react-icons/fa';
import { MdScience, MdBusinessCenter } from 'react-icons/md';

function Courses() {
  const [activeTab, setActiveTab] = useState('science');
  const [activeClass, setActiveClass] = useState('11');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample course data
  const courses = {
    science: {
      11: [
        { id: 1, title: "Nepali Class 11", chapters: 15, hours: 40, teacher: "Dr. Sharma", rating: 4.8 },
        { id: 2, title: "English Class 11", chapters: 15, hours: 40, teacher: "Dr. Sharma", rating: 4.8 },
        { id: 3, title: "Social Class 11", chapters: 15, hours: 40, teacher: "Dr. Sharma", rating: 4.8 },
        { id: 4, title: "Physics Class 11", chapters: 15, hours: 40, teacher: "Dr. Sharma", rating: 4.8 },
        { id: 5, title: "Chemistry Class 11", chapters: 16, hours: 45, teacher: "Prof. Gupta", rating: 4.7 },
        { id: 6, title: "Mathematics Class 11", chapters: 14, hours: 50, teacher: "Mr. Patel", rating: 4.9 },
        { id: 7, title: "Biology Class 11", chapters: 13, hours: 42, teacher: "Dr. Reddy", rating: 4.6 },
        { id: 8, title: "Computer Science Class 11", chapters: 12, hours: 35, teacher: "Ms. Kapoor", rating: 4.5 }
      ],
      12: [
        { id: 9, title: "Nepali Class 12", chapters: 15, hours: 40, teacher: "Dr. Sharma", rating: 4.8 },
        { id: 10, title: "English Class 12", chapters: 15, hours: 40, teacher: "Dr. Sharma", rating: 4.8 },
        { id: 11, title: "Physics Class 12", chapters: 15, hours: 40, teacher: "Dr. Sharma", rating: 4.8 },
        { id: 12, title: "Chemistry Class 12", chapters: 16, hours: 45, teacher: "Prof. Gupta", rating: 4.7 },
        { id: 13, title: "Mathematics Class 12", chapters: 14, hours: 50, teacher: "Mr. Patel", rating: 4.9 },
        { id: 14, title: "Biology Class 12", chapters: 13, hours: 42, teacher: "Dr. Reddy", rating: 4.6 }
      ]
    },
    management: {
      11: [
        { id: 15, title: "Nepali Class 11", chapters: 10, hours: 38, teacher: "CA Mehta", rating: 4.7 },
        { id: 16, title: "English Class 11", chapters: 10, hours: 38, teacher: "CA Mehta", rating: 4.7 },
        { id: 17, title: "Social Class 11", chapters: 10, hours: 38, teacher: "CA Mehta", rating: 4.7 },
        { id: 18, title: "Business Studies Class 11", chapters: 10, hours: 38, teacher: "CA Mehta", rating: 4.7 },
        { id: 19, title: "Marketing Class 11", chapters: 10, hours: 38, teacher: "CA Mehta", rating: 4.7 },
        { id: 20, title: "Accountancy Class 11", chapters: 10, hours: 38, teacher: "CA Mehta", rating: 4.7 },
        { id: 21, title: "Economics Class 11", chapters: 11, hours: 36, teacher: "Dr. Banerjee", rating: 4.8 }
      ],
      12: [
        { id: 22, title: "Nepali Class 12", chapters: 12, hours: 40, teacher: "Prof. Joshi", rating: 4.6 },
        { id: 23, title: "English Class 12", chapters: 12, hours: 40, teacher: "Prof. Joshi", rating: 4.6 },
        { id: 24, title: "Accountancy Class 12", chapters: 12, hours: 40, teacher: "Prof. Joshi", rating: 4.6 },
        { id: 25, title: "Economics Class 12", chapters: 12, hours: 40, teacher: "Prof. Joshi", rating: 4.6 },
        { id: 26, title: "Marketing Class 12", chapters: 12, hours: 40, teacher: "Prof. Joshi", rating: 4.6 },
        { id: 27, title: "Business Studies Class 12", chapters: 12, hours: 40, teacher: "Prof. Joshi", rating: 4.6 }
      ]
    }
  };

  const filteredCourses = courses[activeTab][activeClass].filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Class 11 & 12 Courses
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Comprehensive curriculum for all streams
          </p>
        </div>

        {/* Class Selection */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveClass('11')}
              className={`px-6 py-2 text-sm font-medium rounded-l-lg ${activeClass === '11' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Class 11
            </button>
            <button
              onClick={() => setActiveClass('12')}
              className={`px-6 py-2 text-sm font-medium rounded-r-lg ${activeClass === '12' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Class 12
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div className="flex space-x-1 overflow-x-auto pb-2 mb-4 sm:mb-0">
            <button
              onClick={() => setActiveTab('science')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'science' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <MdScience className="inline mr-2" /> Science
            </button>
            <button
              onClick={() => setActiveTab('management')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'management' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <MdBusinessCenter className="inline mr-2" /> Management
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Stream Info */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border-l-4 border-indigo-500">
          {activeTab === 'science' && (
            <div className="flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <MdScience className="text-indigo-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Science Stream (Class {activeClass})</h3>
                <p className="text-gray-600">
                  Comprehensive coverage of Physics, Chemistry, Biology/Mathematics with practicals. 
                  {activeClass === '11' ? ' Foundation building for future studies.' : ' Complete preparation for board exams and competitive tests.'}
                </p>
              </div>
            </div>
          )}
          {activeTab === 'management' && (
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <MdBusinessCenter className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Management Stream (Class {activeClass})</h3>
                <p className="text-gray-600">
                  {activeClass === '11' ? 'Introduction to core management subjects.' : 'Advanced concepts in management disciplines.'} 
                  Perfect for CA, CS, BBA, and Management degree aspirants.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    {activeTab === 'science' && <FaFlask className="text-indigo-600" />}
                    {activeTab === 'management' && <FaChartBar className="text-blue-600" />}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-500"><span className="font-medium">Chapters:</span> {course.chapters}</p>
                  <p className="text-sm text-gray-500"><span className="font-medium">Duration:</span> {course.hours} hours</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <FaSearch className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No courses found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Courses;
