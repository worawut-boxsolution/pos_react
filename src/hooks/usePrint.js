// hosting/src/hooks/usePrint.js
export const usePrint = () => {
  const printReceipt = (order) => {
    // สำหรับเครื่องพิมพ์ thermal ผ่าน Web-USB หรือส่ง Cloud Function
    // ตอนนี้แค่ preview ใน window
    const printWindow = window.open('', '', 'width=320,height=600')
    printWindow.document.write(`
      <html>
        <head><title>ใบเสร็จ</title></head>
        <body style="font-family:monospace;font-size:14px;">
          <h3>POSSME</h3>
          <p>Order: ${order.id}</p>
          <hr/>
          ${order.items.map(i => `<div>${i.name} x${i.qty} <b>${i.price * i.qty}</b></div>`).join('')}
          <hr/>
          <div><b>รวม ${order.total}</b></div>
        </body>
      </html>
    `)
    printWindow.print()
    printWindow.close()
  }

  return { printReceipt }
}