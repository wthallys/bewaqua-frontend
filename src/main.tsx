import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar }    from '@/components/layout/Navbar'
import { Dashboard } from '@/pages/Dashboard'
import { Map }       from '@/pages/Map'
import { History }   from '@/pages/History'
import { Ranking }   from '@/pages/Ranking'
import { Compare }   from '@/pages/Compare'
import { useReport } from '@/hooks/useReport'
import './index.css'

function AppShell() {
  const { report } = useReport()

  return (
    <BrowserRouter>
      <Navbar reab={report?.reab} collectedAt={report?.collected_at} />
      <Routes>
        <Route path="/"        element={<Dashboard />} />
        <Route path="/map"     element={<Map />}       />
        <Route path="/history" element={<History />}   />
        <Route path="/ranking" element={<Ranking />}   />
        <Route path="/compare" element={<Compare />}   />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppShell />
  </React.StrictMode>
)
