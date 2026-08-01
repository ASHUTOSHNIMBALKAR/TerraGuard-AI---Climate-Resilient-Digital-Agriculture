"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Sprout, 
  CloudRain, 
  Cpu, 
  Map as MapIcon, 
  AlertTriangle, 
  Leaf, 
  ShieldCheck, 
  TrendingUp,
  Droplets,
  Zap,
  LayoutDashboard,
  Search,
  Bell,
  Globe,
  Plus,
  Thermometer,
  Wind,
  Sun,
  ChevronRight,
  Info,
  Calendar,
  Trophy,
  Mic
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from 'recharts';

// --- CUSTOM ICONS ---
const Bug = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m8 2 1.88 1.88" />
    <path d="M14.12 3.88 16 2" />
    <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
    <path d="M12 20c-4.97 0-9-4.03-9-9 0-1.56.4-3.03 1.1-4.3" />
    <path d="M12 20c4.97 0 9-4.03 9-9 0-1.56-.4-3.03-1.1-4.3" />
    <path d="M12 20v-9" />
    <path d="M6.53 7C5.58 8.1 5 9.48 5 11c0 3.87 3.13 7 7 7s7-3.13 7-7c0-1.52-.58-2.9-1.53-4" />
  </svg>
);

// --- DATA ---
const SOIL_HEALTH_DATA = [
  { name: 'Mon', moisture: 45, nutrients: 60, health: 70 },
  { name: 'Tue', moisture: 42, nutrients: 58, health: 68 },
  { name: 'Wed', moisture: 48, nutrients: 65, health: 75 },
  { name: 'Thu', moisture: 55, nutrients: 70, health: 82 },
  { name: 'Fri', moisture: 52, nutrients: 68, health: 80 },
  { name: 'Sat', moisture: 50, nutrients: 64, health: 78 },
  { name: 'Sun', moisture: 46, nutrients: 62, health: 74 },
];

const WEATHER_STATS = [
  { label: 'Humidity', value: '64%', icon: Droplets, color: 'text-blue-400' },
  { label: 'Wind Speed', value: '12 km/h', icon: Wind, color: 'text-slate-400' },
  { label: 'UV Index', value: 'Low (2)', icon: Sun, color: 'text-amber-400' },
  { label: 'Dew Point', value: '18°C', icon: Thermometer, color: 'text-cyan-400' },
];

const GROWTH_STAGES = [
  { stage: 'Seeding', progress: 100, status: 'Completed' },
  { stage: 'Vegetative', progress: 100, status: 'Completed' },
  { stage: 'Flowering', progress: 85, status: 'Active' },
  { stage: 'Ripening', progress: 0, status: 'Upcoming' },
];

const COLORS = ['#22c55e', '#10b981', '#3b82f6', '#f59e0b'];

// --- COMPONENTS ---

const NavigationSidebar = ({ active, setActive, onShowReport }: { active: string; setActive: (val: string) => void; onShowReport: () => void }) => (
  <nav className="w-20 lg:w-72 h-screen glass border-r border-slate-200 hidden md:flex flex-col p-6 fixed left-0 top-0 z-50">
    <div className="flex items-center gap-3 mb-12 px-2 group cursor-pointer">
      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/20 group-hover:scale-105 transition-transform duration-300">
        <ShieldCheck className="text-white w-7 h-7" />
      </div>
      <div className="hidden lg:flex flex-col">
        <span className="font-outfit text-2xl font-bold tracking-tight text-zinc-900">TerraGuard <span className="text-green-600">AI</span></span>
        <span className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-bold">Climate Resilience</span>
      </div>
    </div>

    <div className="space-y-2 flex-grow overflow-y-auto custom-scrollbar">
      {[
        { icon: LayoutDashboard, label: 'Resilience Center' },
        { icon: MapIcon, label: 'GIS Monitoring' },
        { icon: Cpu, label: 'Edge-AI Pest Lab' },
        { icon: Sprout, label: 'Crop Advisory' },
        { icon: CloudRain, label: 'Precision Weather' },
        { icon: Calendar, label: 'Harvest Planning' },
        { icon: TrendingUp, label: 'Scalability & Roadmap' },
      ].map((item, idx) => {
        const isActive = active === item.label;
        return (
          <div key={idx} 
            onClick={() => setActive(item.label)}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all cursor-pointer group ${isActive ? 'bg-green-600/10 text-green-700 border border-green-600/20' : 'text-zinc-500 hover:bg-slate-50 hover:text-zinc-900'}`}>
            <item.icon className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-zinc-400 group-hover:text-green-600'}`} />
            <span className="hidden lg:block font-semibold text-sm">{item.label}</span>
            {isActive && <motion.div layoutId="activeNav" className="ml-auto w-1.5 h-1.5 rounded-full bg-green-600 shadow-[0_0_10px_rgba(22,163,74,0.5)]" />}
          </div>
        )
      })}
    </div>

    <div className="mt-auto glass-emerald p-5 rounded-2xl hidden lg:block relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-green-600/5 rounded-full blur-3xl group-hover:bg-green-600/10 transition-colors" />
      <div className="flex items-center gap-2 mb-2 text-green-600">
        <div className="p-1 bg-green-100 rounded-md">
           <Info className="w-3.5 h-3.5" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-wider">AI Insight</p>
      </div>
      <p className="text-xs text-zinc-600 leading-relaxed font-medium">Predicted frost risk for <span className="text-zinc-900 font-bold">March 28</span>. Activate thermal sensors.</p>
    </div>
    <button 
      onClick={onShowReport}
      className="mt-4 w-full py-4 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-zinc-800 transition-all active:scale-95 flex items-center justify-center gap-2"
    >
       <Trophy className="w-4 h-4 text-amber-400" />
       IMPACT REPORT
    </button>
  </nav>
);

