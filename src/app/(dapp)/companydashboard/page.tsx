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
import { fetchUserSurveys } from "./FetchUserSurveys";

export default function companyDashboard() {
  const { userId, wallet } = useUser();
  //const [countSurveys, setCountSurveys] = useState(0);
  const [surveyList, setSurveyList] = useState<iSurvey[]>([]);
  const [totalResponses, setTotalResponses] = useState(0);
  const [surveyResponses, setSurveyResponses] = useState<
    Record<number, number>
  >({});

  useEffect(() => {
    const getSurveys = async () => {
      if (userId !== null) {
        const userSurveys = await fetchUserSurveys(userId);
        setSurveyList(userSurveys);
      }
    };
    if (userId) {
      getSurveys();
    }
  }, [userId]);

  useEffect(() => {
    const total = surveyList.reduce((acc, survey) => {
      return acc + (survey.responses_count || 0);
    }, 0);
    setTotalResponses(total);
  }, [surveyList]);

  return (
    <>
      {/* Overview Section with matched width */}
      <div className="px-30 py-10">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-emerald-100">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-2 py-2">
                {/* Stats Section */}
                <div className="px-7">
                  <Card className="bg-emerald-600 text-white p-4">
                    <CardContent>
                      <h2 className="text-xl font-semibold mb-3">Overview</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Columna izquierda */}
                        <div className="space-y-2">
                          <div className="flex">
                            <p className="w-40 text-sm">Surveys created:</p>
                            <p className="text-lg font-bold leading-none px-3">
                              {surveyList.length}
                            </p>
                          </div>
                          <div className="flex">
                            <p className="w-40 text-sm">
                              Total responses obtained:
                            </p>
                            <p className="text-lg font-bold leading-none px-3">
                              {totalResponses !== null
                                ? totalResponses
                                : "Loading..."}
                            </p>
                          </div>
                        </div>

                        {/* Columna derecha */}
                        <div className="space-y-2">
                          <div className="flex">
                            <p className="w-40 text-sm">Funds spent:</p>
                            <p className="text-lg font-bold leading-none">
                              Available soon
                            </p>
                          </div>
                          <div className="flex">
                            <p className="w-40 text-sm">
                              Available to withdraw:
                            </p>
                            <p className="text-lg font-bold leading-none">
                              Available soon
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Button Section */}
                <div className="w-full md:w-auto flex justify-center items-center pr-5">
                  <Link href="/createsurvey" passHref>
                    <Button className="bg-emerald-600 w-full md:w-48">
                      Create New Survey
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Table Section with matched width */}
      <div className="px-30 py-10">
        <div className="max-w-6xl mx-auto">
          <Table className="mt-4">
            <TableCaption>
              A list of all surveys created by the company
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col" className="w-[100px]">
                  Title
                </TableHead>
                <TableHead scope="col" className="text-center">
                  Created at
                </TableHead>
                <TableHead scope="col" className="text-center">
                  Current participants
                </TableHead>
                <TableHead scope="col" className="text-right">
                  Results
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {surveyList
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((currentSurvey) => {
                  const totalParticipants =
                    surveyResponses[currentSurvey.id] || 0;
                  return (
                    <TableRow key={currentSurvey.id}>
                      <TableCell className="font-medium text-left">
                        {currentSurvey.title}
                      </TableCell>
                      <TableCell className="text-center">
                        {moment(currentSurvey.created_at).fromNow()}
                      </TableCell>
                      <TableCell className="text-center">
                        {currentSurvey.responses_count}
                      </TableCell>
                      <TableCell className="text-right px-0">
                        <Link href={`/surveyresults/${currentSurvey.id}`}>
                          <Button className="bg-emerald-600 px-3 py-1.5 text-sm">
                            See results
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
