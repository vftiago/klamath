import React, { useEffect, useState } from "react";
import MainApp from "./MainApp";
import { getWeightedHeaders } from "./headers";
import { WeightedTable } from "@lrkit/weighted/src/types";
import { DAY } from "../constants";
import { useBreakpoints } from "../useBreakpoints";
import LightApp from "./LightApp";

const now = new Date();

const nowString = now.toISOString();

const nowTime = now.getTime();

const App = () => {
  const [weightedHeaders, setWeightedHeaders] = useState<WeightedTable<string>[]>([]);

  const { isMdScreen } = useBreakpoints();

  useEffect(() => {
    const firstVisitString = localStorage.getItem("firstVisit") ?? nowString;

    const firstVisitTime = new Date(firstVisitString).getTime();

    const weightedHeaders = getWeightedHeaders({
      isRecurringVisitor: nowTime - firstVisitTime > DAY,
    });

    setWeightedHeaders(weightedHeaders);
  }, []);

  return isMdScreen ? <MainApp weightedHeaders={weightedHeaders} /> : <LightApp />;
};

export default App;
