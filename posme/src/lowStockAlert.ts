// posme/src/lowStockAlert.ts
import { onDocumentWritten } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

const db = admin.firestore();

// ฟังการเปลี่ยนแปลง inventory → ส่งแจ้งเตือนเมื่อต่ำกว่า threshold
export const alertLowStock = onDocumentWritten("inventory/{invId}", async (event) => {
  const after = event.data?.after.data();
  if (!after) return;

  const { qty, lowStockThreshold, productId, branchId } = after;
  if (qty > lowStockThreshold) return;

  const product = await db.collection("products").doc(productId).get();
  const name = product.exists ? product.data()!.name : productId;

  // ส่ง notification (หรือแค่ log ก่อน)
  console.log(`[LOW-STOCK] ${branchId} | ${name} เหลือ ${qty} ชิ้น`);
  // TODO: ส่ง LINE Notify, FCM, ฯลฯ
});