import React, { useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./receipt.css";

const
  Receipt = ({ paymentData, orderData }) => {

    const downloadReceipt = () => {
      const invoiceElement = document.getElementById("invoice-POS");

      html2canvas(invoiceElement, {
        scale: 2, // Improves resolution
        useCORS: true // Ensures external assets like images load properly
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("receipt.pdf");
      });
    };
    console.log(orderData, paymentData)

    const paymentCompletionTime = orderData?.created_at
      ;

    // Convert the string to a Date object
    const date = new Date(paymentCompletionTime);

    // Extract the date part (YYYY-MM-DD)
    const extractedDate = date.toISOString().split('T')[0];

    return (
      <div style={{ padding: "40px" }}>
        <div id="invoice-POS">
          <center id="top">
            <div className="logo" style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
              <img
                src="../../src/assets/images/logo/logo.jpeg"
                alt="Company Logo"
                style={{ width: "200px", height: "auto" }}
              />
            </div>
            {/* <div className="info">
            <h2>BNI</h2>
          </div> */}
          </center>

          <div id="mid">
            <div
              className="info"
              style={{
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                maxWidth: "600px",
                margin: "20px auto",
                fontFamily: "Arial, sans-serif"
              }}
            >
              <h2 className="text-center font-bold text-xl">Contact Information</h2>

              <div className="flex justify-between">
                {/* Left Column */}
                <div className="flex-1 min-w-[280px] box-border">
                  <p className="text-base leading-relaxed text-gray-600">
                    <span className="font-bold text-gray-800">Name: </span>
                    <span>{orderData?.member_name}</span>
                    <br />

                    <span className="font-bold text-gray-800">Email: </span>
                    <span>{orderData?.customer_email}</span>
                    <br />

                    <span className="font-bold text-gray-800">Company: </span>
                    <span>{orderData?.company}</span>
                    <br />

                    <span className="font-bold text-gray-800">Company GST: </span>
                    <span>{orderData?.gstin}</span>
                    <br />
                  </p>
                </div>

                {/* Right Column */}
                <div className="flex-1 box-border">
                  <p className="text-base leading-relaxed text-gray-600">
                    <span className="font-bold text-gray-800">Payment Status: </span>
                    <span>{paymentData[0]?.payment_status === "SUCCESS" ? "Success" : "Failed"}</span>
                    <br />

                    <span className="font-bold text-gray-800">Transaction No: </span>
                    <span>{paymentData[0]?.cf_payment_id || "N/A"}</span>
                    <br />

                    
                  </p>
                </div>
                
              </div>
              <p className="text-gray-800"><strong className="font-bold">Order No:</strong>
                    <span className="ml-1">{orderData?.order_id || "N/A"}</span> </p>
            </div>


          </div>

          <div id="bot">
            <div id="table">
              <table>
                <thead>
                  <tr className="tabletitle">
                    <th className="item">
                      <h5>Description</h5>
                    </th>
                    <th className="Hours">
                      <h5>Date</h5>
                    </th>
                    <th className="Rate">
                      <h5>Sub Total</h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="service">
                    <td className="tableitem">
                      <p className="itemtext font-semibold">{orderData?.payment_note}</p>
                    </td>
                    <td className="tableitem">
                      <p className="itemtext">{extractedDate}</p>
                    </td>
                    <td className="tableitem">
                      <p className="itemtext">₹{orderData?.order_amount - orderData?.tax}</p>
                    </td>
                  </tr>

                  <tr className="tabletitle">
                    <td></td>
                    <td className="Rate">
                      <h2 className=" font-semibold">Tax</h2>
                    </td>
                    <td className="payment">
                      <h2>₹{orderData?.tax}</h2>
                    </td>
                  </tr>
                  <tr className="tabletitle">
                    <td></td>
                    <td className="Rate">
                      <h2 className="font-semibold">Total</h2>
                    </td>
                    <td className="payment">
                      <h2>₹{orderData?.order_amount}</h2>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div id="legalcopy">
              <p className="legal">
                <strong>Thank you for your business!</strong> Payment is expected
                within 31 days; please process this invoice within that time.
                There will be a 5% interest charge per month on late invoices.
              </p>
            </div>
          </div>
        </div>
        <div style={{ padding: "10px", display: "flex", justifyContent: "center" }}><button className="pay-now-button " onClick={downloadReceipt}  >
          {"Download Receipt"}
        </button></div>
        {/* <button onClick={downloadReceipt} className="download-button">
        Download Receipt
      </button> */}
      </div>
    );
  };

export default Receipt;
