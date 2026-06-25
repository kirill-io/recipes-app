'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export const useIsClient = () => {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
}
