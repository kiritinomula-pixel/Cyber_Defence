import { useState } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { predictBotTraffic } from '../utils/mlSimulator';

function BotDetector() {
  const [step, setStep] = useState(1);
  const [transactionType, setTransactionType] = useState('PAYMENT');
  const [amount, setAmount] = useState(1000);
  const [oldBalance, setOldBalance] = useState(1000);
  const [newBalance, setNewBalance] = useState(0);
  const [result, setResult] = useState<{ isBot: boolean; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const prediction = predictBotTraffic({
      step,
      type: transactionType,
      amount,
      oldBalance,
      newBalance
    });

    setResult(prediction);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-6">Detect Automated Transaction Patterns</h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Time Step</label>
              <input
                type="number"
                min="1"
                max="744"
                value={step}
                onChange={(e) => setStep(Number(e.target.value))}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Transaction Type</label>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-colors"
              >
                <option className="bg-gray-900">PAYMENT</option>
                <option className="bg-gray-900">TRANSFER</option>
                <option className="bg-gray-900">CASH_OUT</option>
                <option className="bg-gray-900">DEBIT</option>
                <option className="bg-gray-900">CASH_IN</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sender Old Balance ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={oldBalance}
                onChange={(e) => setOldBalance(Number(e.target.value))}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sender New Balance ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={newBalance}
                onChange={(e) => setNewBalance(Number(e.target.value))}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleScan}
          disabled={loading}
          className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Transaction'}
        </button>
      </div>

      {result && (
        <div className={`bg-gradient-to-br border rounded-xl p-6 backdrop-blur-sm ${
          result.isBot
            ? 'from-red-500/20 to-red-600/10 border-red-500/30'
            : 'from-green-500/20 to-green-600/10 border-green-500/30'
        }`}>
          <div className="flex items-center gap-4">
            {result.isBot ? (
              <AlertTriangle className="w-10 h-10 text-red-400 flex-shrink-0" />
            ) : (
              <CheckCircle className="w-10 h-10 text-green-400 flex-shrink-0" />
            )}
            <div>
              <h3 className={`text-2xl font-bold ${result.isBot ? 'text-red-400' : 'text-green-400'}`}>
                {result.isBot ? 'BOT DETECTED' : 'Legitimate Transaction'}
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

export default BotDetector;
