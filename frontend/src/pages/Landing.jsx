import { Link } from "react-router-dom";
import { BarChart3, Coins, LineChart, FileBadge } from "lucide-react";

function Landing() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <div className="flex items-center justify-between px-10 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 size={18} className="text-white" />
          </div>
          <span className="text-lg font-semibold">InnovaFund AI</span>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
          <span>Platform</span>
          <span>Intelligence</span>
          <span>Research</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Sign In
          </Link>
          <Link
            to="/register"
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12 items-center px-10 pt-20 pb-24">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full mb-6">
            ⚡ Next-Gen AI for R&D Leaders
          </span>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Accelerate Research & <span className="text-blue-600">Innovation</span> with AI-Powered Intelligence
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            Unlock deep discovery insights, automate funding searches, and analyze
            patent landscapes in seconds. The single source of truth for research intelligence.
          </p>
          <div className="flex items-center gap-3">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-sm"
            >
              Get Started →
            </Link>
            <Link
              to="/login"
              className="border border-gray-200 hover:border-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium text-sm"
            >
              Explore Platform
            </Link>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl h-96 flex items-center justify-center">
          <BarChart3 size={64} className="text-blue-400" />
        </div>
      </div>

      {/* Feature cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 px-10 pb-24">
        <FeatureCard icon={<Coins size={22} className="text-blue-600" />} title="Funding discovery" desc="Get matched to grants and funding opportunities you're eligible for." />
        <FeatureCard icon={<LineChart size={22} className="text-blue-600" />} title="Research trends" desc="Track emerging topics and momentum in your field automatically." />
        <FeatureCard icon={<FileBadge size={22} className="text-blue-600" />} title="Patent intelligence" desc="Understand the patent landscape and spot commercialization gaps." />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">
      <div className="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center mb-4">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
}

export default Landing;