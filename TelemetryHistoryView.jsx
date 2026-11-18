import React from 'react';

// Sample fallback telemetry data matching PostgreSQL schema
const SAMPLE_7DAY_TREND = [
  { day: 'Mon', moisture: 42, watered: false },
  { day: 'Tue', moisture: 34, watered: false },
  { day: 'Wed', moisture: 28, watered: true },
  { day: 'Thu', moisture: 44, watered: false },
  { day: 'Fri', moisture: 36, watered: false },
  { day: 'Sat', moisture: 29, watered: true },
  { day: 'Sun', moisture: 43, watered: false },
];

const SAMPLE_WATERING_HISTORY = [
  { id: 103, timestamp: '2026-11-18 08:30', triggerMoisture: '29%', durationSec: 4.4, status: 'COMPLETED' },
  { id: 102, timestamp: '2026-11-15 14:15', triggerMoisture: '28%', durationSec: 4.8, status: 'COMPLETED' },
  { id: 101, timestamp: '2026-11-12 19:45', triggerMoisture: '27%', durationSec: 5.0, status: 'COMPLETED' },
];

export default function TelemetryHistoryView({ trendData = SAMPLE_7DAY_TREND, historyLogs = SAMPLE_WATERING_HISTORY, tankEmpty = false }) {
  return (
    <div style={{ backgroundColor: '#F8F9FA', padding: '20px', fontFamily: 'sans-serif', color: '#1B4332' }}>
      {/* Critical Failsafe Alert Banner (Crimson #D90429) */}
      {tankEmpty && (
        <div style={{ backgroundColor: '#D90429', color: '#FFFFFF', padding: '12px 16px', borderRadius: '6px', marginBottom: '16px', fontWeight: 'bold' }}>
          ALERT: Water Reservoir Empty! Autonomous pump locked out. Please refill tank.
        </div>
      )}

      {/* 7-Day Moisture Trend View (Dual-Threshold Hysteresis: 30% - 45%) */}
      <section style={{ backgroundColor: '#FFFFFF', border: '1px solid #2D6A4F', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ margin: 0, color: '#1B4332' }}>7-Day Soil Moisture Trend</h3>
          <span style={{ fontSize: '12px', color: '#2D6A4F', fontWeight: 'bold' }}>Target Hysteresis Band: 30% – 45%</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '160px', borderBottom: '2px solid #1B4332', paddingTop: '20px' }}>
          {trendData.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '12%' }}>
              <span style={{ fontSize: '11px', marginBottom: '4px', fontWeight: 'bold' }}>{item.moisture}%</span>
              <div
                style={{
                  width: '100%',
                  maxWidth: '32px',
                  height: `${item.moisture * 2.5}px`,
                  backgroundColor: item.moisture < 30 ? '#D90429' : '#52B788',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease',
                }}
              />
              <span style={{ fontSize: '12px', marginTop: '6px' }}>{item.day}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Read-Only Watering History Table (Zero Manual Actuation Controls) */}
      <section style={{ backgroundColor: '#FFFFFF', border: '1px solid #2D6A4F', borderRadius: '8px', padding: '16px' }}>
        <h3 style={{ marginTop: 0, color: '#1B4332' }}>Automated Watering History (View-Only)</h3>
        {historyLogs.length === 0 ? (
          <p style={{ color: '#2D6A4F' }}>No automated watering events recorded yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#1B4332', color: '#FFFFFF' }}>
                  <th style={{ padding: '10px' }}>Timestamp</th>
                  <th style={{ padding: '10px' }}>Trigger Moisture</th>
                  <th style={{ padding: '10px' }}>Pump Duration</th>
                  <th style={{ padding: '10px' }}>Execution Status</th>
                </tr>
              </thead>
              <tbody>
                {historyLogs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #E9ECEF' }}>
                    <td style={{ padding: '10px' }}>{log.timestamp}</td>
                    <td style={{ padding: '10px' }}>{log.triggerMoisture} (&lt; 30%)</td>
                    <td style={{ padding: '10px' }}>{log.durationSec}s (Max 10s)</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ backgroundColor: '#52B788', color: '#FFFFFF', padding: '3px 8px', borderRadius: '12px', fontSize: '12px' }}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}