import React from "react";
import Navbar from "./Navbar";

function contact(props) {

  return (
    <div className="contactContainer" style={{ backgroundImage: "url(./images/contactBG.png)" }}>
      <Navbar />
      <div className="contactPage">
        <h1>Page Is Still Underconstruction</h1>
        <div class="wonderland-line line-stroke">
            <div class="line-stroke__wrapp">
              <div class="line-stroke__item line-stroke__1">
                <div>Website Created By Chloe Asthetically / Picture From Pinterest / Effect by Zajno / Update Soon...</div>
                <div>Website Created By Chloe Asthetically / Picture From Pinterest / Effect by Zajno / Update Soon...</div>
                {/* <div>Website Created By Chloe Asthetically / Picture From Pinterest / Effect by Zajno / Update Soon...</div> */}
              </div>
              <div class="line-stroke__item line-stroke__2">
                <div>Website Created By Chloe Asthetically / Picture From Pinterest / Effect by Zajno / Update Soon...</div>
                <div>Website Created By Chloe Asthetically / Picture From Pinterest / Effect by Zajno / Update Soon...</div>
                {/* <div>Website Created By Chloe Asthetically / Picture From Pinterest / Effect by Zajno / Update Soon...</div> */}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default contact;
