"use client";

import { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { iSurvey } from "@/types/types";
import moment from "moment";
import Link from "next/link";
import { fetchAvailableSurveys } from "./FetchAvailableSurveys";
import { fetchAnsweredSurveysCount } from "./FetchAnsweredSurveysCount";
import { checkIfSurveyCompleted } from "./CheckIfSurveyCompleted";

export default function userDashboard() {
  const { userId, wallet } = useUser();
  const [surveyList, setSurveyList] = useState<iSurvey[]>([]);
  const [completedSurveys, setCompletedSurveys] = useState<{
    [key: number]: boolean;
  }>({});
  const [numberResp, setNumberResp] = useState(0);

  useEffect(() => {
    const getSurveys = async () => {
      if (userId !== null) {
        const availableSurveys = await fetchAvailableSurveys();
        setSurveyList(availableSurveys);
      }
    };
    if (userId) {
      getSurveys();
    }
  }, [userId]);

  useEffect(() => {
    const fetchResponses = async () => {
      if (!userId) return;
      try {
        const count = await fetchAnsweredSurveysCount(userId);
        setNumberResp(count);
      } catch (error) {
        console.error("Error fetching survey count:", error);
      }
    };
    fetchResponses();
  }, [userId]);

  useEffect(() => {
    const checkCompletedSurveys = async () => {
      if (!userId || surveyList.length === 0) return;

      const results: { [key: number]: boolean } = {};

      await Promise.all(
        surveyList.map(async (survey) => {
          const completed = await checkIfSurveyCompleted(userId, survey.id);
          results[survey.id] = completed;
        })
      );

      setCompletedSurveys(results);
    };

    checkCompletedSurveys();
  }, [surveyList, userId]);

  return (
    <>
      <div className="px-30 py-10">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-emerald-100">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2.2fr_0.8fr] gap-4 py-2">
                {/* Current Rewards (estrecha/cuadrada) */}
                <Card className="bg-emerald-600 text-white p-4 h-full flex items-start justify-center">
                  <CardContent className="flex flex-col items-center justify-start h-full pt-0 px-4">
                    <h2 className="text-xl font-semibold mb-0 text-center">
                      Current Rewards
                    </h2>
                    <p className="text-7xl font-extrabold text-center leading-none">
                      {numberResp * 10}
                    </p>
                  </CardContent>
                </Card>

                {/* Overview (más ancha) */}
                <Card className="bg-emerald-600 text-white p-4 h-full">
                  <CardContent>
                    <h2 className="text-xl font-semibold mb-3">Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3">
                      {/* Columna izquierda */}
                      <div className="space-y-2">
                        <div className="flex">
                          <p className="w-40 text-sm">Surveys completed:</p>
                          <p className="text-lg font-bold leading-none">
                            {numberResp}
                          </p>
                        </div>
                        <div className="flex">
                          <p className="w-40 text-sm">Daily streak count:</p>
                          <p className="text-lg font-bold leading-none">0</p>
                        </div>
                      </div>

                      {/* Columna derecha */}
                      <div className="space-y-2">
                        <div className="flex">
                          <p className="w-40 text-sm">Daily strike bonus:</p>
                          <p className="text-lg font-bold leading-none">0</p>
                        </div>
                        <div className="flex">
                          <p className="w-40 text-sm">Completion bonus:</p>
                          <p className="text-lg font-bold leading-none">0</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Botones (más estrecho) */}
                <div className="flex flex-col justify-center space-y-4 w-full">
                  <Link href="/">
                    <Button className="w-full bg-emerald-600 text-white">
                      Daily Strike
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button className="w-full bg-emerald-600 text-white">
                      Withdraw rewards
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Table Section */}
      <div className="px-30 py-10">
        <div className="max-w-6xl mx-auto">
          <Table className="mt-4">
            <TableCaption>Answer surveys for crypto rewards</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col" className="w-[100px]">
                  Title
                </TableHead>
                <TableHead scope="col" className="text-center">
                  Created at
                </TableHead>
                <TableHead scope="col" className="text-center">
                  Company ID
                </TableHead>
                <TableHead scope="col" className="text-center">
                  Completed
                </TableHead>
                <TableHead scope="col" className="text-right">
                  Link
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {surveyList
                .filter((survey) => survey.user_id !== userId)
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((currentSurvey) => {
                  const completionStatus = completedSurveys[currentSurvey.id];
                  return (
                    <TableRow key={currentSurvey.id}>
                      <TableCell className="font-medium text-left">
                        {currentSurvey.title}
                      </TableCell>
                      <TableCell className="text-center">
                        {moment(currentSurvey.created_at).fromNow()}
                      </TableCell>
                      <TableCell className="text-center">
                        {currentSurvey.user_id}
                      </TableCell>
                      <TableCell className="text-center">
                        {completionStatus ? "YES" : "NO"}
                      </TableCell>
                      <TableCell className="text-right px-0">
                        <Link href={`/answersurvey/${currentSurvey.id}`}>
                          <Button
                            className={`px-3 py-1.5 text-sm ${
                              completionStatus
                                ? "bg-gray-400 w-27"
                                : "bg-emerald-600"
                            }`}
                            disabled={completionStatus} // Disable the button if the survey is completed
                          >
                            {completionStatus ? "Done" : "Complete survey"}
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
