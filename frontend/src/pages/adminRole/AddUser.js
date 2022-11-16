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
import { IoIosArrowBack } from "react-icons/io";
import { isNil } from "lodash";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomAlertDialog } from "../../components/AlertDialog";
import CustomButton from "../../components/CustomButton";
//api
import { onGetAddUserPage } from "../../api/data";
import { api, queryClient } from "../../lib/query";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user";

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
  const { state } = useLocation();

  //* protect route from another role----------------------
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

  //* add user from api
  const {
    mutate: addUser,
    isLoading: isLoadingAddUser,
    data,
    error,
  } = useMutation(
    (addUserData) =>
      api.post("/add-user", { ...addUserData, role: addUserData.role.value }),
    {
      onSuccess() {
        onClose();
        queryClient.invalidateQueries(["/manage-users"]); //update ui
        navigate("/manage-users");
      },
    }
  );

  //* edit user from api
  const { mutate: editUser, isLoading } = useMutation(
    (v) => api.put(`/edit-user/${v.user_id}`, { ...v, role: v.role.value }),
    {
      onSuccess() {
        onClose();
        queryClient.invalidateQueries(["/manage-users"]); //update ui
        navigate("/manage-users");
      },
    }
  );

  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (user.role === "Forklift") {
      navigate("/picking-order-list");
    }
    if (user.role === "Operator") {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <>
      <Button
        leftIcon={<IoIosArrowBack />}
        margin={"25px"}
        colorScheme="linkedin"
        variant="outline"
        onClick={() => navigate("/manage-users")} //back to history
      >
        Back
      </Button>

      <Flex minH={"83vh"} align={"center"} justify={"center"}>
        <Stack spacing={5} py={30} px={15}>
          <Stack>
            <Heading fontSize={"4xl"}>
              {isNil(state) ? "Add User" : "Edit User"}
            </Heading>
          </Stack>
          <Box borderRadius="15px" boxShadow={"lg"} p={8}>
            <form>
              <CustomAlertDialog
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={handleSubmit((v) => {
                  if (isNil(state)) {
                    addUser(v);
                  } else {
                    editUser(v);
                  }
                })}
                isLoading={isLoadingAddUser || isLoading}
                HearderFsize="2xl"
                LbuttonPopup="Cancle"
                RbuttonPopup="Confirm"
                ColorRbuttonPopup="whatsapp"
                textHeader=<HStack>
                  <font> Confirm to </font>
                  <font color="green"> {isNil(state) ? "Add" : "Edit"} </font>
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

                <div style={{ color: "red", margin: "10px 0" }}>
                  {error?.response.data.errors[0].msg}
                </div>
                <div style={{ color: "green", margin: "10px 0" }}>
                  {data?.message}
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
