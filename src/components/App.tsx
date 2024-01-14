import React, { useEffect, useState } from "react";
import MainApp from "./MainApp";
import { getWeightedHeaders } from "./headers";
import { WeightedTable } from "@lrkit/weighted/src/types";
import { DAY } from "../constants";

const now = new Date();

const nowString = now.toISOString();

const nowTime = now.getTime();

const App = () => {
  const [weightedHeaders, setWeightedHeaders] = useState<WeightedTable<string>[]>([]);

  useEffect(() => {
    const firstVisitString = localStorage.getItem("firstVisit") ?? nowString;

    const firstVisitTime = new Date(firstVisitString).getTime();

    const weightedHeaders = getWeightedHeaders({
      isRecurringVisitor: nowTime - firstVisitTime > DAY,
    });

    setWeightedHeaders(weightedHeaders);
  }, []);

  return <MainApp weightedHeaders={weightedHeaders} />;
};

export default App;
