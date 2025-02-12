"use client";

import { useEffect } from "react";

export const HubSpotMailMagazineForm = ({ HSF_ID }: { HSF_ID: string }) => {
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

    return () => {
      document.body.removeChild(script);
    };
  }, [HSF_ID]);

  return (
    <div className="p-5">
      <div id="hubspotForm"></div>
    </div>
  );
};

export default HubSpotMailMagazineForm;
