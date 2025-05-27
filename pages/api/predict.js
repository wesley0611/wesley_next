export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    blueTeam,
    redTeam,
    time,
    blueKills,
    redKills,
    blueGold,
    redGold,
    blueTowers,
    redTowers,
    blueDragons,
    redDragons
  } = req.body;

  let winRate = 50 + (blueGold - redGold) * 1.2 + (blueKills - redKills) * 2.5 + (blueTowers - redTowers) * 3 + (blueDragons - redDragons) * 5;
  winRate = Math.max(0, Math.min(100, winRate));

  const blueWinRate = parseFloat(winRate.toFixed(1));
  const redWinRate = parseFloat((100 - winRate).toFixed(1));

  let recommendation = '';
  if (blueWinRate > 65) recommendation = '推薦下注藍方勝出';
  else if (redWinRate > 65) recommendation = '推薦下注紅方勝出';
  else recommendation = '建議觀望，雙方仍有變數';

  res.status(200).json({ blueWinRate, redWinRate, recommendation });
}
