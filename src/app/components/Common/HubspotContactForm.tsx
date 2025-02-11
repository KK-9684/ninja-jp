"use client";

import { useEffect } from "react";

export const HubSpotContactForm = ({ HSF_ID }: { HSF_ID: string }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if ((window as any).hbspt) {
        (window as any).hbspt.forms.create({
          portalId: "48915762",
          formId: HSF_ID,
          target: "#hubspotForm",
        });
      }
    });
  }, [HSF_ID]);
  return (
    <div>
      <div id="hubspotForm"></div>
    </div>
  );
};

export default HubSpotContactForm;
