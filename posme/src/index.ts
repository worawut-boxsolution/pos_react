// posme/src/index.ts
import * as admin from 'firebase-admin'
admin.initializeApp() // ← เพิ่มบรรทัดนี้
export { dailySales } from './reports'
export { alertLowStock } from './lowStockAlert'