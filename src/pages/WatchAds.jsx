import React, { useState } from 'react';
import { 
  PlayCircle, 
  Zap, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Award,
  Sparkles
} from 'lucide-react';

export default function WatchAds() {
  const [dailyProgress, setDailyProgress] = useState(96);
  const maxDaily = 150;

  const adsList = [
    {
      id: 1,
      title: "Boost Your Tech Skills - Live Webinar",
      reward: 15,
      duration: "30 sec",
      category: "Education",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      title: "Next-Gen Fintech App Intro",
      reward: 20,
      duration: "45 sec",
      category: "Finance",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "Smart Fitness Gadgets 2026",
      reward: 10,
      duration: "15 sec",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1510519138161-58446232811f?w=600&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      
      {/* 1. SECTION HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900/80 to-slate-900/40 p-5 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <Zap className="w-5 h-5 fill-amber-400/20" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Watch Ads & Earn
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1 sm:ml-9">
            Watch short video advertisements to earn VEs instantly.
          </p>
        </div>

        {/* Balance Badge */}
        <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/60 px-4 py-2.5 rounded-xl shadow-lg">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-amber-500/20">
            ⚡
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Total Balance</p>
            <p className="text-lg font-bold text-amber-400 leading-none mt-0.5">96 VEs</p>
          </div>
        </div>
      </div>

      {/* 2. HERO / DAILY PROGRESS BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Daily Rewards Goal</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Earn VEs, Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Real Rewards</span>
              </h2>
              <p className="text-slate-400 text-sm max-w-xl">
                Convert your accumulated VEs into real payouts or redeem gift cards effortlessly.
              </p>
            </div>

            {/* Daily Goal Counter */}
            <div className="flex items-baseline gap-2 bg-slate-900/90 border border-slate-800 px-5 py-3 rounded-2xl w-fit">
              <span className="text-3xl font-extrabold text-amber-400">{dailyProgress}</span>
              <span className="text-slate-500 text-sm font-semibold">/ {maxDaily} VEs</span>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="space-y-2">
            <div className="w-full bg-slate-800/80 rounded-full h-3.5 p-0.5 border border-slate-700/50 shadow-inner">
              <div 
                className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                style={{ width: `${(dailyProgress / maxDaily) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400 font-medium px-1">
              <span>Progress Status</span>
              <span className="text-amber-400">{Math.round((dailyProgress / maxDaily) * 100)}% Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Earnings", val: "96 VEs", change: "+12% vs yesterday", color: "text-amber-400", subColor: "text-emerald-400" },
          { label: "Lifetime Earnings", val: "1,420 VEs", change: "All time total", color: "text-white", subColor: "text-slate-400" },
          { label: "Ads Watched Today", val: "8 Ads", change: "+2 vs yesterday", color: "text-white", subColor: "text-emerald-400" },
          { label: "Remaining Ads", val: "6 Left", change: "Resets in 12h", color: "text-indigo-400", subColor: "text-slate-400" }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl transition-all duration-200 hover:scale-[1.01]">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
            <h3 className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.val}</h3>
            <p className={`text-xs mt-1.5 font-medium ${stat.subColor}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* 4. AVAILABLE ADS GRID */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Available Ads</span>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 font-semibold px-2.5 py-0.5 rounded-full">
              {adsList.length} Ready
            </span>
          </h3>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Auto-refresh in 45s
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adsList.map((ad) => (
            <div 
              key={ad.id} 
              className="group bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img 
                    src={ad.image} 
                    alt={ad.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  {/* Reward Badge */}
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-amber-400" />
                    +{ad.reward} VEs
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-3 left-3 bg-slate-950/70 backdrop-blur-sm text-slate-300 text-xs font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {ad.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                    {ad.category}
                  </span>
                  <h4 className="font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {ad.title}
                  </h4>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all group-hover:shadow-indigo-500/30">
                  <PlayCircle className="w-4 h-4" />
                  <span>Watch Advert</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}