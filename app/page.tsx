import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import React from "react";

export default async function home() {
  const userData=await prisma.user.findMany()
  return (
  <div>
      {userData.map(user=><p key={user.email}>{user.name} {user.email}</p>)}
      <Button>Hello</Button>
    </div>
  )
}