interface TelemetryCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ElementType;
  trend?: number;
  color: string;
}

const TelemetryCard = ({ title, value, unit, icon: Icon, trend, color }: TelemetryCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-6 rounded-3xl relative overflow-hidden group">
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-5 ${color}`} />
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3 rounded-2xl bg-zinc-50 border border-zinc-100 group-hover:scale-110 transition-transform ${color.replace('bg-', 'text-')}`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${trend > 0 ? 'bg-green-600/10 text-green-700' : 'bg-red-600/10 text-red-700'}`}>
          {trend > 0 ? '+' : ''}{trend}%
          <TrendingUp className={`w-3 h-3 ${trend < 0 && 'rotate-180'}`} />
        </div>
      )}
    </div>
    <div>
      <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
      <div className="flex items-baseline gap-1.5">
        <h3 className="text-3xl font-bold font-outfit text-zinc-900 leading-none">{value}</h3>
        <span className="text-zinc-400 text-sm font-medium">{unit}</span>
      </div>
    </div>
  </motion.div>
);

const EdgeAIPanel = ({ showToast }: { showToast: (msg: string) => void }) => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const startScan = () => {
    setScanning(true);
    setResult(null);
    showToast("Initializing field edge node capture...");
    setTimeout(() => {
      setScanning(false);
      setResult({
        finding: "Grape Downey Mildew",
        confidence: "99.2%",
        severity: "Critical",
        action: "Fungicide Spraying (Sector 4)",
        node: "Sensor-X42"
      });
      showToast("Threat identified! Review recommended action.");
    }, 3000);
  };

  return (
    <div className="glass-card p-6 rounded-3xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold font-outfit text-zinc-900">Edge-AI Lab</h2>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Real-time Pathogen Vision</p>
        </div>
        <button 
          onClick={startScan}
          disabled={scanning}
          className="group px-5 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-zinc-100 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-green-600/10">
          {scanning ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />}
          CAPTURE SAMPLE
        </button>
      </div>

      <div className="relative flex-grow rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center mb-6 min-h-[220px]">
        {!scanning && !result && (
          <div className="text-center p-8">
            <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-sm">
              <Search className="text-zinc-300 w-8 h-8" />
            </div>
            <p className="text-xs text-zinc-400 font-medium">Awating feed from Field Edge Node...</p>
          </div>
        )}

        <AnimatePresence>
          {scanning && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
               <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10">
                 {[...Array(16)].map((_, i) => <div key={i} className="border border-green-600/30" />)}
               </div>
               <div className="absolute inset-0 bg-gradient-to-b from-green-600/5 via-transparent to-green-600/5 animate-pulse" />
               <div className="absolute top-0 left-0 w-full h-1 bg-green-600/50 shadow-[0_0_20px_#16a34a] animate-scan" />
            </motion.div>
          )}

          {result && !scanning && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 p-5 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-red-600 font-bold text-[10px] uppercase tracking-[0.2em] bg-red-600/10 py-1 px-3 rounded-full self-start">
                <AlertTriangle className="w-3 h-3" /> Potential Threat
              </div>
              <div className="mt-auto space-y-3">
                 <div className="bg-white p-4 rounded-2xl flex justify-between items-center border border-slate-100 shadow-sm">
                   <div>
                     <p className="text-[10px] text-zinc-400 uppercase font-black mb-0.5">Finding</p>
                     <p className="text-sm font-bold text-zinc-900">{result.finding}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] text-zinc-400 uppercase font-black mb-0.5">Confidence</p>
                     <p className="text-sm font-bold text-green-600 tracking-tighter">{result.confidence}</p>
                   </div>
                 </div>
                 <div className="bg-red-50 border border-red-100 p-4 rounded-2xl">
                    <p className="text-[10px] text-red-600 uppercase font-black mb-1">Recommended Action</p>
                    <p className="text-xs font-semibold text-zinc-900">{result.action}</p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 px-1">
        <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> LATENCY: 14ms</span>
        <span className="flex items-center gap-1 uppercase tracking-tighter text-zinc-400">Model: CropNet-v2.1</span>
      </div>
    </div>
  );
};

export default function TerraGuardDashboard() {
  const [navActive, setNavActive] = useState('Resilience Center');
  const [timeRange, setTimeRange] = useState('7D');
  const [showImpactModal, setShowImpactModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 4000);
  };

  const renderContent = () => {
    const props = { timeRange, setTimeRange, showToast };
    switch (navActive) {
      case 'Resilience Center':
        return <ResilienceCenterView {...props} />;
      case 'GIS Monitoring':
        return <GISMonitoringView showToast={showToast} />;
      case 'Edge-AI Pest Lab':
        return <EdgeAILabView showToast={showToast} />;
      case 'Crop Advisory':
        return <CropAdvisoryView showToast={showToast} />;
      case 'Precision Weather':
        return <PrecisionWeatherView showToast={showToast} />;
      case 'Harvest Planning':
        return <HarvestPlanningView showToast={showToast} />;
      case 'Scalability & Roadmap':
        return <ScalabilityRoadmapView showToast={showToast} />;
      default:
        return <ResilienceCenterView {...props} />;
    }
  };

  return (
    <div className="min-h-screen text-zinc-900 selection:bg-green-500 selection:text-white pb-12">
      <NavigationSidebar active={navActive} setActive={setNavActive} onShowReport={() => setShowImpactModal(true)} />
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 bg-zinc-900 border border-zinc-800 text-white rounded-3xl shadow-2xl flex items-center gap-4 min-w-[320px]"
          >
            <div className="w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">System Update</p>
              <p className="text-sm font-bold">{toast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="md:pl-20 lg:pl-72 min-h-screen">
        {/* HEADER */}
        <header className="px-8 py-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-3xl z-40 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-outfit font-black tracking-tight text-zinc-900">Project <span className="text-gradient-green text-glow">TerraGuard</span></h1>
              <div className="bg-green-50 border border-green-100 px-3 py-1 rounded-full flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-green-700">Live Telemetry</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-medium flex items-center gap-2 mt-1">
              <Globe className="w-3.5 h-3.5 text-green-600" /> Nashik Vineyard Cluster (Maharashtra) • Zone 4B
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-10 glass-card px-8 py-3 rounded-2xl border border-slate-100">
              <div className="flex flex-col items-start">
                 <span className="text-[9px] text-zinc-400 uppercase font-black tracking-widest mb-0.5">Resilience Score</span>
                 <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-zinc-900 font-outfit">88.4</span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">OPTIMAL</span>
                 </div>
              </div>
              <div className="w-px h-8 bg-slate-100" />
              <div className="flex flex-col items-start pr-2">
                 <span className="text-[9px] text-zinc-400 uppercase font-black tracking-widest mb-0.5">ESG Contribution</span>
                 <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-emerald-600 font-outfit">A+</span>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">+12.4t CO₂</span>
                 </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative w-11 h-11 glass-card rounded-2xl flex items-center justify-center hover:bg-slate-50 group border border-slate-100">
                <Bell className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="w-11 h-11 bg-gradient-to-tr from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center font-black text-sm text-white border border-white shadow-lg shadow-green-600/20">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={navActive}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-8 max-w-[1700px] mx-auto"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* IMPACT MODAL */}
        <AnimatePresence>
          {showImpactModal && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-md"
            >
               <motion.div 
                 initial={{ scale: 0.9, y: 20 }}
                 animate={{ scale: 1, y: 0 }}
                 className="bg-white rounded-[40px] max-w-4xl w-full p-10 relative overflow-hidden shadow-2xl"
               >
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-green-600/10 rounded-full blur-[80px]" />
                  <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-green-600/10 rounded-full blur-[80px]" />

                  <div className="relative z-10 flex flex-col items-center text-center">
                     <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mb-6 border border-green-100 shadow-xl shadow-green-400/10">
                        <ShieldCheck className="w-10 h-10 text-green-600" />
                     </div>
                     <h2 className="text-3xl font-black font-outfit mb-2 text-zinc-900">Project Impact Report</h2>
                     <p className="text-green-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-8 bg-green-50 px-4 py-1.5 rounded-full border border-green-100">Climate Resilience Verification Platform</p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
                        {[
                          { label: 'CO₂ CREDITS', val: 'A+', desc: 'Elite Rating' },
                          { label: 'YIELD BOOST', val: '+22%', desc: 'Avg Prediction' },
                          { label: 'SAVINGS', val: '$12k/Ha', desc: 'Resource Opt' },
                        ].map((stat, i) => (
                           <div key={i} className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">{stat.label}</p>
                              <p className="text-2xl font-black text-zinc-900 font-outfit mb-1">{stat.val}</p>
                              <p className="text-[10px] text-zinc-500 font-medium">{stat.desc}</p>
                           </div>
                        ))}
                     </div>

                     <div className="w-full bg-zinc-900 rounded-[32px] p-8 text-left flex flex-col md:flex-row items-center justify-between gap-8 border border-zinc-800 shadow-2xl">
                        <div>
                           <h3 className="text-white text-xl font-bold font-outfit mb-2">Climate Resilience Strategy</h3>
                           <p className="text-zinc-400 text-sm leading-relaxed max-w-md font-medium">Validated feasibility for deployment in the Nashik Cluster Vineyard trial and high-scale irrigation zones.</p>
                        </div>
                        <div className="bg-green-600/10 border border-green-600/20 px-6 py-4 rounded-2xl flex items-center gap-4">
                           <div className="p-3 bg-green-600 rounded-xl shadow-lg shadow-green-600/20">
                              <Zap className="w-6 h-6 text-white" />
                           </div>
                           <div>
                               <p className="text-[9px] text-green-400 font-black uppercase tracking-widest">IMPACT SCORE</p>
                               <p className="text-xl font-black text-white">96.4%</p>
                           </div>
                        </div>
                     </div>

                     <button 
                       onClick={() => setShowImpactModal(false)}
                       className="mt-10 px-10 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                     >
                        ACKNOWLEDGE ACHIEVEMENT
                     </button>
                  </div>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- VIEW COMPONENTS ---

const ResilienceCenterView = ({ timeRange, setTimeRange, showToast }: { timeRange: string; setTimeRange: (val: string) => void; showToast: (msg: string) => void }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <TelemetryCard title="Soil Hydration" value="48.2" unit="%" icon={Droplets} trend={+12} color="bg-blue-500" />
      <TelemetryCard title="Photosynthetic Index" value="0.84" unit="NDVI" icon={Sun} trend={+4} color="bg-amber-500" />
      <TelemetryCard title="Soil Nitrogen (N)" value="44.2" unit="mg/kg" icon={Leaf} trend={-2} color="bg-green-500" />
      <TelemetryCard title="Active Pests" value="02" unit="Detects" icon={Bug} trend={-18} color="bg-rose-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 glass-card p-8 rounded-3xl relative overflow-hidden flex flex-col border border-slate-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/5 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-xl font-bold font-outfit text-zinc-900">Temporal Soil Analytics</h2>
            <p className="text-xs text-zinc-400 font-medium">Cross-sensor validation (LoRaWAN Nodes)</p>
          </div>
          <div className="flex gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
              {['7D', '1M', '1Y'].map(time => (
                <button 
                  key={time} 
                  onClick={() => {
                    setTimeRange(time);
                    showToast(`Data refreshed for ${time} range.`);
                  }}
                  className={`px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all ${timeRange === time ? 'bg-green-600 text-white' : 'text-zinc-400 hover:text-zinc-900'}`}>{time}</button>
              ))}
          </div>
        </div>
        
        <div className="h-[320px] w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SOIL_HEALTH_DATA}>
              <defs>
                <linearGradient id="chartGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.2}/>
                  <stop offset="70%" stopColor="#16a34a" stopOpacity={0.05}/>
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="chartBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.1}/>
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} tickMargin={10} />
              <YAxis stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} tickMargin={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                labelStyle={{ fontWeight: '800', marginBottom: '8px', color: '#64748b' }}
                itemStyle={{ fontSize: '12px', fontWeight: '700' }}
              />
              <Area type="monotone" dataKey="health" stroke="#16a34a" fillOpacity={1} fill="url(#chartGreen)" strokeWidth={4} />
              <Area type="monotone" dataKey="moisture" stroke="#2563eb" fillOpacity={1} fill="url(#chartBlue)" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 px-2">
          {[
            { label: "Optimal Range", val: "75-85%", color: "bg-green-600" },
            { label: "Avg Moisture", val: "46.4%", color: "bg-blue-600" },
            { label: "Stability Index", val: "High", color: "bg-emerald-600" },
            { label: "Anomalies", val: "0 Detected", color: "bg-zinc-300" }
          ].map((item, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                <span className="text-[10px] text-zinc-400 uppercase font-black tracking-widest">{item.label}</span>
              </div>
              <p className="text-sm font-bold text-zinc-900 tracking-tight">{item.val}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 space-y-8 flex flex-col">
        <EdgeAIPanel showToast={showToast} />
        <div className="glass-emerald p-6 rounded-3xl flex-grow flex flex-col border border-emerald-100">
           <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold font-outfit text-zinc-900">Micro-Climate</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">District Precision</p>
              </div>
              <CloudRain className="text-zinc-300 w-8 h-8" />
           </div>
           <div className="grid grid-cols-2 gap-4 flex-grow">
              {WEATHER_STATS.map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100">
                  <stat.icon className={`w-4 h-4 mb-2 ${stat.color}`} />
                  <p className="text-[10px] text-zinc-400 font-bold uppercase mb-0.5">{stat.label}</p>
                  <p className="text-sm font-bold text-zinc-900 uppercase">{stat.value}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  </div>
);

const GISMonitoringView = ({ showToast }: { showToast: (msg: string) => void }) => {
  const [layers, setLayers] = useState([
    { label: 'NDVI Vegetation', color: 'bg-green-500', active: true },
    { label: 'Soil Moisture Map', color: 'bg-blue-500', active: true },
    { label: 'Pest Hotspots', color: 'bg-red-500', active: false },
    { label: 'Topographic Lines', color: 'bg-zinc-400', active: false },
    { label: 'Irrigation Network', color: 'bg-cyan-500', active: true },
  ]);

  const toggleLayer = (index: number) => {
    const newLayers = [...layers];
    newLayers[index].active = !newLayers[index].active;
    setLayers(newLayers);
    showToast(`${newLayers[index].label} ${newLayers[index].active ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
        <div className="lg:col-span-3 glass-card p-6 rounded-3xl border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold font-outfit mb-6">Layer Control</h3>
          <div className="space-y-4 flex-grow">
            {layers.map((layer, i) => (
              <div 
                key={i} 
                onClick={() => toggleLayer(i)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${layer.color}`} />
                  <span className="text-xs font-bold text-zinc-700">{layer.label}</span>
                </div>
                <div className={`w-8 h-4 rounded-full relative transition-colors ${layer.active ? 'bg-green-600' : 'bg-slate-200'}`}>
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${layer.active ? 'right-0.5' : 'left-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-slate-100 mt-6">
            <button 
              onClick={() => showToast("Exporting spatial dataset...")}
              className="w-full py-3 bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-600/10 active:scale-95 transition-transform"
            >
              Export Dataset
            </button>
          </div>
        </div>

      <div className="lg:col-span-9 glass-card rounded-3xl overflow-hidden relative border border-slate-100 shadow-2xl">
         <div className="absolute top-6 right-6 z-10 flex gap-2">
            <button className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-bold shadow-sm border border-slate-100">2D VIEW</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-xl text-[10px] font-bold shadow-lg shadow-green-600/20">3D TERRAIN</button>
         </div>
         <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
            {/* GIS Simulation Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #16a34a 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            <div className="relative w-full h-full flex items-center justify-center">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                 className="w-[500px] h-[500px] rounded-full border border-green-600/10 flex items-center justify-center"
               >
                 <div className="w-[300px] h-[300px] rounded-full border border-green-600/20 flex items-center justify-center">
                    <div className="w-[100px] h-[100px] rounded-full bg-green-600/5 animate-ping" />
                 </div>
               </motion.div>
               <div className="absolute p-6 bg-white/80 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-xl max-w-xs left-10 bottom-10">
                  <p className="text-[10px] font-black text-green-600 uppercase mb-2">Selected Coordinate</p>
                  <p className="text-sm font-bold text-zinc-900 mb-4">20.0022° N, 73.7898° E</p>
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-400">
                        <span>Elevation</span>
                        <span>584m</span>
                     </div>
                     <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-400">
                        <span>Veg Density</span>
                        <span className="text-green-600">88%</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  </div>
    );
};

const EdgeAILabView = ({ showToast }: { showToast: (msg: string) => void }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       <div className="lg:col-span-2">
          <div className="glass-card p-0 rounded-3xl overflow-hidden border border-slate-100">
             <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                   <h3 className="text-xl font-bold font-outfit">Neural Network Feed</h3>
                   <p className="text-xs text-zinc-400 font-medium">Node: VINEYARD-E42 • Latency: 12ms</p>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-black uppercase text-red-600 tracking-widest">Live Recording</span>
                </div>
             </div>
             <div className="aspect-video bg-zinc-900 relative flex items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                   <div className="flex items-end justify-between">
                      <div className="space-y-1">
                         <p className="text-white font-black text-lg">Potential Pathogen Detected</p>
                         <p className="text-zinc-400 text-xs font-medium">Auto-Focusing Optical Sensor...</p>
                      </div>
                      <div className="w-16 h-16 border-4 border-green-500/50 rounded-full flex items-center justify-center animate-spin-slow">
                         <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                   </div>
                </div>
                {/* AI Detection Boxes */}
                <motion.div 
                  animate={{ x: [0, 20, -20, 0], y: [0, -10, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute w-40 h-40 border-2 border-green-500 left-1/3 top-1/4 rounded-lg flex flex-col items-start p-2"
                >
                   <div className="bg-green-500 text-black text-[8px] font-black px-1 rounded">HEALTHY_LEAF 94.2%</div>
                </motion.div>
                <motion.div 
                  animate={{ x: [0, -10, 15, 0], y: [0, 20, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute w-32 h-32 border-2 border-red-500 right-1/4 bottom-1/3 rounded-lg flex flex-col items-start p-2"
                >
                   <div className="bg-red-500 text-white text-[8px] font-black px-1 rounded">MILDEW_SPORE 88.7%</div>
                </motion.div>
             </div>
             <div className="p-8 grid grid-cols-3 gap-8 bg-white">
                {[
                  { label: "Processing Load", val: "42%", trend: "Stable" },
                  { label: "Detections/Hr", val: "128", trend: "+12%" },
                  { label: "Model Confidence", val: "99.4%", trend: "+0.2%" },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest mb-1">{stat.label}</p>
                    <div className="flex items-center gap-2">
                       <p className="text-xl font-black text-zinc-900 font-outfit">{stat.val}</p>
                       <span className={`text-[8px] font-bold px-1 rounded ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-zinc-400'}`}>{stat.trend}</span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
       </div>
       <div className="space-y-8">
          <div className="glass-card p-6 rounded-3xl border border-slate-100">
             <h4 className="text-sm font-black uppercase text-zinc-900 tracking-widest mb-6 border-b border-slate-50 pb-4">Recent Threats</h4>
             <div className="space-y-4">
                {[
                  { id: 'TX-401', pathogen: 'Powdery Mildew', node: 'Node-04', time: '2m ago', severity: 'High' },
                  { id: 'TX-400', pathogen: 'Aphid Colony', node: 'Node-12', time: '14m ago', severity: 'Med' },
                  { id: 'TX-399', pathogen: 'Leaf Spot', node: 'Node-08', time: '1h ago', severity: 'Low' },
                ].map((th, i) => (
                   <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className={`w-2 h-2 rounded-full ${th.severity === 'High' ? 'bg-red-500' : th.severity === 'Med' ? 'bg-amber-500' : 'bg-green-500'}`} />
                      <div className="flex-grow">
                         <p className="text-xs font-black text-zinc-900">{th.pathogen}</p>
                         <p className="text-[10px] text-zinc-400 font-medium">{th.node} • {th.id}</p>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400">{th.time}</span>
                   </div>
                ))}
             </div>
          </div>
          <button 
            onClick={() => showToast("Deploying biological counter-measures to Sector 4...")}
            className="w-full py-5 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-[1.02] active:scale-95"
          >
            Deploy Counter-Measures
          </button>
       </div>
    </div>
  </div>
);

const CropAdvisoryView = ({ showToast }: { showToast: (msg: string) => void }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
       <div>
          <h2 className="text-2xl font-black font-outfit">AI Crop Consultant</h2>
          <p className="text-sm text-zinc-400 font-medium">Personalized strategies for Nashik Micro-Climate</p>
       </div>
       <div className="flex gap-4">
          <button 
            onClick={() => showToast("Profile settings updated successfully.")}
            className="glass-card px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:bg-slate-50 transition-colors"
          >
            Update Profile
          </button>
          <button 
            onClick={() => showToast("Opening AI chat interface...")}
            className="bg-green-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-600/20 active:scale-95 transition-transform"
          >
            Ask AI Question
          </button>
       </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {[
         { title: 'Nutrient Optimization', desc: 'Current soil data suggests Nitrogen deficiency in Sector 4. Apply 5kg/acre Urea.', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
         { title: 'Irrigation Schedule', desc: 'Rain expected in 48 hours. Reduce drip irrigation by 20% to avoid root rot.', icon: CloudRain, color: 'text-blue-500', bg: 'bg-blue-50' },
         { title: 'Harvest Forecast', desc: 'Sugar content (Brix) is at 18. Predicted peak maturity in 12 days.', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
       ].map((card, i) => (
         <div key={i} className="glass-card p-8 rounded-3xl border border-slate-100 flex flex-col h-full hover:bg-slate-50 transition-colors">
            <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center mb-6`}>
               <card.icon className={`w-7 h-7 ${card.color}`} />
            </div>
            <h3 className="text-lg font-bold font-outfit mb-3">{card.title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-8 flex-grow">{card.desc}</p>
            <button className="text-[10px] font-black uppercase text-green-600 tracking-widest flex items-center gap-2 group">View Full Plan <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></button>
         </div>
       ))}
    </div>

    <div className="glass-card p-8 rounded-3xl border border-slate-100 bg-zinc-900 text-white relative overflow-hidden">
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[120px] -mr-64 -mt-64" />
       <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
             <h3 className="text-2xl font-black font-outfit mb-4">Export Quality Prediction</h3>
             <p className="text-zinc-400 text-sm font-medium mb-6">Based on current growth metrics and climate resilience data, your current batch has a <span className="text-green-500 font-bold">94% probability</span> of meeting European export standards (Grade A1).</p>
             <div className="flex gap-4">
                {['SIZE: 22mm', 'BRIX: 18.4', 'RESIDUE: 0.0%'].map((tag, i) => (
                   <span key={i} className="text-[10px] font-black px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-md">{tag}</span>
                ))}
             </div>
          </div>
          <div className="w-40 h-40 flex items-center justify-center border-4 border-white/10 rounded-full relative">
             <svg className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="440" strokeDashoffset="44" className="text-green-500" />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black font-outfit">94%</span>
                <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">Quality Score</span>
             </div>
          </div>
       </div>
    </div>
  </div>
);

const PrecisionWeatherView = ({ showToast }: { showToast: (msg: string) => void }) => (
   <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-3 glass-card p-8 rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-sky-50/30">
            <div className="flex justify-between items-start mb-12">
               <div>
                  <h2 className="text-3xl font-black font-outfit mb-2">32°C <span className="text-zinc-400 font-medium">Moderate Sun</span></h2>
                  <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">Feels like 35° • Humidity 42% • Wind 8km/h SW</p>
               </div>
               <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center">
                  <Sun className="w-10 h-10 text-amber-500 animate-spin-slow" />
               </div>
            </div>
            
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                     { time: '09:00', temp: 24, rain: 0 },
                     { time: '12:00', temp: 31, rain: 5 },
                     { time: '15:00', temp: 34, rain: 10 },
                     { time: '18:00', temp: 28, rain: 2 },
                     { time: '21:00', temp: 22, rain: 0 },
                  ]}>
                     <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} />
                     <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                     <Area type="monotone" dataKey="temp" stroke="#f59e0b" fill="#fef3c7" strokeWidth={4} />
                     <Area type="monotone" dataKey="rain" stroke="#3b82f6" fill="#dbeafe" strokeWidth={2} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
         
         <div className="glass-card p-6 rounded-3xl border border-slate-100 flex flex-col justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6">Micro-Alerts</h3>
            <div className="space-y-4">
               {[
                  { type: 'Heat Wave', severity: 'High', msg: 'Peak radiation at 2 PM. Active overhead misters.', icon: AlertTriangle, color: 'text-red-500' },
                  { type: 'Wind Gusts', severity: 'Med', msg: 'Gusts up to 25km/h. Check structural ties.', icon: Wind, color: 'text-amber-500' },
                  { type: 'Frost Warning', severity: 'None', msg: 'No frost risk for the next 72 hours.', icon: ShieldCheck, color: 'text-green-500' },
               ].map((alert, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                     <div className="flex items-center gap-2 mb-2">
                        <alert.icon className={`w-4 h-4 ${alert.color}`} />
                        <span className="text-[10px] font-black uppercase text-zinc-900">{alert.type}</span>
                     </div>
                     <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">{alert.msg}</p>
                  </div>
               ))}
            </div>
            <button 
              onClick={() => showToast("Downloading local weather forecast (PDF)...")}
              className="w-full py-4 mt-6 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform"
            >
              Download Forecast
            </button>
         </div>
      </div>
   </div>
);

const HarvestPlanningView = ({ showToast }: { showToast: (msg: string) => void }) => (
   <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <TelemetryCard title="Maturity Index" value="82" unit="%" icon={TrendingUp} trend={+5} color="bg-emerald-500" />
         <TelemetryCard title="Est. Yield" value="12.4" unit="Tons/Ha" icon={Zap} color="bg-zinc-900" />
         <TelemetryCard title="Labour Required" value="18" unit="Units" icon={Globe} color="bg-blue-600" />
         <TelemetryCard title="Logistics Ready" value="95" unit="%" icon={ShieldCheck} color="bg-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 glass-card p-8 rounded-3xl border border-slate-100 overflow-hidden">
            <div className="flex justify-between items-center mb-10">
               <div>
                  <h3 className="text-xl font-bold font-outfit">Batch Maturity Timeline</h3>
                  <p className="text-xs text-zinc-400 font-medium">Tracking across 12 monitoring nodes</p>
               </div>
               <button className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold">VIEW MAP</button>
            </div>
            
            <div className="space-y-10">
               {[
                  { block: 'Block A (East)', maturity: 92, status: 'Ready', count: '4.2 Tons' },
                  { block: 'Block B (West)', maturity: 78, status: 'Active', count: '3.8 Tons' },
                  { block: 'Block C (North)', maturity: 45, status: 'Active', count: '4.4 Tons' },
               ].map((block, i) => (
                  <div key={i}>
                     <div className="flex justify-between items-end mb-3">
                        <div>
                           <p className="text-sm font-bold text-zinc-900">{block.block}</p>
                           <p className="text-[10px] text-zinc-400 font-medium">{block.count} Estimated</p>
                        </div>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded ${block.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-zinc-400'}`}>{block.status.toUpperCase()}</span>
                     </div>
                     <div className="w-full h-2 bg-slate-50 rounded-full relative overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${block.maturity}%` }} className={`h-full ${block.maturity > 90 ? 'bg-green-600' : 'bg-green-400'}`} />
                     </div>
                  </div>
               ))}
            </div>
         </div>
         
         <div className="lg:col-span-4 glass-card p-8 rounded-3xl border border-slate-100 flex flex-col justify-between">
            <div>
               <h3 className="text-lg font-bold font-outfit mb-6">Market Intel</h3>
               <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                     <p className="text-[10px] text-emerald-700 font-black uppercase mb-1">Peak Price Prediction</p>
                     <p className="text-2xl font-black text-zinc-900 font-outfit">₹142/kg</p>
                     <p className="text-[10px] text-zinc-500 font-medium mt-1">Expected in: 14 Days</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                     <p className="text-[10px] text-zinc-400 font-black uppercase mb-1">Logistics Status</p>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <p className="text-sm font-bold text-zinc-900">Cold Chain Reserved</p>
                     </div>
                  </div>
               </div>
            </div>
            <button 
              onClick={() => showToast("Harvest date confirmed and synced with logistics hub.")}
              className="w-full py-5 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-green-600/10 mt-8 active:scale-95 transition-transform"
            >
              Confirm Harvest Date
            </button>
         </div>
      </div>
   </div>
);

const ScalabilityRoadmapView = ({ showToast }: { showToast: (msg: string) => void }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
       <div>
          <h2 className="text-2xl font-black font-outfit">Scalability & Future Roadmap</h2>
          <p className="text-sm text-zinc-400 font-medium">Strategic phase markers for global expansion</p>
       </div>
       <button 
         onClick={() => showToast("Downloading Scalability Whitepaper...")}
         className="bg-zinc-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 active:scale-95 transition-all"
       >
         <Info className="w-4 h-4" /> SCALABILITY DOCS
       </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       {[
         { stage: 'Phase 1: Local Alpha', status: 'Completed', date: 'Q1 2024', desc: 'Deployment in Nashik Cluster (Vineyards). Initial LoRaWAN mesh stability and Edge-AI model calibration.' },
         { stage: 'Phase 2: Global Expansion', status: 'In-Progress', date: 'Q3 2024', desc: 'Satellite-only mode launch for dry-land crops in Rajasthan and MP. Zero-hardware requirement enabled.' },
         { stage: 'Phase 3: B2G Integration', status: 'Upcoming', date: 'Q1 2025', desc: 'API integration with national agriculture portals (e-NAM) for automated quality certification.' },
       ].map((step, i) => (
         <div key={i} className="glass-card p-8 rounded-3xl border border-slate-100 flex flex-col h-full hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-start mb-6">
               <span className={`text-[10px] font-black px-2 py-0.5 rounded ${step.status === 'Completed' ? 'bg-green-100 text-green-700' : step.status === 'In-Progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-zinc-400'}`}>{step.status.toUpperCase()}</span>
               <span className="text-xs font-bold text-zinc-400 font-outfit">{step.date}</span>
            </div>
            <h3 className="text-lg font-bold font-outfit mb-3">{step.stage}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed font-medium flex-grow">{step.desc}</p>
            <div className={`w-full h-1 rounded-full bg-slate-100 mt-8 overflow-hidden`}>
               <motion.div initial={{ width: 0 }} animate={{ width: step.status === 'Completed' ? '100%' : step.status === 'In-Progress' ? '45%' : '0%' }} className={`h-full ${step.status === 'Completed' ? 'bg-green-600' : 'bg-blue-600'}`} />
            </div>
         </div>
       ))}
    </div>

    <div className="glass-card p-10 rounded-[40px] border border-slate-100 bg-gradient-to-br from-white to-emerald-50/30 overflow-hidden relative">
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-600/5 rounded-full blur-[120px] -mr-64 -mt-64" />
       <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
             <h3 className="text-2xl font-black font-outfit mb-6">Market Potential Analysis</h3>
             <div className="space-y-6">
                 {[
                   { label: 'Addressable Market', val: '140M Farmers', desc: 'Across India alone' },
                   { label: 'Economic Impact', val: '$4.2B Annually', desc: 'Projected yield increase value' },
                   { label: 'ESG Potential', val: '12M Tons CO₂', desc: 'Offset potential through verified resilience' },
                 ].map((stat, i) => (
                    <div key={i} className="flex gap-4 items-start">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm shrink-0">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                       </div>
                       <div>
                          <p className="text-sm font-black text-zinc-900 font-outfit">{stat.label}</p>
                          <p className="text-xl font-black text-green-700 font-outfit">{stat.val}</p>
                          <p className="text-xs text-zinc-400 font-medium">{stat.desc}</p>
                       </div>
                    </div>
                 ))}
             </div>
          </div>
          <div className="bg-zinc-900 rounded-[32px] p-8 text-white">
             <div className="flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6 text-green-500" />
                <h4 className="text-lg font-bold font-outfit">Global Scale Strategy</h4>
             </div>
             <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-medium">TerraGuard AI's "Software-First" infrastructure allows for instant borderless scaling. Our focus on **Satellite-GIS** removes the need for hardware-heavy localized setups, enabling a unified global resilience network.</p>
             <button 
               onClick={() => showToast("Opening investor pitch deck...")}
               className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
             >
                VIEW FULL STRATEGY PILLARS
             </button>
          </div>
       </div>
    </div>
  </div>
);



