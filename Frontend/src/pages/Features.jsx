import React from 'react'
import { 
  FaBook, FaVideo, FaFlask, FaUserGraduate, 
  FaChartLine, FaChalkboardTeacher, FaLaptopCode,
  FaUsers, FaQuestionCircle, FaExchangeAlt,
  FaBullseye, FaBriefcase, FaMobileAlt,
  FaLanguage, FaVolumeUp, FaCloudDownloadAlt
} from 'react-icons/fa';

// 1. Reusable Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="font-bold text-xl mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);
const Features=()=> {
   const features = [
    {
      icon: <FaBook size={28} />,
      title: "NEB-Aligned Curriculum",
      description: "Complete coverage of Class 11-12 syllabus following Nepal Education Board standards with chapter-wise breakdown."
    },
    
    {
      icon: <FaUserGraduate size={28} />,
      title: "IOE/CMAT Preparation",
      description: "Specialized modules integrating NEB syllabus with engineering/medical entrance patterns."
    },
    {
      icon: <FaChartLine size={28} />,
      title: "Smart Analytics",
      description: "Personalized dashboards tracking performance across subjects with peer comparison."
    },
    {
      icon: <FaChalkboardTeacher size={28} />,
      title: "Teacher Resources",
      description: "CDC-aligned lesson plans, worksheets, and classroom activity ideas."
    },
    {
      icon: <FaLaptopCode size={28} />,
      title: "Adaptive Practice",
      description: "AI-generated tests that adjust difficulty based on student performance."
    },
    {
      icon: <FaUsers size={28} />,
      title: "Study Groups",
      description: "Collaborative spaces for group projects and peer learning."
    },
    {
      icon: <FaQuestionCircle size={28} />,
      title: "Doubt Resolution",
      description: "24-hour access to subject experts for question clarification."
    },
    {
      icon: <FaBullseye size={28} />,
      title: "Career Pathways",
      description: "Guidance on higher education options in Nepal and abroad."
    },
  ];

  const accessibilityFeatures = [
    {
      icon: <FaMobileAlt size={24} />,
      title: "Mobile Optimized",
      description: "Fully responsive design works on all devices"
    },
    {
      icon: <FaLanguage size={24} />,
      title: "Nepali Interface",
      description: "Complete vernacular support"
    },
    {
      icon: <FaVolumeUp size={24} />,
      title: "Audio Lessons",
      description: "Text-to-speech for visual learners"
    },
    {
      icon: <FaCloudDownloadAlt size={24} />,
      title: "Offline Access",
      description: "Download content for low-connectivity areas"
    }
  ];
  return (
    <>
   <div className="bg-gray-50">
      {/* Main Features Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Designed for Nepali Students
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive learning platform tailored for Nepal's Class 11-12 NEB curriculum
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* Accessibility Section */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Accessible to All Students
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {accessibilityFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-blue-500 mb-3 mx-auto flex justify-center">
                  {feature.icon}
                </div>
                <h4 className="font-medium text-gray-800 mb-1">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Exam Prep Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Nepal's Exam Specialists</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">NEB Board Exams</h3>
              <p>10 years of past papers with model solutions</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-semibold mb-2">IOE Preparation</h3>
              <p>1,000+ engineering entrance practice questions</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="text-4xl mb-4">🩺</div>
              <h3 className="text-xl font-semibold mb-2">CMAT/Medical</h3>
              <p>Full-length mock tests with detailed analysis</p>
            </div>
          </div>
        </div>
      </section>
    </div>
 
    </>
    
  )
}

export default Features