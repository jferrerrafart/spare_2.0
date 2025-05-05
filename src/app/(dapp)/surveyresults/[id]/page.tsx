"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { iSurvey, iResults } from "@/types/types";
import Link from "next/link";

export default function surveyResults() {
  const params = useParams();
  const [surveyR, setSurveyR] = useState<iSurvey | null>(null);
  const [results, setResults] = useState<iResults | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (!params?.id) return;

      try {
        const [surveyRes, resultsRes] = await Promise.all([
          fetch(`/api/survey/${params.id}`),
          fetch(`/api/survey-results/${params.id}`),
        ]);

        if (!surveyRes.ok || !resultsRes.ok) {
          throw new Error("Failed to fetch survey or results");
        }

        const surveyData = await surveyRes.json();
        const resultsData = await resultsRes.json();

        setSurveyR(surveyData);
        setResults(resultsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params?.id]);

  return (
    <div className="flex justify-center py-16 px-4">
      <div className="w-full max-w-3xl">
        <Card>
          <CardHeader className="py-10 px-6">
            <CardTitle>{surveyR ? surveyR.question : "Loading..."}</CardTitle>
            <CardDescription className="py-2">
              Total responses: {results ? results.totalResponses : "Loading..."}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 py-0 space-y-2">
            <p>
              {surveyR ? surveyR.option_a : "Loading..."}:{" "}
              {results ? results.option_a : "Loading..."}%
            </p>
            <p>
              {surveyR ? surveyR.option_b : "Loading..."}:{" "}
              {results ? results.option_b : "Loading..."}%
            </p>
            <p>
              {surveyR ? surveyR.option_c : "Loading..."}:{" "}
              {results ? results.option_c : "Loading..."}%
            </p>
            <p>
              {surveyR ? surveyR.option_d : "Loading..."}:{" "}
              {results ? results.option_d : "Loading..."}%
            </p>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4 py-10">
            <Link href="/companydashboard">
              <Button className="px-5 py-1 text-xs bg-black text-white border border-gray-300">
                Back to the dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
