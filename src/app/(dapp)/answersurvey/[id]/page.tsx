"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { iSurvey } from "@/types/types";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function answerSurvey() {
  const { userId, wallet } = useUser();
  const params = useParams();
  const router = useRouter();
  const [survey, setSurvey] = useState<iSurvey | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("option_a");
  useEffect(() => {
    if (!params.id) return;

    const fetchSurvey = async () => {
      try {
        const res = await fetch(`/api/survey/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch survey");
        }

        const data = await res.json();
        setSurvey(data);
      } catch (error) {
        console.error("Error fetching survey:", error);
      }
    };

    fetchSurvey();
  }, [params.id]);

  const sendResponse = async () => {
    if (!survey?.id) return;

    const responseData = {
      user_id: userId,
      survey_id: survey.id,
      selected_option: selectedOption,
    };

    try {
      const res = await fetch("/api/survey-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responseData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Error sending response");
      }

      router.push("/userdashboard");
    } catch (err) {
      console.error("Error submitting response:", err);
    }
  };

  return (
    <div className="flex justify-center px-4 md:px-0 py-10">
      <div className="w-full max-w-3xl">
        <Card>
          <CardHeader className="py-10 px-20">
            <CardTitle>{survey ? survey.question : "Loading..."}</CardTitle>
            <CardDescription className="py-2">
              Please, choose one option and press "Send" when you are ready
            </CardDescription>
          </CardHeader>
          <CardContent className="py-0">
            <RadioGroup
              defaultValue="option_a"
              className="flex flex-col space-y-4 py-2 items-center"
              onValueChange={(value) => setSelectedOption(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option_a" id="option_a" />
                <Label htmlFor="option_a">
                  {survey ? survey.option_a : "Loading..."}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option_b" id="option_b" />
                <Label htmlFor="option_b">
                  {survey ? survey.option_b : "Loading..."}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option_c" id="option_c" />
                <Label htmlFor="option_c">
                  {survey ? survey.option_c : "Loading..."}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option_d" id="option_d" />
                <Label htmlFor="option_d">
                  {survey ? survey.option_d : "Loading..."}
                </Label>
              </div>
            </RadioGroup>
            <CardFooter className="flex justify-center space-x-4 py-17">
              <Link href="/userdashboard">
                <Button className="px-5 py-1 text-xs bg-white text-black border border-gray-300 hover:bg-gray-100">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                onClick={sendResponse}
                className="px-7 py-1 text-xs"
              >
                Send
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
