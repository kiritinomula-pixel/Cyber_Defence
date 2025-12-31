type BotTrafficInput = {
  step: number;
  type: string;
  amount: number;
  oldBalance: number;
  newBalance: number;
};

type NetworkThreatInput = {
  country: string;
  attackType: string;
  industry: string;
  financialLoss: number;
  affectedUsers: number;
  resolutionTime: number;
};

export function predictBotTraffic(input: BotTrafficInput) {
  let suspicionScore = 0;

  if (input.amount > 10000) suspicionScore += 30;
  if (input.amount > 50000) suspicionScore += 20;

  if (input.type === 'TRANSFER' || input.type === 'CASH_OUT') suspicionScore += 20;

  if (input.oldBalance > 0 && input.newBalance === 0) suspicionScore += 25;

  if (input.oldBalance < input.amount) suspicionScore += 15;

  const balanceChange = Math.abs(input.oldBalance - input.newBalance);
  if (balanceChange === input.amount && input.amount > 5000) suspicionScore += 10;

  suspicionScore = Math.min(suspicionScore, 100);
  const isBot = suspicionScore >= 50;

  return {
    isBot,
    confidence: isBot ? suspicionScore : 100 - suspicionScore,
  };
}

export function predictNetworkThreat(input: NetworkThreatInput) {
  let suspicionScore = 0;

  const stateSponsoredCountries = ['Russia', 'China', 'North Korea', 'Iran'];
  if (stateSponsoredCountries.includes(input.country)) suspicionScore += 30;

  const advancedAttacks = ['APT', 'Zero-Day Exploit', 'Supply Chain Attack'];
  if (advancedAttacks.includes(input.attackType)) suspicionScore += 25;

  const criticalIndustries = ['Government', 'Energy', 'Finance'];
  if (criticalIndustries.includes(input.industry)) suspicionScore += 15;

  if (input.financialLoss > 50) suspicionScore += 20;
  if (input.affectedUsers > 10000) suspicionScore += 15;
  if (input.resolutionTime > 72) suspicionScore += 10;

  suspicionScore = Math.min(suspicionScore, 100);
  const isStateSponsored = suspicionScore >= 55;

  return {
    isStateSponsored,
    confidence: isStateSponsored ? suspicionScore : 100 - suspicionScore,
  };
}

export function predictPhishing(url: string) {
  let suspicionScore = 0;
  const reasons: string[] = [];

  if (url.length > 75) {
    suspicionScore += 25;
    reasons.push('Unusually long URL (common in phishing)');
  }

  const dotCount = (url.match(/\./g) || []).length;
  if (dotCount > 4) {
    suspicionScore += 20;
    reasons.push('Excessive subdomains detected');
  }

  const dashCount = (url.match(/-/g) || []).length;
  if (dashCount > 3) {
    suspicionScore += 15;
    reasons.push('Multiple dashes in URL (obfuscation technique)');
  }

  if (!url.startsWith('https')) {
    suspicionScore += 20;
    reasons.push('Not using secure HTTPS protocol');
  }

  const suspiciousWords = ['login', 'secure', 'account', 'verify', 'signin', 'banking', 'confirm', 'update', 'suspended'];
  const foundWords = suspiciousWords.filter(word => url.toLowerCase().includes(word));
  if (foundWords.length > 0) {
    suspicionScore += foundWords.length * 10;
    reasons.push(`Contains suspicious keywords: ${foundWords.join(', ')}`);
  }

  const digitCount = (url.match(/\d/g) || []).length;
  if (digitCount > 8) {
    suspicionScore += 15;
    reasons.push('Unusual number of digits in URL');
  }

  suspicionScore = Math.min(suspicionScore, 100);
  const isPhishing = suspicionScore >= 50;

  if (!isPhishing) {
    reasons.push('URL appears legitimate based on standard patterns');
  }

  return {
    isPhishing,
    confidence: isPhishing ? suspicionScore : 100 - suspicionScore,
    reasons,
  };
}

export function generateBotTraffic() {
  const types = ['PAYMENT', 'TRANSFER', 'CASH_OUT', 'DEBIT', 'CASH_IN'];
  const isAttack = Math.random() < 0.15;

  if (isAttack) {
    const amount = Math.round(Math.random() * 490000 + 10000);
    return {
      type: 'TRANSFER',
      amount,
      oldBalance: amount,
      newBalance: 0,
      isBot: true,
    };
  } else {
    const type = types[Math.floor(Math.random() * types.length)];
    const amount = Math.round(Math.random() * 4990 + 10);
    const oldBalance = Math.round(amount + Math.random() * 10000);
    return {
      type,
      amount,
      oldBalance,
      newBalance: oldBalance - amount,
      isBot: false,
    };
  }
}

export function generateNetworkTraffic() {
  const countries = ['United States', 'China', 'Russia', 'North Korea', 'Iran', 'United Kingdom', 'Germany'];
  const attacks = ['Ransomware', 'APT', 'DDoS', 'Data Breach', 'Phishing Campaign', 'Zero-Day Exploit'];
  const isStateAttack = Math.random() < 0.12;

  if (isStateAttack) {
    return {
      country: ['Russia', 'China', 'North Korea', 'Iran'][Math.floor(Math.random() * 4)],
      attack: ['APT', 'Zero-Day Exploit', 'Supply Chain Attack'][Math.floor(Math.random() * 3)],
      industry: ['Government', 'Energy', 'Finance'][Math.floor(Math.random() * 3)],
      isStateSponsored: true,
    };
  } else {
    return {
      country: countries[Math.floor(Math.random() * countries.length)],
      attack: attacks[Math.floor(Math.random() * attacks.length)],
      industry: 'Technology',
      isStateSponsored: false,
    };
  }
}
