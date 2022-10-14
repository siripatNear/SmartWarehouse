import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  VStack,
  useDisclosure,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import CustomButton from "../../components/CustomButton";
import { CustomAlertDialog } from "../../components/AlertDialog";
//api
import { onAddUser } from "../../api/auth";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const roles = [
  { value: "Operator", label: "Operator" },
  { value: "Forklift", label: "Forklift" },
  { value: "Admin", label: "Admin" },
];

const schema = yup
  .object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    user_id: yup.string().required(),
    role: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
  })
  .required();

export default function AddUser() {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    user_id: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onConfirm = async (e) => {
    console.log(values);
    try {
      const { data } = await onAddUser(values);
      setError("");
      setSuccess(data.message);
      setValues({
        first_name: "",
        last_name: "",
        user_id: "",
        role: "",
        password: "",
        confirmPassword: "",
      });
      onClose(); // close popup window
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
      onClose(); // close popup window
    }
  };

  const onSubmit = async (x) => {
    setValues(x);
    onOpen(); //call popup
  };

  // *Password-----------------------------------------
  // const [password, setPassword] = useState("");
  // const [confirmpassword, setConfirmPassword] = useState("");
  // const [setPassword] = useState("");
  // const [setConfirmPassword] = useState("");

  //-----------------------------------------------
  //* popup

  const { isOpen, onOpen, onClose } = useDisclosure();
  //--------------------------------------------------
  // show password
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const handleShowConfirmClick = () =>
    setShowConfirmPassword(!showConfirmPassword);

  //----------------------------------------------------

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        HearderFsize="2xl"
        LbuttonPopup="Cancle"
        RbuttonPopup="Confirm"
        ColorRbuttonPopup="whatsapp"
        textHeader=<HStack>
          <font> Confirm to </font>
          <font color="green"> add </font>
          <font> this user </font>
        </HStack>
        textBody=<VStack alignItems="left">
          <Text fontSize="xl">
            Name : {values.first_name} {values.last_name}
          </Text>
          <Text fontSize="xl">User ID : {values.user_id} </Text>
          <Text fontSize="xl">Role : {values.role} </Text>
        </VStack>
      />

      <Flex minH={"93vh"} align={"center"} justify={"center"} bgColor={"white"}>
        <Stack spacing={5} py={30} px={15}>
          <Stack>
            <Heading fontSize={"4xl"}>Add User</Heading>
          </Stack>
          <Box borderRadius="15px" bgColor={"white"} boxShadow={"lg"} p={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <HStack>
                  <Box width="100%">
                    <FormControl id="firstName" isInvalid={errors.first_name}>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="First Name"
                        {...register("first_name")}
                      />
                    </FormControl>
                  </Box>
                  <Box width="100%">
                    <FormControl id="lastName" isInvalid={errors.last_name}>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        {...register("last_name")}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <HStack>
                  <Box width="100%">
                    <FormControl id="userid" isInvalid={errors.user_id}>
                      <FormLabel>User ID</FormLabel>
                      <Input
                        type="text"
                        placeholder="User ID"
                        {...register("user_id")}
                      />
                    </FormControl>
                  </Box>
                  <Box width="100%" zIndex={2}>
                    <FormControl isInvalid={errors.role}>
                      <FormLabel>Role</FormLabel>
                      <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onChange={(v) => field.onChange(v.value)}
                            placeholder="Role"
                            closeMenuOnSelect={true}
                            options={roles}
                          />
                        )}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <HStack>
                  <Box>
                    <FormControl isInvalid={errors.password}>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...register("password")}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={handleShowClick}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl isInvalid={errors.confirmPassword}>
                      <FormLabel>Confirm Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          {...register("confirmPassword")}
                        />
                        <InputRightElement zIndex={1} width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={handleShowConfirmClick}
                          >
                            {showConfirmPassword ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </Box>
                </HStack>

                {/* //TODO: manage error and success style */}

                <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
                <div style={{ color: "green", margin: "10px 0" }}>
                  {success}
                </div>

                {/* ------------------------------------ */}

                <Stack spacing={10} pt={2}>
                  <CustomButton
                    buttonName="Save"
                    buttonColor="whatsapp"
                    buttonSize="lg"
                  />
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
