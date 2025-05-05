"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
//import { useState } from "react";
interface CreateSurveyProps {
  companyId: number | null;
}
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function createSurvey() {
  const { userId, wallet } = useUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: userId ?? undefined,
      title: "",
      question: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Error creating survey:", data.error);
        // Aquí puedes mostrar un toast o algo al usuario
        return;
      }

      const newSurvey = await response.json();
      console.log("Survey created:", newSurvey);

      // Redireccionar al dashboard
      router.push("/companydashboard");
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  }

  return (
    <div className="px-50 py-15">
      <Card>
        <CardHeader>
          <CardTitle>Create a new survey</CardTitle>
          <CardDescription>
            Please, fill the content and press "Send" when you are ready
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Título */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Survey's title</FormLabel>
                    <FormControl>
                      <Input placeholder="..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pregunta */}
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Survey's question</FormLabel>
                    <FormControl>
                      <Input placeholder="..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Opciones */}
              {["option_a", "option_b", "option_c", "option_d"].map(
                (option) => (
                  <FormField
                    key={option}
                    control={form.control}
                    name={option as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Option {option.split("_")[1].toUpperCase()}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              )}

              <CardFooter className="flex justify-center space-x-4">
                <Link href="/companydashboard">
                  <Button className="px-5 py-1 text-xs bg-white text-black border border-gray-300 hover:bg-gray-100">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" className="px-7 py-1 text-xs">
                  Send
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
