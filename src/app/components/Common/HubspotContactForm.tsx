"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
    };
  }
}

export const HubSpotContactForm = ({ HSF_ID }: { HSF_ID: string }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "48915762",
          formId: HSF_ID,
          target: "#hubspotForm",
        });
      }
    });
  }, [HSF_ID]);
  return (
    <div className="p-6">
      <div id="hubspotForm"></div>
    </div>
  );
};

export default HubSpotContactForm;
