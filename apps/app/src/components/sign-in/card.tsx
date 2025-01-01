"use client";

import { GoogleSignin } from "@/components/google-signin";
import { BuLogo } from "@bu/ui/bu-logo";
import { Button } from "@bu/ui/button";
import { Card } from "@bu/ui/card";
import { Checkbox } from "@bu/ui/checkbox";
import { Input } from "@bu/ui/input";
import { Label } from "@bu/ui/label";

const SignInCard = () => {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Enhanced background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200 opacity-75 blur-3xl" />

      <Card className="w-96 md:w-72 lg:w-96 xl:w-[60vh]  relative overflow-hidden backdrop-blur-sm hover:backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 border border-white/30 shadow-2xl transition-all duration-300 hover:shadow-blue-200/50 dark:hover:shadow-blue-500/30 hover:translate-y-[-5px]">
        <div className="p-8 space-y-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <BuLogo text="" logo="/logo.png" width={80} height={80} />

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Log in to your Bu Desk account
            </p>
          </div>

          <div className="space-y-5">
            <GoogleSignin />

            <div className="flex items-center gap-4">
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
              <span className="h-px w-full bg-gray-300 dark:bg-gray-600"></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                OR
              </span>
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
              <span className="h-px w-full bg-gray-300 dark:bg-gray-600"></span>
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-200 font-medium"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                className="mt-1 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-gray-700 dark:text-gray-200 font-medium"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="mt-1 bg-white/50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="border-gray-300 dark:border-gray-600"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <a
                href="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 hover:underline sm:ml-4"
              >
                Forgot password?
              </a>
            </div>
            <Button
              type="submit"
              variant="brutalism"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sign in
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
        Don&apos;t have an account?{" "}
        <a
          href="/sign-up"
          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
        >
          Sign up
        </a>
      </div>
    </div>
  );
};

export default SignInCard;
