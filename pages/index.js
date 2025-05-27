import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    blueTeam: '',
    redTeam: '',
    time: 15,
    blueKills: 0,
    redKills: 0,
    blueGold: 0,
    redGold: 0,
    blueTowers: 0,
    redTowers: 0,
    blueDragons: 0,
    redDragons: 0
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>英雄聯盟即時勝率預測</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '400px' }}>
        <label>
          藍方陣容（以逗號分隔）
          <input name="blueTeam" value={formData.blueTeam} onChange={handleChange} required />
        </label>
        <label>
          紅方陣容（以逗號分隔）
          <input name="redTeam" value={formData.redTeam} onChange={handleChange} required />
        </label>
        <label>
          比賽時間（分鐘）
          <input type="number" name="time" value={formData.time} onChange={handleChange} required />
        </label>
        <label>
          藍方擊殺數
          <input type="number" name="blueKills" value={formData.blueKills} onChange={handleChange} required />
        </label>
        <label>
          紅方擊殺數
          <input type="number" name="redKills" value={formData.redKills} onChange={handleChange} required />
        </label>
        <label>
          藍方總經濟（千）
          <input type="number" name="blueGold" value={formData.blueGold} onChange={handleChange} required />
        </label>
        <label>
          紅方總經濟（千）
          <input type="number" name="redGold" value={formData.redGold} onChange={handleChange} required />
        </label>
        <label>
          藍方塔數
          <input type="number" name="blueTowers" value={formData.blueTowers} onChange={handleChange} required />
        </label>
        <label>
          紅方塔數
          <input type="number" name="redTowers" value={formData.redTowers} onChange={handleChange} required />
        </label>
        <label>
          藍方小龍數
          <input type="number" name="blueDragons" value={formData.blueDragons} onChange={handleChange} required />
        </label>
        <label>
          紅方小龍數
          <input type="number" name="redDragons" value={formData.redDragons} onChange={handleChange} required />
        </label>
        <button type="submit">預測勝率</button>
      </form>
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>預測結果</h2>
          <p>藍方勝率：{result.blueWinRate}%</p>
          <p>紅方勝率：{result.redWinRate}%</p>
          <p>下注建議：{result.recommendation}</p>
        </div>
      )}
    </main>
  );
}
