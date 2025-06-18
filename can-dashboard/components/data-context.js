"use client"

import { createContext, useContext, useState, useEffect } from "react"

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}

const sampleWebSocketData = {
  timestamp: new Date().toISOString(),
  status615: {
    EcoPost: true,
    LimpHomeMode: false,
    Brake: true,
    Forward: true,
    Reverse: false,
    Neutral: true,
    HillholdMode: false,
    RegeMode: true,
    ThrotMode: false,
    AscMode: true,
    SnsrHealthStatus: true,
    SnsrHealthStatusDcBus: true,
    SnsrHealthStatus12V: true,
    SnsrHealthStatus5V: true,
    SnsrHealthStatusPhBCurr: true,
    SnsrHealthStatusPhCCurr: true,
    SnsrHealthStatusThrot1: true,
    SnsrHealthStatusQep: true,
    SnsrHealthStatusCtlrTemp1: true,
    SnsrHealthStatusMtrTemp: true,
    SnsrHealthStatusThrot2: true,
    SnsrHealthStatusCtlrTemp2: true,
    PcModeEnable: true,
    StartStop: false,
    DcuControlModeStatus: true,
    IdleShutdown: false,
  },
  temp616: {
    CtlrTemp1: 45.3,
    CtlrTemp2: 47.8,
    CtlrTemp: 46.5,
    MtrTemp: 55.2,
  },
  measurement617: {
    AcCurrMeaRms: 65.4,
    DcCurrEstd: 40.2,
    DcBusVolt: 350.7,
    Mtrspd: 1800,
    ThrotVolt: 3.2,
  },
}

export const DataProvider = ({ children }) => {
  const [currentData, setCurrentData] = useState(sampleWebSocketData)
  const [history, setHistory] = useState([sampleWebSocketData])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Replace the placeholder URL below with your actual ESP32 websocket URL
    const websocketUrl = "ws://your-esp32-websocket-url"

    const ws = new WebSocket(websocketUrl)

    ws.onopen = () => {
      setIsConnected(true)
      console.log("WebSocket connected to", websocketUrl)
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        setCurrentData(data)
        setHistory((prev) => {
          const updated = [...prev, data]
          return updated.slice(-100)
        })
      } catch (error) {
        console.error("Error parsing websocket data:", error)
      }
    }

    ws.onclose = () => {
      setIsConnected(false)
      console.log("WebSocket disconnected")
    }

    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
    }

    return () => {
      ws.close()
    }
  }, [])

  return (
    <DataContext.Provider
      value={{
        currentData,
        history,
        isConnected,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
