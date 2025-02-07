import { Metadata } from "next/types";

export default function TagPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: "Ninja",
  description: "",
};
