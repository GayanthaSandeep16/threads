import { ClerkProvider, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <ClerkProvider>
      <div>
        <UserButton />
      </div>
    </ClerkProvider>
  );
}
