import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  BarChart3, LayoutDashboard, UserCircle, FlaskConical, Coins,
  FileBadge, Settings, HelpCircle, LogOut, Search, Bell, FileText, TrendingUp,
} from "lucide-react";

// ⚠️ DUMMY DATA — replace with real API calls once funding/trends/patents modules are built
const DUMMY_STATS = {
  innovationScore: 78,
  fundingMatches: 12,
  patentRecords: 340,
  profileCompletion: 65,
};

const DUMMY_FUNDING_MATCHES = [
  { name: "National Battery Research Grant", type: "Government grant", closesIn: "18 days", match: 94 },
  { name: "Clean Energy Innovation Fund", type: "Innovation fund", closesIn: "32 days", match: 81 },
  { name: "AI for Science Fellowship", type: "Research council", closesIn: "45 days", match: 73 },
];

const DUMMY_TREND = [30, 45, 55, 80, 100]; // relative bar heights, last 5 quarters
// ⚠️ END DUMMY DATA

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r border-gray-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 px-5 py-5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 size={18} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight">InnovaFund AI</p>
              <p className="text-xs text-gray-400 leading-tight">Enterprise Intelligence</p>
            </div>
          </div>
          <div className="px-3 space-y-1">
            <NavItem icon={<LayoutDashboard size={16} />} label="Dashboard" active />
            <NavItem icon={<UserCircle size={16} />} label="Research Profile" />
            <NavItem icon={<FlaskConical size={16} />} label="Research" />
            <NavItem icon={<Coins size={16} />} label="Funding" />
            <NavItem icon={<FileBadge size={16} />} label="Patent Intelligence" />
          </div>
          <p className="text-xs font-medium text-gray-400 px-5 mt-6 mb-1">SYSTEM</p>
          <div className="px-3 space-y-1">
            <NavItem icon={<Settings size={16} />} label="Settings" />
            <NavItem icon={<HelpCircle size={16} />} label="Help" />
          </div>
        </div>
        <div className="px-3 pb-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-white">
          <div className="relative w-96">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search funding, patents, or research..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <Bell size={18} className="text-gray-400" />
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              K
            </div>
          </div>
        </div>

        <div className="p-8">
          <p className="text-sm font-medium text-blue-600 mb-1">Dashboard Overview</p>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-8">You're logged in to InnovaFund AI.</p>

          {/* Stat cards — dummy data */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard label="Innovation Score" value={`${DUMMY_STATS.innovationScore}/100`} icon={<TrendingUp size={16} className="text-green-500" />} />
            <StatCard label="Funding Matches" value={DUMMY_STATS.fundingMatches} icon={<Coins size={16} className="text-blue-500" />} />
            <StatCard label="Patent Records" value={DUMMY_STATS.patentRecords.toLocaleString()} icon={<FileText size={16} className="text-indigo-500" />} />
            <StatCard label="Profile Completion" value={`${DUMMY_STATS.profileCompletion}%`} icon={<UserCircle size={16} className="text-gray-400" />} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Funding matches — dummy data */}
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <p className="font-semibold mb-4">Top Funding Matches</p>
              <div className="space-y-3">
                {DUMMY_FUNDING_MATCHES.map((item, i) => (
                  <div key={i} className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.type} · Closes in {item.closesIn}</p>
                    </div>
                    <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                      {item.match}% match
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend chart — dummy data */}
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <p className="font-semibold mb-4">Research Trend</p>
              <div className="flex items-end gap-2 h-32">
                {DUMMY_TREND.map((height, i) => (
                  <div key={i} className="flex-1 bg-blue-100 rounded" style={{ height: `${height}%` }}>
                    <div className="w-full h-full bg-blue-500 rounded opacity-80" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">Publication activity, last 5 quarters</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-pointer ${
        active ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      {icon} {label}
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center mb-3">{icon}</div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default Dashboard;