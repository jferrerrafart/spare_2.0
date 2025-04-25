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
  const [countSurveys, setCountSurveys] = useState(0);
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

  /*async function fetchData() {
    const count = await spareAPI.getCreatedSurveys(Number(userId));
    setCountSurveys(count.companySurveys);
  }
  async function fetchData2() {
    const surveys = await spareAPI.getCompanySurveys(Number(userId));
    setSurveyList(surveys.surveys as iSurvey[]);
    const responses: Record<number, number> = {};
    for (const survey of surveys.surveys) {
      const surveyResults = await spareAPI.getSurveyResults(survey.id);
      responses[survey.id] = surveyResults.totalresponses;
    }
    setSurveyResponses(responses);
  }
  async function fetchData3() {
    const allresponses = await spareAPI.getAllResponses(Number(userId));
    console.log("API Response:", allresponses); // Check the structure
    console.log(allresponses.totalResponses);
    setTotalResponses(Number(allresponses.totalResponses));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
      fetchData2();
      //fetchData3();
    }, 1000);
    return () => clearInterval(interval);
  }, [userId]);*/

  return (
    <>
      <div className="px-27 py-10">
        <Card className="bg-emerald-100">
          <CardContent>
            <div className="flex items-center justify-between space-x-3 px-4 py-2">
              <div className="flex flex-col items-center space-y-2 ml-10">
                <p>aquí iba el avatar</p>
                <p className="font-medium">ID: {userId}</p>
              </div>
              <div className="max-w-4xl mx-auto ">
                <Card className="bg-emerald-600 text-white font-bold p-6">
                  <CardContent>
                    <p>Surveys created: {countSurveys}</p>
                    <p>
                      Total responses obtained:{" "}
                      {totalResponses !== null ? totalResponses : "Loading..."}
                    </p>
                    <p>Funds spent: Available soon</p>
                    <p>Available to withdraw: Available soon</p>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-col space-y-4 w-40">
                <Link href="/createsurvey" passHref>
                  <Button className="w-full bg-emerald-600">
                    Create New Survey
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <div className="px-30 py-10">
        <Table className="mt-4">
          <TableCaption>
            A list of all surveys created by the company
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead className="text-center">Created at</TableHead>
              <TableHead className="text-center">
                Current participants
              </TableHead>
              <TableHead className="text-right">Results</TableHead>
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
                        <Button className="bg-emerald-600 px-2 py-1 text-xs">
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
    </>
  );
}
