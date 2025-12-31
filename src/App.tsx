import { useState } from 'react';
import { Shield, LayoutGrid, Link2, Bot, Globe, BarChart3, Settings, HelpCircle, Bell, LogOut } from 'lucide-react';
import Dashboard from './components/Dashboard';
import BotDetector from './components/BotDetector';
import NetworkScanner from './components/NetworkScanner';
import PhishingCheck from './components/PhishingCheck';
import LiveSimulation from './components/LiveSimulation';

type PageType = 'dashboard' | 'url-scanner' | 'bot' | 'network' | 'analytics' | 'simulation';

function App() {
  const [activePage, setActivePage] = useState<PageType>('dashboard');

  const navItems = [
    { id: 'dashboard' as PageType, label: 'Dashboard', icon: LayoutGrid },
    { id: 'url-scanner' as PageType, label: 'URL Scanner', icon: Link2 },
    { id: 'bot' as PageType, label: 'Bot Detection', icon: Bot },
    { id: 'network' as PageType, label: 'Network Analysis', icon: Globe },
    { id: 'analytics' as PageType, label: 'Analytics', icon: BarChart3 },
    { id: 'simulation' as PageType, label: 'Live Simulation', icon: Shield },
  ];

  const footerItems = [
    { id: 'settings' as PageType, label: 'Settings', icon: Settings },
    { id: 'help' as PageType, label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e27] text-gray-100 flex">
      <aside className="w-80 bg-gradient-to-b from-[#0f1432] to-[#0a0e27] border-r border-cyan-500/10 flex flex-col">
        <div className="p-6 border-b border-cyan-500/10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white">Cyber Defense</h1>
              <p className="text-xs text-gray-400">Security Suite</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  activePage === item.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 space-y-2 border-t border-cyan-500/10">
          {footerItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-gray-400 hover:text-gray-300 hover:bg-white/5 transition-all"
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-gray-400 hover:text-gray-300 hover:bg-white/5 transition-all mt-4 pt-4 border-t border-cyan-500/10">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="p-4 bg-cyan-500/10 border-t border-cyan-500/10">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
            <span className="text-gray-400">System Active</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">All modules running</p>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-[#0f1432] border-b border-cyan-500/10 px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {navItems.find(item => item.id === activePage)?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-cyan-400 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full"></div>
          </div>
        </header>

        <section className="flex-1 overflow-auto p-8">
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'url-scanner' && <PhishingCheck />}
          {activePage === 'bot' && <BotDetector />}
          {activePage === 'network' && <NetworkScanner />}
          {activePage === 'analytics' && <div className="text-gray-400">Analytics page coming soon</div>}
          {activePage === 'simulation' && <LiveSimulation />}
          {activePage === 'settings' && <div className="text-gray-400">Settings page coming soon</div>}
          {activePage === 'help' && <div className="text-gray-400">Help & Support page coming soon</div>}
        </section>
      </main>
    </div>
  );
}

export default App;
