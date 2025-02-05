import { Metadata } from "next";

export default function NinjaPageLayout({
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
