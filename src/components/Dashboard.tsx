import { TrendingDown, CheckCircle, AlertTriangle, Activity, Link2, Bot, Globe } from 'lucide-react';

function Dashboard() {
  const metrics = [
    {
      title: 'Threats Blocked',
      value: '1,247',
      icon: AlertTriangle,
      change: -12,
      period: 'Last 24 hours',
      bgColor: 'from-cyan-500/20 to-cyan-600/10',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
    },
    {
      title: 'Scans Completed',
      value: '8,934',
      icon: CheckCircle,
      change: 8,
      period: 'This week',
      bgColor: 'from-green-500/20 to-green-600/10',
      borderColor: 'border-green-500/30',
      iconColor: 'text-green-400',
    },
    {
      title: 'Active Warnings',
      value: '23',
      icon: AlertTriangle,
      change: 0,
      period: 'Requires attention',
      bgColor: 'from-amber-500/20 to-amber-600/10',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      icon: Activity,
      change: 0.1,
      period: 'Last 30 days',
      bgColor: 'from-blue-500/20 to-blue-600/10',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
    },
  ];

  const features = [
    {
      title: 'Phishing URL Scanner',
      description: 'Analyze URLs for phishing indicators',
      icon: Link2,
      action: 'Enter URL',
      color: 'from-cyan-500/20 to-cyan-600/10',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
    },
    {
      title: 'Bot Detection',
      description: 'Detect automated transaction patterns',
      icon: Bot,
      action: 'Analyze',
      color: 'from-purple-500/20 to-purple-600/10',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      title: 'Network Analysis',
      description: 'Check IP addresses for threats',
      icon: Globe,
      action: 'Analyze',
      color: 'from-orange-500/20 to-orange-600/10',
      borderColor: 'border-orange-500/30',
      iconColor: 'text-orange-400',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className={`bg-gradient-to-br ${metric.bgColor} border ${metric.borderColor} rounded-xl p-6 backdrop-blur-sm`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{metric.title}</p>
                  <h3 className="text-3xl font-bold text-white mt-2">{metric.value}</h3>
                </div>
                <Icon className={`w-8 h-8 ${metric.iconColor}`} />
              </div>
              <div className="flex items-center gap-2 text-xs">
                <TrendingDown className={`w-4 h-4 ${metric.change < 0 ? 'text-red-400' : 'text-green-400'}`} />
                <span className={metric.change < 0 ? 'text-red-400' : 'text-green-400'}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
                <span className="text-gray-500">vs last hour</span>
              </div>
              <p className="text-gray-500 text-xs mt-3">{metric.period}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className={`bg-gradient-to-br ${feature.color} border ${feature.borderColor} rounded-xl p-6 backdrop-blur-sm hover:border-opacity-100 transition-all`}
            >
              <div className="flex items-start gap-4 mb-4">
                <Icon className={`w-10 h-10 ${feature.iconColor} flex-shrink-0`} />
                <div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
                </div>
              </div>
              <input
                type="text"
                placeholder={feature.action}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm mb-3 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all">
                {feature.action}
              </button>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-400" />
            Global Threat Map
          </h3>
          <div className="w-full h-64 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Threat map visualization coming soon</p>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Threat</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-400" />
            Recent Activity
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <p className="text-white font-medium">URL Scan Completed</p>
                <p className="text-gray-500 text-xs">2 min ago</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <p className="text-white font-medium">Threat Blocked</p>
                <p className="text-gray-500 text-xs">15 min ago</p>
              </div>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex items-center justify-between pb-3">
              <div>
                <p className="text-white font-medium">Bot Traffic Detected</p>
                <p className="text-gray-500 text-xs">1 hour ago</p>
              </div>
              <Bot className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <button className="w-full mt-4 px-3 py-2 text-sm text-gray-400 hover:text-gray-300 border border-white/10 rounded-lg transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
