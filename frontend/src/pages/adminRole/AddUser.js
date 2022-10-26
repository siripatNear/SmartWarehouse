import React, { useEffect, useState } from "react";
//form
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
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import CustomButton from "../../components/CustomButton";
import { CustomAlertDialog } from "../../components/AlertDialog";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { onAddUser, onGetAddUserPage } from "../../api/UserManagement";
import { useLocation, useNavigate } from "react-router-dom";
import { isNil } from "lodash";
import { IoIosArrowBack } from "react-icons/io";
//api
// import { onAddUser, onGetAddUserPage } from "../../api/data";

export const roles = [
  { value: "Operator", label: "Operator" },
  { value: "Forklift", label: "Forklift" },
  { value: "Admin", label: "Admin" },
];

//check password and confirm password
const schema = yup
  .object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    user_id: yup.string().required(),
    role: yup
      .object({
        value: yup.string().required(),
        label: yup.string().required(),
      })
      .required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
  })
  .required();

export default function AddUser() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { state } = useLocation();

  //* protect route from another role----------------------
  // const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);
  const navigate = useNavigate();

  const protectedRoute = async () => {
    try {
      const { data } = await onGetAddUserPage();
      setLoading(false);
      console.log(data);
    } catch (error) {
      setProtectedData(error.response.data);
    }
  };

  useEffect(() => {
    protectedRoute();
  }, []);

  //* popup
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: state?.first_name,
      last_name: state?.last_name,
      role: isNil(state) ? null : { value: state?.role, label: state?.role },
      user_id: state?.user_id,
    },
  });

  const onOpenDialog = async () => {
    const pass = await trigger();
    if (pass) {
      onOpen();
    }
  };

  const onSubmit = async (values) => {
    try {
      const { data } = await onAddUser({ ...values, role: values.role.value });
      setError("");
      setSuccess(data.message);
      onClose(); // close popup window
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
      onClose(); // close popup window
    }
    reset(); //reset form
  };

  return (
    <>
      <Button
        leftIcon={<IoIosArrowBack />}
        margin={"25px"}
        colorScheme="linkedin"
        variant="outline"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Flex minH={"83vh"} align={"center"} justify={"center"}>
        <Stack spacing={5} py={30} px={15}>
          <Stack>
            <Heading fontSize={"4xl"}>
              {!isNil(state) ? "Edit User" : "Add User"}
            </Heading>
          </Stack>
          <Box borderRadius="15px" bgColor={"white"} boxShadow={"lg"} p={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomAlertDialog
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={handleSubmit(onSubmit)}
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
                    Name : {getValues().first_name} {getValues().last_name}
                  </Text>
                  <Text fontSize="xl">User ID : {getValues().user_id} </Text>
                  <Text fontSize="xl">Role : {getValues().role?.value} </Text>
                </VStack>
              />
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
                        isDisabled={!isNil(state?.user_id)}
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
                        defaultValue={null}
                        name="role"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onChange={field.onChange}
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
                    onOpen={onOpenDialog}
                    buttonName="Save"
                    buttonColor="whatsapp"
                    buttonSize="lg"
                    disabledSubmit
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
