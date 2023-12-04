"use client";

import CardStatistic from "@/components/CardStatistic/CardStatistic";
import React from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { isMoreThanOneMonthApart } from "@/resources/utils/isMoreThanOneMonthApart";
import { isDateWithinCurrentMonth } from "@/resources/utils/isDateWithinCurrentMonth";
import { money } from "@/resources/helpers/money";
import { FaUserCircle } from "react-icons/fa";
import { telephoneHelper } from "@/resources/helpers/telephoneHelper";
import "./page.scss";

export default function Home() {
  const { clients } = React.useContext(UserContext) || {};
  const [allMoney, setAllMoney] = React.useState(null);
  const [defaulters, setDefaulters] = React.useState(null);
  const [monthSubscribers, setMonthSubscribers] = React.useState(null);

  const getAllMoney = React.useCallback((clients) => {
    const clientsValues = clients.map((client) => +client.plan_value);
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
        <div className="home__statistic d-flex gap-4 align-items-center">
          <CardStatistic
            type="clients"
            data={{ value: clients.length, text: "Inscritos" }}
            href="/clients"
          />
          <CardStatistic
            type="money"
            data={{ value: allMoney, text: "Lucro estimado" }}
            href="/finances"
          />
          <CardStatistic
            type="monthSubscribes"
            data={{
              value: monthSubscribers?.length,
              text: "Inscritos este mês",
            }}
          />
          <CardStatistic
            type="late"
            data={{ value: defaulters?.length, text: "Inadimplentes" }}
            href="/defaulters"
          />
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-xl-6">
            <h4 className="my-5">Inadimplentes</h4>
            <div className="home__table__container">
              <table className="table home__table">
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Contato</th>
                  </tr>
                </thead>
                <tbody>
                  {defaulters &&
                    defaulters.map((client) => {
                      return (
                        <tr key={client.id} className="home__table__defaulter">
                          <td>{client.name}</td>
                          <td>
                            <Link
                              target="_blank"
                              href={`https://wa.me/55${client.telephone}`}
                              title={`Falar com este cliente no Whatsapp`}
                            >
                              {telephoneHelper.mask(client.telephone)}
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
}
