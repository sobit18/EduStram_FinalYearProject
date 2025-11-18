import React from 'react'
import { 
  FaChalkboardTeacher, 
  FaUserGraduate, 
  FaAward, 
  FaBookOpen,
  FaFlask,
  FaUniversity,
  FaLanguage
} from 'react-icons/fa';
import { MdSchool, MdScience, MdComputer } from 'react-icons/md';

function Aboutus() {
  return (
    <>
   <div className="font-sans bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-20 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Transforming Education in Nepal</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive learning platform for Grade 11-12 students following NEB curriculum
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Nepal Story</h2>
            <p className="text-gray-600 mb-4">
              Established in 2025, EduStream began with a mission to revolutionize Grade 11-12 education according to Nepal Education Board (NEB) standards. What started as a small initiative in Pokhara now serves students across all 77 districts.
            </p>
            <p className="text-gray-600 mb-4">
              We're proud to be Nepal's  platform to integrate NEB syllabus with IOE/CMAT preparation, helping students excel in both board exams and competitive entrance tests.
            </p>
            <p className="text-gray-600">
              Recognized by the Ministry of Education and endorsed by NEB, our platform is trusted .
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Nepali students learning" 
              className="rounded-lg shadow-xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                  <FaUserGraduate className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="font-bold">100K+</p>
                  <p className="text-sm text-gray-500">Nepali Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nepal-Specific Approach */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Nepal-Focused Approach</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <MdSchool className="text-blue-600 text-2xl" />
              </div>
              <h3 className="font-bold text-xl mb-3">NEB-Aligned Content</h3>
              <p className="text-gray-600">
                Complete coverage of Science, Management, and Humanities streams as per latest NEB curriculum.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <FaFlask className="text-blue-600 text-2xl" />
              </div>
              <h3 className="font-bold text-xl mb-3">Study Groups</h3>
              <p className="text-gray-600">
                Collaborative spaces for group projects and peer learning.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <FaLanguage className="text-blue-600 text-2xl" />
              </div>
              <h3 className="font-bold text-xl mb-3">Career Pathways</h3>
              <p className="text-gray-600">
               Guidance on higher education options in Nepal and abroad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Preparation */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nepal's Exam Specialists</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBookOpen className="text-3xl text-blue-600 mb-4" />,
                title: "NEB Board Exams",
                features: ["10 years of past papers", "Model solutions", "Grading rubrics"]
              },
              {
                icon: <MdComputer className="text-3xl text-blue-600 mb-4" />,
                title: "IOE Preparation",
                features: ["1,500+ engineering questions", "Entrance exam strategies", "TU-specific patterns"]
              },
              {
                icon: <MdScience className="text-3xl text-blue-600 mb-4" />,
                title: "CMAT/Medical",
                features: ["Biology focus areas", "Medical entrance mock tests", "KU/KUSMS patterns"]
              }
            ].map((exam, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg text-center">
                {exam.icon}
                <h3 className="font-bold text-xl mb-4">{exam.title}</h3>
                <ul className="space-y-2">
                  {exam.features.map((feature, i) => (
                    <li key={i} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact in Nepal</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "95%", label: "NEB Pass Rate", icon: <FaAward className="text-3xl mx-auto mb-4" /> },
              { number: "2K+", label: "IOE Entrants", icon: <FaUniversity className="text-3xl mx-auto mb-4" /> },
              { number: "500+", label: "Partner Schools", icon: <MdSchool className="text-3xl mx-auto mb-4" /> },
              { number: "77", label: "Districts Covered", icon: <FaUserGraduate className="text-3xl mx-auto mb-4" /> }
            ].map((item, index) => (
              <div key={index}>
                {item.icon}
                <p className="text-4xl font-bold mb-2">{item.number}</p>
                <p className="text-blue-100">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
    </>
  )
}

export default Aboutus