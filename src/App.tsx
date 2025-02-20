import React, { useState } from 'react';
import { ArrowRight, Book, Briefcase, GraduationCap, Trophy, Users, Star, Gamepad2, Sword, Target } from 'lucide-react';
import { Scene3D } from './components/Scene3D';
import { AIAssistant } from './components/AIAssistant';

const userTypes = [
  { id: 'student', icon: GraduationCap, label: 'Student' },
  { id: 'professional', icon: Briefcase, label: 'Professional' },
  { id: 'career-changer', icon: ArrowRight, label: 'Career Changer' },
  { id: 'hobbyist', icon: Star, label: 'Hobbyist' }
];

const fields = [
  { id: 'software', icon: Gamepad2, label: 'Software Development' },
  { id: 'data', icon: Target, label: 'Data Science' },
  { id: 'cyber', icon: Sword, label: 'Cybersecurity' },
  { id: 'business', icon: Users, label: 'Business Analytics' }
];

const degrees = [
  { id: 'bachelors', icon: Book, label: "Bachelor's Degree" },
  { id: 'masters', icon: Trophy, label: "Master's Degree" },
  { id: 'bootcamp', icon: Star, label: 'Bootcamp' },
  { id: 'self-taught', icon: Book, label: 'Self-Taught' }
];

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-20 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 opacity-90" />
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
    </div>
  </div>
);

const CourseCard = ({ title, description, duration, difficulty }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all">
    <h3 className="text-xl font-semibold text-blue-400 mb-2">{title}</h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <div className="flex justify-between text-sm text-gray-400">
      <span>{duration}</span>
      <span>{difficulty}</span>
    </div>
  </div>
);

const Achievement = ({ icon: Icon, label }) => (
  <div className="flex items-center space-x-2 text-gray-300">
    <Icon className="w-5 h-5 text-blue-400" />
    <span>{label}</span>
  </div>
);

const SkillHunter = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null);
  const [degree, setDegree] = useState(null);
  const [field, setField] = useState(null);

  const renderUserSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {userTypes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => {
            setUserType(id);
            setStep(2);
          }}
          className={`p-6 rounded-lg border-2 transition-all
            ${userType === id ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-blue-400'}`}
        >
          <Icon className="w-8 h-8 mb-2 text-blue-400" />
          <div className="text-lg font-medium text-gray-200">{label}</div>
        </button>
      ))}
    </div>
  );

  const renderDegreeSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {degrees.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => {
            setDegree(id);
            setStep(3);
          }}
          className={`p-6 rounded-lg border-2 transition-all
            ${degree === id ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-blue-400'}`}
        >
          <Icon className="w-8 h-8 mb-2 text-blue-400" />
          <div className="text-lg font-medium text-gray-200">{label}</div>
        </button>
      ))}
    </div>
  );

  const renderFieldSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {fields.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => {
            setField(id);
            setStep(4);
          }}
          className={`p-6 rounded-lg border-2 transition-all
            ${field === id ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-blue-400'}`}
        >
          <Icon className="w-8 h-8 mb-2 text-blue-400" />
          <div className="text-lg font-medium text-gray-200">{label}</div>
        </button>
      ))}
    </div>
  );

  const renderRoadmap = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard
          title="Foundations"
          description="Master the core concepts and fundamentals"
          duration="8 weeks"
          difficulty="Beginner"
        />
        <CourseCard
          title="Advanced Techniques"
          description="Deep dive into advanced topics and methodologies"
          duration="12 weeks"
          difficulty="Intermediate"
        />
        <CourseCard
          title="Expert Level"
          description="Become an expert with real-world projects"
          duration="16 weeks"
          difficulty="Advanced"
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <Achievement icon={Trophy} label="Complete Foundations" />
        <Achievement icon={Star} label="Master Advanced Topics" />
        <Achievement icon={Book} label="Build Portfolio" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative">
      <Scene3D />
      <AnimatedBackground />
      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <header className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4 relative">
            SkillHunter
          </h1>
          <p className="text-lg text-gray-300 relative">
            Level Up Your Career with Gamified Learning
          </p>
        </header>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-500/10 p-8 border-2 border-gray-700">
          <div className="flex items-center mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                  ${step >= stepNumber ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`flex-1 h-1 mx-2 transition-all duration-500
                    ${step > stepNumber ? 'bg-blue-500' : 'bg-gray-700'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && renderUserSelection()}
          {step === 2 && renderDegreeSelection()}
          {step === 3 && renderFieldSelection()}
          {step === 4 && renderRoadmap()}
        </div>
      </div>
      <AIAssistant />
    </div>
  );
};

export default SkillHunter;