"use client";

export const checkIfSurveyCompleted = async (
  userId: number,
  surveyId: number
): Promise<boolean> => {
  try {
    const res = await fetch(
      `/api/completion-check?user_id=${userId}&survey_id=${surveyId}`
    );
    const data = await res.json();
    return data.responded;
  } catch (error) {
    console.error("Error checking survey completion:", error);
    return false;
  }
};
