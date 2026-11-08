import React, { useState } from 'react';
import { initialAdsData, userStats } from '../data/dummyData';
import AdCard from '../components/AdCard';
import { 
  LayoutDashboard, PlaySquare, Award, Wallet, History, 
  User, Settings, HelpCircle, Flame, ChevronLeft, ChevronRight 
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function WatchAds() {
  const [ads, setAds] = useState(initialAdsData);
  const [stats, setStats] = useState(userStats);
  const [activeTab, setActiveTab] = useState('watch');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleWatchComplete = (adId, rewardEarned) => {
    setAds(prevAds => prevAds.map(ad => ad.id === adId ? { ...ad, watched: true } : ad));
    setStats(prev => ({
      ...prev,
      totalVes: prev.totalVes + rewardEarned,
      adsWatchedToday: prev.adsWatchedToday + 1,
      remainingAds: Math.max(0, prev.remainingAds - 1)
    }));
  };

  return (
    <div className="bg-black text-white min-vh-100 d-flex overflow-hidden position-relative">
      
      {/* Responsive Styles for Mobile Drawer & Desktop Toggle */}
      <style>{`
        @media (max-width: 768px) {
          .custom-sidebar {
            position: fixed !important;
            top: 0;
            left: 0;
            height: 100vh;
            z-index: 1100 !important;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out !important;
            width: 260px !important;
          }
          .custom-sidebar.mobile-open {
            transform: translateX(0) !important;
          }
          .sidebar-overlay {
            display: block !important;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.6);
            z-index: 1050;
          }
        }
        @media (min-width: 769px) {
          .sidebar-overlay {
            display: none !important;
          }
        }
      `}</style>

      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && window.innerWidth <= 768 && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`custom-sidebar d-flex flex-column flex-shrink-0 p-3 bg-dark border-end border-secondary ${isSidebarOpen ? 'mobile-open' : ''}`}
        style={{ 
          width: window.innerWidth > 768 ? (isSidebarOpen ? '260px' : '80px') : '260px', 
          minHeight: '100vh',
          zIndex: 1000,
          transition: 'width 0.3s ease-in-out'
        }}
      >
        <div className="d-flex align-items-center mb-4 px-2 overflow-hidden" style={{ whiteSpace: 'nowrap' }}>
          <span className="fs-4 fw-bold text-warning">⚡</span>
          {isSidebarOpen && <span className="fs-4 fw-bold text-warning ms-2">VELOOP</span>}
          {isSidebarOpen && <small className="text-light opacity-75 ms-1">REWARDS</small>}
        </div>

        <ul className="nav nav-pills flex-column mb-auto">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
            { id: 'watch', name: 'Watch Ads', icon: PlaySquare },
            { id: 'rewards', name: 'Rewards', icon: Award },
            { id: 'wallet', name: 'Wallet', icon: Wallet },
            { id: 'history', name: 'History', icon: History },
            { id: 'profile', name: 'Profile', icon: User },
            { id: 'settings', name: 'Settings', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <li className="nav-item mb-1" key={tab.id}>
                <button 
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (window.innerWidth <= 768) setIsSidebarOpen(false);
                  }}
                  title={tab.name}
                  className={`nav-link w-100 text-start d-flex align-items-center py-2 ${isActive ? 'active bg-primary text-white' : 'text-white opacity-75'}`}
                  style={{ border: 'none', background: isActive ? undefined : 'transparent', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  <Icon size={18} className={isSidebarOpen ? "me-3" : "mx-auto"} /> 
                  {isSidebarOpen && <span className="overflow-hidden">{tab.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pt-3 border-top border-secondary overflow-hidden" style={{ whiteSpace: 'nowrap' }}>
          <button type="button" title="Help & Support" className="nav-link w-100 text-start text-white d-flex align-items-center opacity-75 bg-transparent border-0" style={{ cursor: 'pointer' }}>
            <HelpCircle size={18} className={isSidebarOpen ? "me-3" : "mx-auto"} /> 
            {isSidebarOpen && <span>Help & Support</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 p-4 overflow-auto" style={{ maxHeight: '100vh', width: '100%' }}>
        {/* Top Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary">
          <div className="d-flex align-items-center gap-3">
            {/* Arrow Toggle Button (Chevron Left / Right) */} //updated sidebar Toggle //
            <button 
              type="button" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="btn btn-dark border border-secondary text-white p-2 d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px', cursor: 'pointer' }}
              title="Toggle Sidebar"
            >
              {isSidebarOpen ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
            </button>
            <div>
              <h4 className="mb-0 fw-bold text-white">Watch Ads</h4>
              <small className="text-light opacity-75">Watch ads and earn VEs</small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="bg-dark px-3 py-2 rounded-pill border border-secondary d-flex align-items-center">
              <span className="text-warning fw-bold me-2">⚡ {stats.totalVes} VEs</span>
            </div>
            <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: '40px', height: '40px' }}>
              RA
            </div>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="p-4 mb-4 rounded-4 bg-dark border border-secondary position-relative overflow-hidden shadow-lg" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0d1117 100%)' }}>
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 className="fw-bold mb-2 text-white">Earn VEs, <span className="text-primary">Real Rewards</span></h2>
              <p className="text-light opacity-75 mb-4">Watch short advertisements and earn VEs. Convert VEs into real cash and withdraw to your linked bank account.</p>
              
              <div className="mb-2 d-flex justify-content-between text-small">
                <span className="text-light fw-medium">Daily Earnings Progress</span>
                <span className="text-warning fw-bold">{stats.totalVes} / {stats.dailyGoal} VEs</span>
              </div>
              <div className="progress bg-secondary mb-2" style={{ height: '8px' }}>
                <div className="progress-bar bg-primary rounded-pill" style={{ width: `${Math.min(100, (stats.totalVes / stats.dailyGoal) * 100)}%` }}></div>
              </div>
              <small className="text-light opacity-75">Keep going! You're so close to your daily goal.</small>
            </div>
            <div className="col-md-4 text-center mt-3 mt-md-0">
              <div className="fs-1 text-primary">📺✨</div>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="bg-dark p-3 rounded-3 border border-secondary h-100">
              <small className="text-light opacity-75 d-block mb-1">Today's Earnings</small>
              <h4 className="text-warning fw-bold mb-1">{stats.totalVes} VEs</h4>
              <small className="text-success fw-medium">+12% vs yesterday</small>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-dark p-3 rounded-3 border border-secondary h-100">
              <small className="text-light opacity-75 d-block mb-1">Lifetime Earnings</small>
              <h4 className="fw-bold mb-1 text-white">{stats.lifetimeEarnings} VEs</h4>
              <small className="text-light opacity-75">All time</small>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-dark p-3 rounded-3 border border-secondary h-100">
              <small className="text-light opacity-75 d-block mb-1">Ads Watched Today</small>
              <h4 className="fw-bold mb-1 text-white">{stats.adsWatchedToday}</h4>
              <small className="text-success fw-medium">+2 vs yesterday</small>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-dark p-3 rounded-3 border border-secondary h-100">
              <small className="text-light opacity-75 d-block mb-1">Remaining Ads</small>
              <h4 className="fw-bold mb-1 text-white">{stats.remainingAds}</h4>
              <small className="text-info fw-medium">Start watching now!</small>
            </div>
          </div>
        </div>

        {/* Available Ads Grid */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 fw-bold text-white">Available Ads</h5>
          <small className="text-light opacity-75">Auto refresh in 00:45 🔄</small>
        </div>
        
        <div className="row g-4 mb-4">
          {ads.map((ad) => (
            <div className="col-md-4" key={ad.id}>
              <AdCard ad={ad} onWatchComplete={handleWatchComplete} />
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="bg-dark p-4 rounded-3 border border-secondary h-100">
              <h6 className="fw-bold mb-3 d-flex align-items-center text-white">
                <Flame className="text-warning me-2" size={18} /> Daily Streak
              </h6>
              <h3 className="fw-bold text-warning mb-1">{stats.streakDays} Days</h3>
              <p className="text-light opacity-75 small mb-3">Keep it up!</p>
              <div className="d-flex justify-content-between text-center">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <div key={idx} className={`rounded-circle p-2 ${idx < stats.streakDays ? 'bg-warning text-dark fw-bold' : 'bg-secondary text-white'}`} style={{ width: '28px', height: '28px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-md-8">
            <div className="bg-dark p-4 rounded-3 border border-secondary h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0 text-white">Recent Earnings</h6>
                <button type="button" className="btn btn-link text-info p-0 small text-decoration-none">View all</button>
              </div>
              <div className="list-group list-group-flush bg-transparent">
                {ads.slice(0, 4).map((ad, idx) => (
                  <div key={idx} className="list-group-item bg-transparent text-white px-0 d-flex justify-content-between align-items-center border-secondary">
                    <span>{ad.title}</span>
                    <span className="text-warning fw-bold">+{ad.reward} VEs</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}