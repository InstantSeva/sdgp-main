import { Redirect, Stack } from "expo-router";
import React, { useState } from "react";

export default function AppLayout() {
  const [session, setSession] = useState();

  if (!session) {
    return <Redirect href="/welcome" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
