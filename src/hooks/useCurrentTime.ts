import { useEffect, useState } from "react";

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // 初期化時に現在時刻の秒を0にセット
    setCurrentTime(new Date());

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1分（60000ミリ秒）ごとに更新

    return () => clearInterval(intervalId);
  }, []);

  return currentTime;
}
