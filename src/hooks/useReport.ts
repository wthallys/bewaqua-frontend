import { useState, useEffect } from 'react'
import { api } from '@/services/api'
import { DEMO_REPORT } from '@/services/demo'
import type { Report } from '@/types'

interface UseReportResult {
  report:   Report | null
  loading:  boolean
  isDemo:   boolean
}

export function useReport(): UseReportResult {
  const [report,  setReport]  = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDemo,  setIsDemo]  = useState(false)

  useEffect(() => {
    api.latestReport().then(d => {
      if (d && d.points && d.points.length > 0) {
        setReport(d)
        setIsDemo(false)
      } else {
        setReport(DEMO_REPORT)
        setIsDemo(true)
      }
      setLoading(false)
    }).catch(() => {
      setReport(DEMO_REPORT)
      setIsDemo(true)
      setLoading(false)
    })
  }, [])

  return { report, loading, isDemo }
}
