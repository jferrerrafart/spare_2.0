"use client";

export async function fetchUserSurveys(userId: number) {
  try {
    const res = await fetch(`/api/user/${userId}/surveys`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "no-store" // ← si quieres evitar que Next.js cachee
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch surveys");
    }

    const data = await res.json();
    return data.surveys;
  } catch (error) {
    console.error("Error fetching user surveys:", error);
    return [];
  }
}
