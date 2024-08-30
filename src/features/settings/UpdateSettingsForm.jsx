import toast from "react-hot-toast";

import Form from "../../ui/Form";
import FormItem from "../../ui/FormItem";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";
import Uploader from "../../data/Uploader";
import styled from "styled-components";

const Container = styled.div`
  margin-left: auto;
  width: 12rem;
  opacity: 0%;
  position: relative;
`;

function UpdateSettingsForm() {
  const {
    settings: {
      breakfastPrice,
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
    },
    error,
    isLoading,
  } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error(error.message);
  }

  //[field]动态检索对象的key
  function handleSettingChange(value, field) {
    updateSetting({ [field]: value });
  }

  return (
    <>
      <Form type="regular">
        <FormItem label="Minimum nights/booking">
          <Input
            type="number"
            id="min-nights"
            disabled={isUpdating}
            defaultValue={minBookingLength}
            onBlur={(e) => {
              handleSettingChange(e.target.value, "minBookingLength");
            }}
          />
        </FormItem>
        <FormItem label="Maximum nights/booking">
          <Input
            type="number"
            id="max-nights"
            disabled={isUpdating}
            defaultValue={maxBookingLength}
            onBlur={(e) => {
              handleSettingChange(e.target.value, "maxBookingLength");
            }}
          />
        </FormItem>
        <FormItem label="Maximum guests/booking">
          <Input
            type="number"
            id="max-guests"
            disabled={isUpdating}
            defaultValue={maxGuestsPerBooking}
            onBlur={(e) => {
              handleSettingChange(e.target.value, "maxGuestsPerBooking");
            }}
          />
        </FormItem>
        <FormItem label="Breakfast price">
          <Input
            type="number"
            id="breakfast-price"
            disabled={isUpdating}
            defaultValue={breakfastPrice}
            onBlur={(e) => {
              handleSettingChange(e.target.value, "breakfastPrice");
            }}
          />
        </FormItem>
      </Form>
      <Container>
        <Uploader />
      </Container>
    </>
  );
}

export default UpdateSettingsForm;
