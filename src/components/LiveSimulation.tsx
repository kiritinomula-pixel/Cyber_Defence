import { useState, useEffect } from 'react';
import { Play, Square, Activity } from 'lucide-react';
import { generateBotTraffic, generateNetworkTraffic } from '../utils/mlSimulator';

type LogEntry = {
  id: number;
  type: string;
  details: string;
  status: string;
  isAlert: boolean;
};

function LiveSimulation() {
  const [mode, setMode] = useState<'bot' | 'network'>('bot');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (mode === 'bot') {
        const traffic = generateBotTraffic();
        const newLog: LogEntry = {
          id: Date.now(),
          type: traffic.type,
          details: `Amount: $${traffic.amount.toFixed(2)}`,
          status: traffic.isBot ? 'BOT ATTACK' : 'Normal',
          isAlert: traffic.isBot,
        };
        setLogs(prev => [newLog, ...prev].slice(0, 15));
      } else {
        const traffic = generateNetworkTraffic();
        const newLog: LogEntry = {
          id: Date.now(),
          type: traffic.country,
          details: `Attack: ${traffic.attack}`,
          status: traffic.isStateSponsored ? 'NATION-STATE' : 'Hacker Group',
          isAlert: traffic.isStateSponsored,
        };
        setLogs(prev => [newLog, ...prev].slice(0, 15));
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const handleToggle = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setLogs([]);
      setIsRunning(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 rounded-xl p-4 backdrop-blur-sm">
            <label className="block text-sm font-medium text-gray-300 mb-3">Simulation Mode</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  value="bot"
                  checked={mode === 'bot'}
                  onChange={() => setMode('bot')}
                  disabled={isRunning}
                  className="cursor-pointer"
                />
                <span className="text-gray-300 group-hover:text-gray-200">Financial Bot Stream</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  value="network"
                  checked={mode === 'network'}
                  onChange={() => setMode('network')}
                  disabled={isRunning}
                  className="cursor-pointer"
                />
                <span className="text-gray-300 group-hover:text-gray-200">Network Attack Stream</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleToggle}
            className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-lg transition-all ${
              isRunning
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                : 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Square className="w-5 h-5" />
                STOP
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                START
              </>
            )}
          </button>
        </div>

        <div className="md:col-span-3">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Activity className="w-12 h-12 mb-2 opacity-50" />
                <p className="text-center">
                  {isRunning ? 'Initializing stream...' : 'Click START to begin simulation'}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {logs.map((log, idx) => (
                  <div
                    key={log.id}
                    className={`p-3 rounded-lg border transition-all ${
                      log.isAlert
                        ? 'bg-red-900/20 border-red-500/50 text-red-200'
                        : 'bg-green-900/20 border-green-500/50 text-green-200'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm">Log #{logs.length - idx}</span>
                      <span className={`font-bold text-xs ${log.isAlert ? 'text-red-400' : 'text-green-400'}`}>
                        {log.isAlert ? 'ALERT' : 'NORMAL'} • {log.status}
                      </span>
                    </div>
                    <div className="text-xs opacity-80">
                      {log.type} • {log.details}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isRunning && (
        <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse flex-shrink-0"></div>
          <p className="text-yellow-200 text-sm font-semibold">
            Live simulation in progress • Monitoring threats in real-time
          </p>
        </div>
      )}
    </div>
  );
}

export default LiveSimulation;
