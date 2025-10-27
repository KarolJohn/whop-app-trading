import { Button } from "@whop/react/components";
import { headers } from "next/headers";
import Link from "next/link";
import { whopsdk } from "@/lib/whop-sdk";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) {
  const { experienceId } = await params;
  // Ensure the user is logged in on whop.
  const { userId } = await whopsdk.verifyUserToken(await headers());

  // Fetch the neccessary data we want from whop.
  // This data is still available for you to use!
  const [experience, user, access] = await Promise.all([
    whopsdk.experiences.retrieve(experienceId),
    whopsdk.users.retrieve(userId),
    whopsdk.users.checkAccess(experienceId, { id: userId }),
  ]);

  const displayName = user.name || `@${user.username}`;

  return (
    // You can keep this main div, it's a good starting point
    <div className="flex flex-col p-8 gap-4">
      
      {/* --- THIS IS YOUR NEW APP --- */}

      <h1 className="text-9">
        Welcome to My TradingDev App, {displayName}!
      </h1>

      <p className="text-3">
        This is where my app's real content will go.
      </p>
      
      <p className="text-3">
        Your access level is: <strong>{access.access_level}</strong>
      </p>

      {/* --- ADD THESE LINES BACK IN --- */}
      <p>
        Your User ID is: <strong>{user.id}</strong>
      </p>
      <p>
        Your Username is: <strong>{user.username}</strong>
      </p>
      {/* --- END OF NEW LINES --- */}

    </div>
  );
}