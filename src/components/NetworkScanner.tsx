import { useState } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { predictNetworkThreat } from '../utils/mlSimulator';

function NetworkScanner() {
  const [country, setCountry] = useState('United States');
  const [attackType, setAttackType] = useState('Ransomware');
  const [industry, setIndustry] = useState('Healthcare');
  const [financialLoss, setFinancialLoss] = useState(10);
  const [affectedUsers, setAffectedUsers] = useState(5000);
  const [resolutionTime, setResolutionTime] = useState(48);
  const [result, setResult] = useState<{ isStateSponsored: boolean; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const countries = ['United States', 'China', 'Russia', 'North Korea', 'Iran', 'United Kingdom', 'Germany', 'France', 'Israel', 'India'];
  const attackTypes = ['Ransomware', 'APT', 'DDoS', 'Data Breach', 'Phishing Campaign', 'Zero-Day Exploit', 'Supply Chain Attack'];
  const industries = ['Healthcare', 'Finance', 'Government', 'Energy', 'Technology', 'Education', 'Retail', 'Manufacturing'];

  const handleAnalyze = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const prediction = predictNetworkThreat({
      country,
      attackType,
      industry,
      financialLoss,
      affectedUsers,
      resolutionTime
    });

    setResult(prediction);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-6">Check IP addresses for threats</h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Source Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500/50 transition-colors"
              >
                {countries.map(c => <option key={c} className="bg-gray-900">{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Attack Type</label>
              <select
                value={attackType}
                onChange={(e) => setAttackType(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500/50 transition-colors"
              >
                {attackTypes.map(a => <option key={a} className="bg-gray-900">{a}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Target Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500/50 transition-colors"
              >
                {industries.map(i => <option key={i} className="bg-gray-900">{i}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Financial Loss ($M)</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={financialLoss}
                onChange={(e) => setFinancialLoss(Number(e.target.value))}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Affected Users</label>
              <input
                type="number"
                min="0"
                value={affectedUsers}
                onChange={(e) => setAffectedUsers(Number(e.target.value))}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Resolution Time (Hours)</label>
              <input
                type="number"
                min="0"
                value={resolutionTime}
                onChange={(e) => setResolutionTime(Number(e.target.value))}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Network Threat'}
        </button>
      </div>

      {result && (
        <div className={`bg-gradient-to-br border rounded-xl p-6 backdrop-blur-sm ${
          result.isStateSponsored
            ? 'from-red-500/20 to-red-600/10 border-red-500/30'
            : 'from-green-500/20 to-green-600/10 border-green-500/30'
        }`}>
          <div className="flex items-center gap-4">
            {result.isStateSponsored ? (
              <AlertTriangle className="w-10 h-10 text-red-400 flex-shrink-0" />
            ) : (
              <CheckCircle className="w-10 h-10 text-green-400 flex-shrink-0" />
            )}
            <div>
              <h3 className={`text-2xl font-bold ${result.isStateSponsored ? 'text-red-400' : 'text-green-400'}`}>
                {result.isStateSponsored ? 'STATE-SPONSORED THREAT DETECTED' : 'Standard Cyber Threat'}
              </h3>
              <p className="text-gray-400 mt-1">
                Confidence Score: {result.confidence}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NetworkScanner;
