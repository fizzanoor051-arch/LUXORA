
"use client";

import { useEffect } from "react";

const ANALYTICS_URL =
  "https://faiza-noor10.vercel.app/api/analyticsa/project-visit";

const VISITOR_ID_KEY =
  "luxora_analytics_visitor_id";

const SESSION_KEY =
  "luxora_analytics_visit_tracked";

interface ProjectVisitTrackerProps {
  projectName: string;
  projectSlug: string;
}

function getVisitorId(): string | null {
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

function getDevice(): string {
  const width = window.innerWidth;

  if (width <= 767) {
    return "Mobile";
  }

  if (width <= 1024) {
    return "Tablet";
  }

  return "Desktop";
}

function getBrowser(): string {
  const userAgent = navigator.userAgent;

  if (/Edg\//i.test(userAgent)) {
    return "Microsoft Edge";
  }

  if (/OPR\//i.test(userAgent)) {
    return "Opera";
  }

  if (/Chrome\//i.test(userAgent)) {
    return "Chrome";
  }

  if (/Firefox\//i.test(userAgent)) {
    return "Firefox";
  }

  if (/Safari\//i.test(userAgent)) {
    return "Safari";
  }

  return "Unknown";
}

function getOS(): string {
  const userAgent = navigator.userAgent;

  if (/Windows NT/i.test(userAgent)) {
    return "Windows";
  }

  if (/Android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return "iOS";
  }

  if (/Mac OS X/i.test(userAgent)) {
    return "macOS";
  }

  if (/Linux/i.test(userAgent)) {
    return "Linux";
  }

  return "Unknown";
}

function sendProjectVisit(
  visitorId: string,
  projectName: string,
  projectSlug: string,
  location?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  }
) {
  const payload = {
    visitorId,

    projectName,

    projectSlug,

    projectUrl:
      window.location.origin,

    referrer:
      document.referrer || "",

    path:
      window.location.pathname,

    device:
      getDevice(),

    browser:
      getBrowser(),

    os:
      getOS(),

    userAgent:
      navigator.userAgent,

    ...(location
      ? {
          latitude:
            String(
              location.latitude
            ),

          longitude:
            String(
              location.longitude
            ),

          locationAccuracy:
            String(
              location.accuracy
            ),
        }
      : {}),
  };

  fetch(
    ANALYTICS_URL,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(
        payload
      ),

      keepalive: true,
    }
  ).catch((error) => {
    console.error(
      "Luxora project analytics failed:",
      error
    );
  });
}

export default function ProjectVisitTracker({
  projectName,
  projectSlug,
}: ProjectVisitTrackerProps) {
  useEffect(() => {
    try {
      const visitorId =
        getVisitorId();

      if (!visitorId) {
        return;
      }

      /*
       * One visit per browser session
       * for this project.
       *
       * Different projects have separate
       * session keys.
       */
      const sessionKey =
        `${SESSION_KEY}_${projectSlug}`;

      const alreadyTracked =
        sessionStorage.getItem(
          sessionKey
        );

      if (alreadyTracked) {
        return;
      }

      sessionStorage.setItem(
        sessionKey,
        "true"
      );

      /*
       * Try to get the visitor's GPS
       * location first.
       *
       * If permission is denied or unavailable,
       * the visit is still tracked.
       */
      if (
        "geolocation" in
        navigator
      ) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            sendProjectVisit(
              visitorId,
              projectName,
              projectSlug,
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
            /*
             * GPS unavailable:
             * still record the visit.
             */
            sendProjectVisit(
              visitorId,
              projectName,
              projectSlug
            );
          },

          {
            enableHighAccuracy:
              true,

            timeout: 10000,

            maximumAge: 0,
          }
        );
      } else {
        sendProjectVisit(
          visitorId,
          projectName,
          projectSlug
        );
      }
    } catch (error) {
      console.error(
        "Luxora project tracker error:",
        error
      );
    }
  }, [
    projectName,
    projectSlug,
  ]);

  return null;
}
