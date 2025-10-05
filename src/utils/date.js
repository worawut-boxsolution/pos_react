// hosting/src/utils/date.js
import { startOfDay, endOfDay, subDays } from 'date-fns'

export const todayStart = () => startOfDay(new Date())
export const todayEnd = () => endOfDay(new Date())
export const last7Days = () => subDays(new Date(), 7)