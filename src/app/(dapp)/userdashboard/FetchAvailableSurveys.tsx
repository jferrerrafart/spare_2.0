"use client";

export async function fetchAvailableSurveys() {
  try {
    const res = await fetch(`/api/survey`, {
      method: "GET",
      cache: "no-store", // ← si quieres evitar que Next.js cachee
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch surveys");
    }

    const data = await res.json();
    return data.surveys;
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return [];
  }
}
