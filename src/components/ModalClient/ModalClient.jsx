import React from "react";
import Modal from "react-modal";
import InputMask from "react-input-mask";
import { getCurrentDate } from "@/resources/utils/getCurrentDate";
import { UserContext } from "@/context/UserContext";
import { telephoneHelper } from "@/resources/helpers/telephoneHelper";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ClientsServices } from "@/services/modules/clients";
import "@/styles/ModalClient/ModalClient.scss";

Modal.setAppElement("body");

const ModalClient = ({ openModal, editId, onClose }) => {
  const [name, setName] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [planValue, setPlanValue] = React.useState("");
  const [dateI, setDateI] = React.useState("");
  const [pgList, setPageList] = React.useState("");
  const { UUID, setLoading, getAllClients } = React.useContext(UserContext);

  const getClientDataById = React.useCallback(async (clientId, UUID) => {
    setLoading(true);
    try {
      const clientData = await ClientsServices.getClientById(clientId, UUID);
      if (clientData) {
        const { name, street, telephone, plan_value, date_i, pg_list } =
          clientData;

        setName(name);
        setStreet(street);
        setTelephone(telephone);
        setPlanValue(plan_value);
        setDateI(date_i);
        setPageList(pg_list);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  const clearFields = React.useCallback(() => {
    setName("");
    setStreet("");
    setTelephone("");
    setPlanValue("");
    setDateI("");
    setPageList("");
  }, []);

  async function handleCreateClient(body, UUID) {
    setLoading(true);
    try {
      const createClient = await ClientsServices.createClient(body, UUID);
    } catch (error) {
    } finally {
      await getAllClients();
      handleClosedModal();
      setLoading(false);
    }
  }

  async function handleUpdateClient(clientId, body, UUID) {
    setLoading(true);
    try {
      const updateClient = await ClientsServices.updateClientById(
        clientId,
        body,
        UUID
      );
    } catch (error) {
    } finally {
      await getAllClients();
      handleClosedModal();
      setLoading(false);
    }
  }

  const handleClosedModal = () => {
    clearFields();
    onClose();
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (editId) {
      const body = {
        name,
        street,
        telephone: telephoneHelper.unmask(telephone),
        plan_value: planValue,
        date_i: dateI,
        pg_list: pgList,
      };

      handleUpdateClient(editId, body, UUID);
    } else {
      const today = getCurrentDate();
      const body = {
        name,
        street,
        telephone: telephoneHelper.unmask(telephone),
        plan_value: planValue,
        date_i: today,
        pg_list: [today],
      };

      handleCreateClient(body, UUID);
    }
  }

  React.useEffect(() => {
    if (editId) getClientDataById(editId, UUID);
  }, [editId]);

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={handleClosedModal}
      contentLabel="Exemplo de Modal"
      className="modalCustom"
      overlayClassName="overlayCustom"
    >
      <div className="modalClient">
        <div className="modalClient__header position-relative">
          <h2 className="m-0">
            {editId ? "Editar aluno" : "Cadastro de aluno"}
          </h2>
          <button
            onClick={handleClosedModal}
            className="modalClient__close position-absolute"
            role="button"
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <div className="modalClient__content">
          <form onSubmit={(e) => handleSubmit(e)} className="modalClient__form">
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="name" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Francisco Joaquin da Silva"
                  required
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="telephone" className="form-label">
                  Contato
                </label>
                <InputMask
                  mask="(99) 99999-9999"
                  className="form-control"
                  type="text"
                  placeholder="(99) 99999-9999"
                  required
                  value={telephone}
                  onChange={({ target }) => setTelephone(target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-3">
                <label htmlFor="street" className="form-label">
                  Endereço
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  placeholder="Rua São Francisco - 108"
                  required
                  value={street}
                  onChange={({ target }) => setStreet(target.value)}
                />
              </div>

              <div className="col-12 mb-3">
                <label htmlFor="planValue" className="form-label">
                  Valor do plano
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="planValue"
                  placeholder="65"
                  value={planValue}
                  required
                  onChange={({ target }) => setPlanValue(target.value)}
                />
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center align-items-center mx-auto">
              <button
                type="submit"
                className="modalClient__submit btn btn-primary  mt-4 w-100"
              >
                {editId ? "Salvar alterações" : "Cadastrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalClient;
