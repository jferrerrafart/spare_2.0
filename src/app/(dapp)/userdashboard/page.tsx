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

export default function userDashboard() {
  const { userId, wallet } = useUser();
  const [surveyList, setSurveyList] = useState<iSurvey[]>([]);
  const [numberResp, setNumberResp] = useState(0);
  const [surveyCompletionStatus, setSurveyCompletionStatus] = useState<
    Map<number, boolean>
  >(new Map());

  /*async function fetchData2() {
    const surveys = await spareAPI.getAllSurveys();
    setSurveyList(surveys.surveys as iSurvey[]);
  }
  async function fetchData3() {
    const count = await spareAPI.getNumberResponses(Number(userId)); // aquí iría el user_id, lo he hardcodeado
    setNumberResp(count.numberResponses);
  }

  async function fetchSurveyCompletionStatus(surveyId: number) {
    // Llamar a la API para saber si el usuario ha completado la encuesta
    const isCompleted = await spareAPI.getSCompletionCheck(
      Number(userId),
      surveyId
    );
    // Actualizar el estado con el resultado de la llamada (YES o NO)
    setSurveyCompletionStatus((prevStatus) =>
      new Map(prevStatus).set(surveyId, !!isCompleted)
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData2();
      fetchData3();
    }, 1000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    // Obtener el estado de completado de cada encuesta cuando se cargan las encuestas
    surveyList.forEach((survey) => {
      fetchSurveyCompletionStatus(survey.id);
    });
  }, [surveyList]);*/

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
                    <p>Current rewards: {numberResp * 10} points!</p>
                    <p>Surveys completed: {numberResp}</p>
                    <p>Daily strike count: Available soon</p>
                    <p>Daily strike bonus: Available soon</p>
                    <p>Survey completion bonus: Available soon</p>
                  </CardContent>
                </Card>
              </div>
              {/* Sección derecha (Botones) */}
              <div className="flex flex-col space-y-4 w-40">
                <Link href="/">
                  <Button className="w-full bg-emerald-600">
                    Daily Strike
                  </Button>
                </Link>
                <Link href="/">
                  <Button className="w-full bg-emerald-600">
                    Withdraw rewards
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
          <TableCaption>A list of all surveys created</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead className="text-center">Created at</TableHead>
              <TableHead className="text-center">Company ID</TableHead>
              <TableHead className="text-center">Completed</TableHead>
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
                const completionStatus = surveyCompletionStatus.get(
                  currentSurvey.id
                );
                return (
                  <TableRow key={currentSurvey.id}>
                    <TableCell className="font-medium text-left">
                      {currentSurvey.title}
                    </TableCell>
                    <TableCell>
                      {moment(currentSurvey.created_at).fromNow()}
                    </TableCell>
                    <TableCell>{currentSurvey.user_id}</TableCell>
                    <TableCell className="text-center">
                      {completionStatus ? "YES" : "NO"}
                    </TableCell>
                    <TableCell className="text-right px-0">
                      <Link href={`/survey-complete/${currentSurvey.id}`}>
                        <Button
                          className={`px-2 py-1 text-xs ${
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
    </>
  );
}
