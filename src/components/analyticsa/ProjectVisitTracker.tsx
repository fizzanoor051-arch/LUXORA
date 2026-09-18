
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
  const userAgent =
    navigator.userAgent;

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
  const userAgent =
    navigator.userAgent;

  if (/Windows NT/i.test(userAgent)) {
    return "Windows";
  }

  if (/Android/i.test(userAgent)) {
    return "Android";
  }

  if (
    /iPhone|iPad|iPod/i.test(
      userAgent
    )
  ) {
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

async function sendProjectVisit(
  visitorId: string,
  projectName: string,
  projectSlug: string
): Promise<boolean> {
  try {
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
    };

    const response =
      await fetch(
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
      );

    if (!response.ok) {
      console.error(
        "Luxora analytics API error:",
        response.status
      );

      return false;
    }

    const result =
      await response.json();

    if (!result?.success) {
      console.error(
        "Luxora analytics rejected visit:",
        result
      );

      return false;
    }

    console.log(
      "Luxora project visit tracked:",
      result
    );

    return true;
  } catch (error) {
    console.error(
      "Luxora project analytics failed:",
      error
    );

    return false;
  }
}

export default function ProjectVisitTracker({
  projectName,
  projectSlug,
}: ProjectVisitTrackerProps) {
  useEffect(() => {
    let cancelled = false;

    async function trackVisit() {
      try {
        const visitorId =
          getVisitorId();

        if (!visitorId) {
          return;
        }

        /*
         * Every project gets its own
         * session tracking key.
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

        /*
         * IMPORTANT:
         *
         * Do NOT wait for GPS.
         *
         * The visit is sent immediately.
         * Country/city can be obtained from
         * the server/Vercel geo headers.
         */
        const success =
          await sendProjectVisit(
            visitorId,
            projectName,
            projectSlug
          );

        if (
          success &&
          !cancelled
        ) {
          /*
           * Only mark the session as
           * tracked AFTER the API confirms
           * successful tracking.
           */
          sessionStorage.setItem(
            sessionKey,
            "true"
          );
        }
      } catch (error) {
        console.error(
          "Luxora project tracker error:",
          error
        );
      }
    }

    trackVisit();

    return () => {
      cancelled = true;
    };
  }, [
    projectName,
    projectSlug,
  ]);

  return null;
}
