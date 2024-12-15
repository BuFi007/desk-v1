"use client";

import {
  UserContext,
  createUserStore,
  type UserProps,
} from "@/store/user/store";

export function UserProvider({
  children,
  initData,
}: {
  children: React.ReactNode;
  initData: UserProps;
}) {
  const store = createUserStore(initData);
  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
}
