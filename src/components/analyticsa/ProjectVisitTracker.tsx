
"use client";

import { useEffect } from "react";

const ANALYTICS_ENDPOINT =
  "https://faiza-noor10.vercel.app/api/analyticsa/project-visit";

const VISITOR_ID_KEY =
  "luxora_analytics_visitor_id";

const SESSION_KEY =
  "luxora_analytics_visit_tracked";

function getVisitorId() {
  try {
    let visitorId =
      localStorage.getItem(VISITOR_ID_KEY);

    if (!visitorId) {
      visitorId = crypto.randomUUID();

      localStorage.setItem(
        VISITOR_ID_KEY,
        visitorId
      );
    }

    return visitorId;
  } catch {
    return null;
  }
}

function sendVisit(
  visitorId: string,
  location?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  }
) {
  const payload = {
    visitorId,
    projectName: "Luxora Store",
    projectSlug: "luxora",
    referrer: document.referrer || "",
    path: window.location.pathname,

    ...(location
      ? {
          latitude:
            location.latitude,
          longitude:
            location.longitude,
          accuracy:
            location.accuracy,
        }
      : {}),
  };

  fetch(ANALYTICS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((error) => {
    console.error(
      "Luxora analytics failed:",
      error
    );
  });
}

export default function ProjectVisitTracker() {
  useEffect(() => {
    try {
      const visitorId =
        getVisitorId();

      if (!visitorId) {
        return;
      }

      const alreadyTracked =
        sessionStorage.getItem(
          SESSION_KEY
        );

      if (alreadyTracked) {
        return;
      }

      sessionStorage.setItem(
        SESSION_KEY,
        "true"
      );

      if (
        "geolocation" in navigator
      ) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            sendVisit(
              visitorId,
              {
                latitude:
                  position.coords
                    .latitude,
                longitude:
                  position.coords
                    .longitude,
                accuracy:
                  position.coords
                    .accuracy,
              }
            );
          },
          () => {
            sendVisit(visitorId);
          },
          {
            enableHighAccuracy:
              true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        sendVisit(visitorId);
      }
    } catch (error) {
      console.error(
        "Luxora tracker error:",
        error
      );
    }
  }, []);

  return null;
}
