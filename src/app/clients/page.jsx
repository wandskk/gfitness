"use client";

import React from "react";
import ModalClient from "@/components/ModalClient/ModalClient";
import ModalClientPayment from "@/components/ModalClient/ModalClientPayment";
import ModalClientDelete from "@/components/ModalClient/ModalClientDelete";
import Link from "next/link";
import { isMoreThanOneMonthApart } from "@/resources/utils/isMoreThanOneMonthApart";
import { AiOutlineUserAdd, AiFillDelete } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { MdEdit, MdAttachMoney } from "react-icons/md";
import { UserContext } from "@/context/UserContext";
import { telephoneHelper } from "@/resources/helpers/telephoneHelper";
import "./page.scss";

const Page = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalEdit, setModalEdit] = React.useState(null);
  const [showModalPayment, setShowModalPayment] = React.useState(false);
  const [modalEditPayment, setModalEditPayment] = React.useState(null);
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [modalIdDelete, setModalIdDelete] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [qtdResult, setQtdResult] = React.useState(20);
  const { clients, UUID, getAllClients } = React.useContext(UserContext);

  const handleClosedModal = () => {
    setShowModal(false);
    setModalEdit(null);
  };

  const handleShowModal = (editId) => {
    setShowModal(true);
    if (editId) setModalEdit(editId);
  };

  const handleClosedModalPayment = () => {
    setShowModalPayment(false);
    setModalEditPayment(null);
  };

  const handleShowModalPayment = (editId) => {
    setShowModalPayment(true);
    if (editId) setModalEditPayment(editId);
  };

  const handleClosedModalDelete = () => {
    setShowModalDelete(false);
    setModalIdDelete(null);
  };

  const handleShowModalDelete = (deleteId) => {
    setShowModalDelete(true);
    if (deleteId) setModalIdDelete(deleteId);
  };

  function compareByName(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  }

  React.useEffect(() => {
    if (searchTerm.length >= 3) {
      const counter = clients.filter((client) => {
        const termNormalized = searchTerm.toLocaleLowerCase();
        const nameNormalized = client.name.toLocaleLowerCase();
        return nameNormalized.includes(termNormalized);
      }).length;

      setQtdResult(counter);
      if (counter > 20) setQtdResult(20);
    } else setQtdResult(20);
  }, [searchTerm]);

  if (clients)
    return (
      <section className="clients">
        <ModalClient
          openModal={showModal}
          editId={modalEdit}
          onClose={handleClosedModal}
        />
        <ModalClientPayment
          openModal={showModalPayment}
          editId={modalEditPayment}
          onClose={handleClosedModalPayment}
        />
        <ModalClientDelete
          openModal={showModalDelete}
          deleteId={modalIdDelete}
          onClose={handleClosedModalDelete}
        />
        <header className="clients__header mb-4">
          <button
            className="clients__header__add"
            role="button"
            onClick={() => handleShowModal()}
          >
            <AiOutlineUserAdd />
            Adicionar novo aluno
          </button>
          <div className="clients__header__search">
            <BiSearch />
            <input
              type="text"
              placeholder="Pesquise aqui..."
              value={searchTerm}
              onChange={({ target }) => setSearchTerm(target.value)}
            />
          </div>
        </header>

        <div className="clients__table__container">
          <table className="table clients__table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">Nome</th>
                <th scope="col">Contato</th>
                <th scope="col">Último pagamento</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients &&
                clients
                  .filter((client) => {
                    if (searchTerm.length >= 3) {
                      const termNormalized = searchTerm.toLocaleLowerCase();
                      const nameNormalized = client.name.toLocaleLowerCase();
                      return nameNormalized.includes(termNormalized);
                    } else return client;
                  })
                  .map((client) => {
                    const lastPayment =
                      client.pg_list[client.pg_list.length - 1];
                    const isDefaulter = isMoreThanOneMonthApart(lastPayment);

                    return (
                      <tr
                        key={client.id}
                        className={`align-middle ${
                          isDefaulter ? "clients__table__defaulter" : ""
                        }`}
                      >
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td>
                          <FaUserCircle />
                        </td>
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
                        <td>{client.pg_list[client.pg_list.length - 1]}</td>
                        <td className=" clients__table__actions">
                          <button
                            className="btn btn-link clients__table__actions__payment"
                            onClick={() => handleShowModalPayment(client.id)}
                          >
                            <MdAttachMoney />
                          </button>
                          <button
                            className="btn btn-link clients__table__actions__edit p-0"
                            onClick={() => handleShowModal(client.id)}
                          >
                            <MdEdit />
                          </button>
                          <button
                            className="btn btn-link clients__table__actions__delete p-0"
                            onClick={() => handleShowModalDelete(client.id)}
                          >
                            <AiFillDelete />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </section>
    );
};

export default Page;
