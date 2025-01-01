"use server";

import { authActionClient } from "@/actions/safe-action";
import { updateUser } from "@bu/supabase/mutations";
import { updateUserSchema } from "./schema";
import { revalidateTag } from "next/cache";

export const updateUserAction = authActionClient
  .schema(updateUserSchema)
  .metadata({
    name: "update-user",
  })
  .action(async ({ parsedInput: input, ctx: { user } }) => {
    const result = await updateUser(user.id, input);

    revalidateTag(`user_${user.id}`);

    return result;
  });
