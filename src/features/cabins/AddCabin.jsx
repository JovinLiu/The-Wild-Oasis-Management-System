import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "../../features/cabins/CreateCabinForm";

function AddCabin() {
  return (
    //compound component
    <Modal>
      {/* 提供按钮 验证码 */}
      <div>
        <Modal.Open openCode="cabin-form">
          <Button>Create a Cabin</Button>
        </Modal.Open>
      </div>
      {/* 窗口，验证码 */}
      <Modal.Window verifyCode="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
