// posme/src/reports.ts
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
//import { FieldValue } from "firebase-admin/firestore";
import { onCall } from "firebase-functions/v2/https";

const db = admin.firestore();

// Callable: สรุปยอดขายรายวัน (เรียกจากหน้า Dashboard)
export const dailySales = onCall({ cors: true }, async (req) => {
  const { branchId, date } = req.data; // date = "YYYY-MM-DD"
  const start = new Date(`${date}T00:00:00`);
  const end   = new Date(`${date}T23:59:59`);

  const snap = await db
    .collection("orders")
    .where("branchId", "==", branchId)
    .where("createdAt", ">=", start)
    .where("createdAt", "<=", end)
    .get();

  let count = 0;
  let total = 0;
  const productMap = new Map<string, number>();

  snap.docs.forEach((d) => {
    const o = d.data();
    count++;
    total += o.total || 0;
    o.items.forEach((it: any) => {
      productMap.set(it.productId, (productMap.get(it.productId) || 0) + it.quantity);
    });
  });

  // ดึงชื่อสินค้า
  const top5: any[] = [];
  for (const [pid, qty] of productMap.entries()) {
    const p = await db.collection("products").doc(pid).get();
    top5.push({ name: p.exists ? p.data()!.name : '-', qty });
  }
  top5.sort((a, b) => b.qty - a.qty).splice(5);

  logger.info(`dailySales branch=${branchId} date=${date} count=${count} total=${total}`);
  return { count, total, top5 };
});