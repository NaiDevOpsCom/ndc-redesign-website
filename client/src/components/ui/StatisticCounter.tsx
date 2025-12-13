import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

interface StatisticCounterProps {
  endValue: string | number;
  duration?: number;
  className?: string;
}

const StatisticCounter = ({
  endValue,
  duration = 2.0,
  className = "text-2xl font-bold text-foreground",
}: StatisticCounterProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { numericValue, suffix } = useMemo(() => {
    const str = String(endValue);
    return {
      numericValue: Number(str.replace(/[^\d.]/g, "")),
      suffix: str.replace(/[\d.]/g, ""),
    };
  }, [endValue]);

  // Fallback if the value cannot be parsed
  if (isNaN(numericValue)) {
    return <span className={className}>{String(endValue)}</span>;
  }

  return (
    <span ref={ref} className={className} aria-live="polite">
      {inView ? (
        <CountUp start={0} end={numericValue} duration={duration} />
      ) : (
        "0"
      )}
      {suffix}
    </span>
  );
};

export default StatisticCounter;
