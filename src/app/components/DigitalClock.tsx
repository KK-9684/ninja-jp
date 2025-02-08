import { useCurrentTime } from "@/hooks/useCurrentTime";

export default function DigitalClock() {
  const currentTime = useCurrentTime();
  const dateString = currentTime.toLocaleDateString("ja-JP", {
    month: "2-digit",
    day: "2-digit",
  });
  const timeString = currentTime.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <p className="ms-10 text-2xl">{dateString}</p>
      <p className="mx-1.5 text-2xl">{timeString}</p>
    </>
  );
}
