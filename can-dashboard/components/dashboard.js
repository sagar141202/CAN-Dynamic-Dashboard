"use client"

import { useState } from "react"
import { useData } from "./data-context"
import Header from "./header"
import GraphContainer from "./graph-container"
import HistoryView from "./history-view"
import { Activity, BarChart3, Grid3X3 } from "lucide-react"
import SystemAlerts from "./system-alerts"
import PerformanceMetrics from "./performance-metrics"
import EnhancedStatusCards from "./enhanced-status-cards"

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(true)
  const [currentView, setCurrentView] = useState("dashboard") // dashboard, graphs, history
  const [graphMode, setGraphMode] = useState("individual") // individual, overlay, quad
  const { isConnected } = useData()

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Header
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        isConnected={isConnected}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <main className="main-content">
        {currentView === "dashboard" && (
          <>
            <SystemAlerts />
            <PerformanceMetrics />
            <EnhancedStatusCards />
            <div className="graph-controls">
              <button
                className={`control-btn ${graphMode === "individual" ? "active" : ""}`}
                onClick={() => setGraphMode("individual")}
              >
                <BarChart3 size={16} />
                Individual
              </button>
              <button
                className={`control-btn ${graphMode === "overlay" ? "active" : ""}`}
                onClick={() => setGraphMode("overlay")}
              >
                <Activity size={16} />
                Overlay
              </button>
              <button
                className={`control-btn ${graphMode === "quad" ? "active" : ""}`}
                onClick={() => setGraphMode("quad")}
              >
                <Grid3X3 size={16} />
                Quad View
              </button>
            </div>
            <GraphContainer mode={graphMode} />
          </>
        )}

        {currentView === "graphs" && <GraphContainer mode="individual" fullView={true} />}

        {currentView === "history" && <HistoryView />}
      </main>

      <style jsx>{`
        .app {
          min-height: 100vh;
          transition: all 0.3s ease;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        .app.dark {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #f1f5f9;
        }

        .app.light {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          color: #0f172a;
        }

        .main-content {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .graph-controls {
          display: flex;
          gap: 1rem;
          margin: 2rem 0;
          justify-content: center;
          flex-wrap: wrap;
        }

        .control-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          font-family: inherit;
        }

        .app.dark .control-btn {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .app.light .control-btn {
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .control-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
        }

        .control-btn.active {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
        }

        @media (max-width: 768px) {
          .main-content {
            padding: 1rem;
          }
          
          .graph-controls {
            margin: 1rem 0;
          }
          
          .control-btn {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  )
}
