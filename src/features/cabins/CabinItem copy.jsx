import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinItem({ cabin }) {
  // const [showForm, setShowForm] = useState(false);
  const { id, image, name, maxCapacity, regularPrice, discount, description } =
    cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  function handleClickDelete() {
    deleteCabin(id);
  }

  function handleClickDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image} alt="cabin image" />
        <Cabin>{name}</Cabin>
        <div>{maxCapacity} people</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <span>
          <button disabled={isCreating} onClick={handleClickDuplicate}>
            Duplicate
          </button>

          <Modal>
            <Modal.Open openCode="edit">
              <button disabled={isDeleting}>Edit</button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabin={cabin} id={id} />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open openCode="delete">
              <button disabled={isDeleting}>Delete</button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={name}
                onConfirm={handleClickDelete}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </span>
      </Table.Row>
    </>
  );
}

export default CabinItem;
