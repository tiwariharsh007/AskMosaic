import React, { useState, useContext } from 'react';
import HERO_IMG from '../assets/hero-img.jpg';
import LANDING from '../assets/landing12.png';
import { APP_FEATURES } from '../utils/data';
import { useNavigate } from 'react-router-dom';
import { LuSparkle } from 'react-icons/lu';
import Modal from '../components/Modal';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <>
      {/* Continuous Gradient Background */}
      <div
        className="w-full min-h-screen relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at center, white 0%, #f0f4ff 60%, white 100%)`,
        }}
      >
        {/* Decorative blurred background blobs */}
        <div className="w-[500px] h-[500px] bg-indigo-300/30 blur-[100px] absolute top-0 -left-40 rounded-full" />
        <div className="w-[400px] h-[400px] bg-blue-300/20 blur-[90px] absolute bottom-0 right-0 rounded-full" />

        <div className="container mx-auto px-6 pt-8 pb-24 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-20">
            <div className="flex items-center gap-3">
              <img
                src={HERO_IMG}
                alt="AskMosaic Logo"
                className="w-12 h-12 object-contain rounded-full shadow-md"
              />
              <div className="text-2xl text-slate-900 font-extrabold tracking-tight">
                AskMosaic
              </div>
            </div>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-indigo-600 text-white text-sm font-semibold px-7 py-2.5 rounded-full 
                hover:bg-indigo-700 border border-indigo-600 transition-all cursor-pointer shadow-md hover:shadow-lg"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center gap-14">
            <div className="w-full md:w-1/2 pr-4">
              <div className="flex items-center mb-4">
                <div className="flex items-center gap-2 text-sm text-indigo-700 font-semibold bg-white/60 px-4 py-1 
                rounded-full border border-indigo-200 shadow-sm backdrop-blur-sm">
                  <LuSparkle className="text-indigo-500" /> AI Powered
                </div>
              </div>

              <h1 className="text-5xl text-slate-900 font-extrabold mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
                  AI-Powered
                </span>{' '}
                Learning
              </h1>

              <p className="text-lg text-gray-700 mr-0 md:mr-20 mb-8">
                AskMosaic helps you prepare for job interviews with mock interviews, personalized feedback, 
                and tailored resources — boosting your confidence and skills.
              </p>

              <button
                className="bg-indigo-600 text-white text-base font-semibold px-8 py-3 rounded-full 
                hover:bg-indigo-700 border border-indigo-600 transition-all cursor-pointer shadow-md hover:shadow-xl"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>

            <div className="w-full md:w-1/2">
              <img
                src={LANDING}
                alt="Hero Illustration"
                className="w-full rounded-2xl shadow-2xl border border-indigo-100 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-6 py-20 relative z-10">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-400">
              Features that Make Us Stand Out
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {APP_FEATURES.slice(0, 3).map((feature) => (
              <div
                key={feature.id}
                className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-md hover:shadow-2xl 
                border border-gray-100 hover:border-indigo-200 transition transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            {APP_FEATURES.slice(3).map((feature) => (
              <div
                key={feature.id}
                className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-md hover:shadow-2xl 
                border border-gray-100 hover:border-indigo-200 transition transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm bg-white/60 backdrop-blur-md text-gray-700 text-center p-5 mt-10 rounded-t-lg shadow-inner">
          Made with ❤️ by Harsh Tiwari
        </div>
      </div>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
        hideHeader
      >
        <div>
          {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === 'signup' && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
