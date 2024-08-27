import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import {
  HiEllipsisVertical,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";
import Menus from "../../ui/Menus";

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
    <Table.Row>
      <Img src={image} alt="cabin image" />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      {/* 1.首先要在table body添加Menus，因为要对整个表格提供state，才能验证哪一个下拉菜单打开了 */}
      {/* 2.需要在每一个CabinItem提供Modal，要给这一行提供state，并且来检测这一个CabinItem是哪个窗口（编辑还是删除）打开了 */}
      <Modal>
        {/* Menus.Menu只提供样式 */}
        <Menus.Menu>
          {/* 这里的Menus.open一旦点击，就可以把id传给table那边的context provider，并且获取按钮的位置，保证下拉菜单的出现位置是正确 */}
          <Menus.Open openCode={id}>
            <HiEllipsisVertical />
          </Menus.Open>
          {/* 下拉菜提供验证，给菜单提供位置，提供点击外部关闭的功能。如果验证正确，显示菜单 */}
          <Menus.Window verifyCode={id}>
            <li>
              {/* Menus.Button的功能使菜单中的任意按钮点击后，菜单都会关闭，并且为那种一点击就执行的按钮提供功能 */}
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleClickDuplicate}
                disabled={isCreating}
              >
                Duplicate
              </Menus.Button>
            </li>
            <li>
              {/* Modal.Open的功能是提供验证哪个弹窗要打开（Delete还是Edit），并且让children带onClick(openCode)的功能 */}
              <Modal.Open openCode="edit">
                {/* 这里不需要为Button提供onClick props，因为modal.open给他提供了onClick(openCode)的功能 */}
                <Menus.Button icon={<HiPencil />} disabled={isDeleting}>
                  Edit
                </Menus.Button>
              </Modal.Open>
            </li>
            <li>
              <Modal.Open openCode="delete">
                <Menus.Button icon={<HiTrash />} disabled={isDeleting}>
                  Delete
                </Menus.Button>
              </Modal.Open>
            </li>
          </Menus.Window>
        </Menus.Menu>

        <Modal.Window verifyCode="edit">
          <CreateCabinForm cabin={cabin} id={id} />
        </Modal.Window>

        <Modal.Window verifyCode="delete">
          <ConfirmDelete
            resourceName={name}
            onConfirm={handleClickDelete}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default CabinItem;
