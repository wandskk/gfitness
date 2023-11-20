import React from "react";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { UserContext } from "@/context/UserContext";
import { ClientsServices } from "@/services/modules/clients";
import "@/styles/ModalClient/ModalClient.scss";

Modal.setAppElement("body");

const ModalClientDelete = ({ openModal, deleteId, onClose }) => {
  const [clientData, setClientData] = React.useState(null);
  const { UUID, getAllClients, setLoading } = React.useContext(UserContext);

  const getClientDataById = React.useCallback(async (clientId, UUID) => {
    setLoading(true);
    try {
      const clientData = await ClientsServices.getClientById(clientId, UUID);
      setClientData(clientData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  async function handleDeleteClient(clientId) {
    setLoading(true);
    try {
      const deleteClient = await ClientsServices.deleteClientById(
        clientId,
        UUID
      );
      getAllClients();
      onClose();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (deleteId) getClientDataById(deleteId, UUID);
  }, [deleteId]);

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={onClose}
      contentLabel="Exemplo de Modal"
      className="modalCustom"
      overlayClassName="overlayCustom"
    >
      <div className="modalClient">
        <div className="modalClient__header position-relative">
          <h2 className="m-0 text-center">Apagar aluno</h2>
          <button
            onClick={onClose}
            className="modalClient__close position-absolute"
            role="button"
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <div className="modalClient__content d-flex flex-column justify-content-center gap-4">
          <h4 className="text-center">
            Tem certeza que gostaria de deletar o aluno?
          </h4>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col" className="w-50">
                  Nome
                </th>
                <th scope="col" className="w-50">Data de inscrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{clientData?.id}</th>
                <td>{clientData?.name}</td>
                <td>{clientData?.date_i}</td>
              </tr>
            </tbody>
          </table>

          <div className="d-flex justify-content-center gap-4">
            <button className="btn btn-success w-100" onClick={onClose}>
              Cancelar
            </button>
            <button
              className="btn btn-danger w-100"
              onClick={() => handleDeleteClient(deleteId)}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalClientDelete;
