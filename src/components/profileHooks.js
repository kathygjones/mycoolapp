import { useEffect, useState } from 'react'
import { getAnonSession } from '@fs/zion-session'

export default function useSessionData() {
  const [sessionId, setSessionId] = useState()

  useEffect(() => {
    let cancelled = false

    getAnonSession().then((session) => {
      if (session.id && session.id !== sessionId) {
        if (!cancelled) {
          setSessionId(session.id)
        }
      }
    })

    return () => {
      cancelled = true
    }
  }, [sessionId])

  return sessionId
}
