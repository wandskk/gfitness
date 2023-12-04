"use client";

import CardStatistic from "@/components/CardStatistic/CardStatistic";
import React from "react";
import { UserContext } from "@/context/UserContext";
import { isMoreThanOneMonthApart } from "@/resources/utils/isMoreThanOneMonthApart";
import { isDateWithinCurrentMonth } from "@/resources/utils/isDateWithinCurrentMonth";
import { money } from "@/resources/helpers/money";
import "./page.scss";

export default function Home() {
  const { clients } = React.useContext(UserContext) || {};
  const [allMoney, setAllMoney] = React.useState(null);
  const [defaulters, setDefaulters] = React.useState(null);
  const [monthSubscribers, setMonthSubscribers] = React.useState(null);

  const getAllMoney = React.useCallback((clients) => {
    const clientsValues = clients
      .filter((client) => {
        const pgList = client.pg_list;
        if (pgList && pgList.length > 0)
          return !isMoreThanOneMonthApart(pgList[pgList.length - 1]);
      })
      .map((client) => +client.plan_value);
    const sum = money.sumAll(clientsValues);

    setAllMoney(money.mask(sum));
  }, []);

  const getAllDefaulters = React.useCallback((clients) => {
    const allDefaulters = clients.filter((client) => {
      const pgList = client.pg_list;
      if (pgList && pgList.length > 0)
        return isMoreThanOneMonthApart(pgList[pgList.length - 1]);
    });

    setDefaulters(allDefaulters);
  }, []);

  const getCurrentMonthSubscribers = React.useCallback((clients) => {
    const allMonthSubscribers = clients.filter((client) => {
      return isDateWithinCurrentMonth(client.date_i);
    });
    setMonthSubscribers(allMonthSubscribers);
  });

  React.useEffect(() => {
    if (clients) {
      getAllMoney(clients);
      getAllDefaulters(clients);
      getCurrentMonthSubscribers(clients);
    }
  }, [clients]);

  if (clients)
    return (
      <section className="home">
        <div className="home__statistic">
          <CardStatistic
            type="clients"
            data={{ value: clients.length, text: "Inscritos" }}
            href="/clients"
          />
          <CardStatistic
            type="late"
            data={{ value: defaulters?.length, text: "Inadimplentes" }}
            href="/defaulters"
          />
          <CardStatistic
            type="money"
            data={{ value: allMoney, text: "Lucro estimado" }}
          />
          <CardStatistic
            type="monthSubscribes"
            data={{
              value: monthSubscribers?.length,
              text: "Inscritos este mês",
            }}
          />
        </div>
      </section>
    );
}
