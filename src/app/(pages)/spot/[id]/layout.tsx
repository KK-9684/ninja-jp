import { Metadata } from "next";

export default function SpotDetailLayout({
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
