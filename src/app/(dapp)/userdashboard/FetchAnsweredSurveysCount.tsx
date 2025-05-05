"use client";

export async function fetchAnsweredSurveysCount(userId: number) {
  const res = await fetch(`/api/user/${userId}/responses`);
  if (!res.ok) {
    throw new Error("Failed to fetch answered surveys count");
  }

  const data = await res.json();
  return data.numberResponses; // Esto es un número
}
