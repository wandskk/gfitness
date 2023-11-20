import React from "react";
import Modal from "react-modal";
import { MdAttachMoney } from "react-icons/md";
import { UserContext } from "@/context/UserContext";
import { AiOutlineCloseCircle, AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { ClientsServices } from "@/services/modules/clients";
import "@/styles/ModalClient/ModalClient.scss";

Modal.setAppElement("body");

const ModalClientPayment = ({ openModal, editId, onClose }) => {
  const [clientData, setClientData] = React.useState(null);
  const [editPayment, setEditPayment] = React.useState(null);
  const [deletePayment, setDeletePayment] = React.useState(null);
  const [pgList, setPgList] = React.useState(null);
  const [paymentDate, setPaymentDate] = React.useState("");
  const { UUID, setLoading, getAllClients } = React.useContext(UserContext);

  const getClientDataById = React.useCallback(async (clientId, UUID) => {
    setLoading(true);
    try {
      const clientData = await ClientsServices.getClientById(clientId, UUID);
      if (clientData) {
        setClientData(clientData);
        setPgList(clientData.pg_list);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDateChange = (event) => {
    let input = event.target.value.replace(/\D/g, "");

    if (input.length <= 2) {
      setPaymentDate(input);
    } else if (input.length <= 4) {
      setPaymentDate(`${input.slice(0, 2)}/${input.slice(2)}`);
    } else {
      setPaymentDate(
        `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4, 8)}`
      );
    }
  };

  async function handleAddNewPayment(newPaymentDate) {
    if (newPaymentDate.length === 10) {
      const newArrayPgList = [...pgList, newPaymentDate];
      try {
        const body = {
          ...clientData,
          pg_list: newArrayPgList,
        };
        const savePgList = await ClientsServices.updateClientById(
          editId,
          body,
          UUID
        );
        getAllClients();
        setPgList(newArrayPgList);
      } catch (error) {
      } finally {
        setPaymentDate("");
      }
    }
  }

  async function handleDeletePayment(paymentIndex) {
      const newArrayPgList = pgList.filter((payment, index) => index !== paymentIndex);
      try {
        const body = {
          ...clientData,
          pg_list: newArrayPgList,
        };
        const savePgList = await ClientsServices.updateClientById(
          editId,
          body,
          UUID
        );
        getAllClients();
        setPgList(newArrayPgList);
      } catch (error) {
      } finally {
        setPaymentDate("");
      }
    }
  

  React.useEffect(() => {
    if (editId) getClientDataById(editId, UUID);
  }, [editId]);

  if (clientData)
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
            <h2 className="m-0">Pagamentos do aluno</h2>
            <button
              onClick={onClose}
              className="modalClient__close position-absolute"
            >
              <AiOutlineCloseCircle />
            </button>

            <div className="d-flex justify-content-between mt-4">
              <p className="m-0">Nome: {clientData.name}</p>
              <div className="d-flex flex-column align-items-end">
                <small className="m-0">
                  Inscrito deste: {clientData.date_i}
                </small>
                <small className="m-0">
                  Ultimo pagamento: {pgList[pgList.length - 1]}
                </small>
              </div>
            </div>

            <div className="mt-4 d-flex gap-4">
              <input
                type="text"
                className="form-control w-100"
                placeholder="dd/mm/yyyy"
                value={paymentDate}
                onChange={(e) => handleDateChange(e)}
              />
              <button
                className="btn btn-success w-100"
                onClick={() => handleAddNewPayment(paymentDate)}
              >
                <MdAttachMoney />
                <small>Adicionar novo pagamento</small>
              </button>
            </div>
          </div>
          <div className="modalClient__content">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Data de pagamento</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pgList &&
                  pgList.slice(-5).map((pg, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{pg}</td>
                      <td>
                        <button
                          className="btn btn-link text-danger p-0"
                          onClick={() => handleDeletePayment(index)}
                        >
                          <AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    );
};

export default ModalClientPayment;
