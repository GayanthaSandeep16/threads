import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useUserProfile() {
    const { user } = useUser();
    const clerkId = user?.id;

    const userProfile = useQuery(
        api.users.getUserByClerkId,
        clerkId ? { clerkId } : "skip" // Skip the query if clerkId is undefined
    );

    return clerkId ? userProfile : null; // Return null if clerkId is not available
}