import { useState } from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { predictPhishing } from '../utils/mlSimulator';

function PhishingCheck() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<{ isPhishing: boolean; confidence: number; reasons: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 900));

    const prediction = predictPhishing(url);
    setResult(prediction);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-start gap-3 mb-6">
          <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-200 text-sm">
            Paste a suspicious link below to analyze for phishing indicators. The system scans URL structure, length, and suspicious patterns.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Enter Website URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="https://example.com/login"
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading || !url.trim()}
          className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze URL'}
        </button>
      </div>

      {result && (
        <div className={`bg-gradient-to-br border rounded-xl p-6 backdrop-blur-sm ${
          result.isPhishing
            ? 'from-red-500/20 to-red-600/10 border-red-500/30'
            : 'from-green-500/20 to-green-600/10 border-green-500/30'
        }`}>
          <div className="flex items-start gap-4 mb-4">
            {result.isPhishing ? (
              <AlertTriangle className="w-10 h-10 text-red-400 flex-shrink-0" />
            ) : (
              <CheckCircle className="w-10 h-10 text-green-400 flex-shrink-0" />
            )}
            <div>
              <h3 className={`text-2xl font-bold ${result.isPhishing ? 'text-red-400' : 'text-green-400'}`}>
                {result.isPhishing ? 'PHISHING DETECTED' : 'Safe Website'}
              </h3>
              <p className="text-gray-400 mt-1">
                Confidence Score: {result.confidence}%
              </p>
            </div>
          </div>

          {result.reasons.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="font-semibold text-gray-300 mb-3">Analysis Details:</p>
              <ul className="space-y-2">
                {result.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PhishingCheck;
