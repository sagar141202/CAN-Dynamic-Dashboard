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

export const DataProvider = ({ children }) => {
  const [currentData, setCurrentData] = useState({})
  const [history, setHistory] = useState([])
  const [isConnected, setIsConnected] = useState(false)

  // Simulate CAN data reception
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toISOString()

      // Simulate 0x615 Status data - ALL 26 attributes
      const status615 = {
        EcoPost: Math.random() > 0.5,
        LimpHomeMode: Math.random() > 0.8,
        Brake: Math.random() > 0.7,
        Forward: Math.random() > 0.6,
        Reverse: Math.random() > 0.9,
        Neutral: Math.random() > 0.8,
        HillholdMode: Math.random() > 0.7,
        RegeMode: Math.random() > 0.6,
        ThrotMode: Math.random() > 0.5,
        AscMode: Math.random() > 0.8,
        SnsrHealthStatus: Math.random() > 0.1,
        SnsrHealthStatusDcBus: Math.random() > 0.1,
        SnsrHealthStatus12V: Math.random() > 0.1,
        SnsrHealthStatus5V: Math.random() > 0.1,
        SnsrHealthStatusPhBCurr: Math.random() > 0.1,
        SnsrHealthStatusPhCCurr: Math.random() > 0.1,
        SnsrHealthStatusThrot1: Math.random() > 0.1,
        SnsrHealthStatusQep: Math.random() > 0.1,
        SnsrHealthStatusCtlrTemp1: Math.random() > 0.1,
        SnsrHealthStatusMtrTemp: Math.random() > 0.1,
        SnsrHealthStatusThrot2: Math.random() > 0.1,
        SnsrHealthStatusCtlrTemp2: Math.random() > 0.1,
        PcModeEnable: Math.random() > 0.5,
        StartStop: Math.random() > 0.7,
        DcuControlModeStatus: Math.random() > 0.6,
        IdleShutdown: Math.random() > 0.8,
      }

      // Simulate 0x616 Temperature data - ALL 4 attributes
      const temp616 = {
        CtlrTemp1: 25 + Math.random() * 50,
        CtlrTemp2: 25 + Math.random() * 50,
        CtlrTemp: 25 + Math.random() * 50,
        MtrTemp: 30 + Math.random() * 60,
      }

      // Simulate 0x617 Measurement data - ALL 5 attributes
      const measurement617 = {
        AcCurrMeaRms: Math.random() * 100,
        DcCurrEstd: Math.random() * 80,
        DcBusVolt: 300 + Math.random() * 100,
        Mtrspd: Math.random() * 3000,
        ThrotVolt: Math.random() * 5,
      }

      const newData = {
        timestamp,
        status615,
        temp616,
        measurement617,
      }

      setCurrentData(newData)
      setHistory((prev) => {
        const updated = [...prev, newData]
        return updated.slice(-100) // Keep last 100 records
      })
      setIsConnected(true)
    }, 1000)

    return () => clearInterval(interval)
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