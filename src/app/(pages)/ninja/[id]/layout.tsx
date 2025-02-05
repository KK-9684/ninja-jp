import { Metadata } from "next";

export default function NinjaDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
export const metadata: Metadata = {
  title: "Ninja",
  description: "Magazine page description",
};
