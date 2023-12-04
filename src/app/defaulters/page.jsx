"use client";

import React from "react";
import ModalClient from "@/components/ModalClient/ModalClient";
import ModalClientPayment from "@/components/ModalClient/ModalClientPayment";
import ModalClientDelete from "@/components/ModalClient/ModalClientDelete";
import { isMoreThanOneMonthApart } from "@/resources/utils/isMoreThanOneMonthApart";
import { AiOutlineUserAdd, AiFillDelete } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { MdEdit, MdAttachMoney } from "react-icons/md";
import { UserContext } from "@/context/UserContext";
import "./page.scss";

const Page = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalEdit, setModalEdit] = React.useState(null);
  const [showModalPayment, setShowModalPayment] = React.useState(false);
  const [modalEditPayment, setModalEditPayment] = React.useState(null);
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [modalIdDelete, setModalIdDelete] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
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

  React.useEffect(() => {
    if (searchTerm.length >= 3) {
      const counter = clients.filter((client) => {
        const termNormalized = searchTerm.toLocaleLowerCase();
        const nameNormalized = client.name.toLocaleLowerCase();
        return nameNormalized.includes(termNormalized);
      }).length;
    }
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
          <table className="clients__table">
            <thead>
              <tr>
                <th scope="col">Nome</th>
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
                    if(isDefaulter)
                    return (
                      <tr
                        key={client.id}
                        className={`align-middle ${
                          isDefaulter ? "clients__table__defaulter" : ""
                        }`}
                      >
                        <td>{client.name}</td>
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
