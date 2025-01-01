"use client";

import { useState, useEffect } from "react";
import { createTeamAction } from "@/actions/team/create-team-action";
import { createTeamSchema } from "@/actions/team/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@bu/ui/button";
import { FileUploadRound } from "@bu/ui/file-uploader-round";
import { Progress } from "@bu/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@bu/ui/form";
import { Input } from "@bu/ui/input";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { toast } from "@bu/ui/use-toast";
import { createClient } from "@bu/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@bu/ui/card";

export function CreateTeamForm() {
  const createTeam = useAction(createTeamAction);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    const initSupabase = async () => {
      const client = await createClient();
      setSupabase(client);
    };
    initSupabase();
  }, []);

  const form = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: "",
      logo_url: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof createTeamSchema>) {
    if (!supabase) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);
      let publicUrl: string | undefined = undefined;

      if (values.logo_url && values.logo_url instanceof File) {
        const fileExt = values.logo_url.name.split(".").pop();
        const filePath = `team-logos/${crypto.randomUUID()}.${fileExt}`;

        const progressInterval = setInterval(() => {
          setUploadProgress((prevProgress) => {
            if (prevProgress >= 90) {
              clearInterval(progressInterval);
              return prevProgress;
            }
            return prevProgress + Math.random() * 10;
          });
        }, 200);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("teams")
          .upload(filePath, values.logo_url, {
            cacheControl: "3600",
            upsert: false,
          });

        clearInterval(progressInterval);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("teams").getPublicUrl(filePath);
        publicUrl = data.publicUrl;

        setUploadProgress(100);
      }

      await createTeam.execute({
        name: values.name,
        logo_url: publicUrl as File | undefined,
        redirectTo: "/teams/invite",
      });
    } catch (error) {
      console.error("Error creating team:", error);
      toast({
        title: "Error",
        description: "Failed to create team. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 500);
    }
  }

  // TODO: FIX IMAGE UPLOADER

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold">
          Welcome to your Bu workspace
        </CardTitle>
        <CardDescription>
          Create a workspace for your team to collaborate on projects, and
          manage your business.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="logo_url"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormControl>
                        <FileUploadRound
                          value={value as File | undefined}
                          onChange={(file: File | null) => onChange(file)}
                          accept="image/png,image/jpeg,image/webp"
                          maxSize={5 * 1024 * 1024}
                          preview={true}
                          className="w-40 h-40 mx-auto"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4 pt-8">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">👻 Team Logo & Name</h2>
                  <p className="text-sm text-muted-foreground">
                    Upload your logo and enter a name for your team or company.
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          autoFocus
                          className="mt-1 bg-blue-100"
                          placeholder="Ex: Acme Marketing or Acme Co"
                          autoComplete="off"
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck="false"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-gray-500 text-center">
                  {uploadProgress}% uploaded
                </p>
              </div>
            )}

            <Button
              className="w-full"
              variant="duende"
              type="submit"
              disabled={createTeam.status === "executing" || isUploading}
            >
              {createTeam.status === "executing" || isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {createTeam.status === "executing" || isUploading
                ? "Creating..."
                : "Create Team"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground text-center w-full">
          After setting up your team, you&apos;ll be able to invite team members
          to collaborate.
        </p>
      </CardFooter>
    </Card>
  );
}
