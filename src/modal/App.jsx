import UserCard from "./ExamCard";
import Modal from "./Modal";
import { useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "./user.service";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../main";

const App = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [data, setData] = useState({ name: "", surname: "" });
  const [bookingId, setBookingId] = useState(null);

  const getUser = useQuery(["users"], {
    queryFn: getUsers,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const addUser = useMutation({
    mutationFn: (data) => createUser(data),
  });

  const deleteUserData = useMutation({
    mutationFn: (id) => deleteUser(id),
  });

  const editUser = useMutation({
    mutationFn: (data) => updateUser(bookingId, data),
  });

  const deleteFormHandler = (id) => {
    deleteUserData.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
      },
    });
  };

  const addFormHandler = (e) => {
    e.preventDefault();
    addUser.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        setOpenAddModal(false);
        setData({ name: "", surname: "" });
      },
    });
  };

  const updateFormHandler = (e) => {
    e.preventDefault();
    editUser.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        setOpenUpdateModal(false);
        setData({ name: "", surname: "" });
      },
    });
  };

  return (
    <>
      {/* add modal */}
      <Modal
        open={openAddModal}
        setOpenModal={setOpenAddModal}
        type={"CREATE"}
        data={data}
        setData={setData}
        createOrUpdateHandler={addFormHandler}
      />

      {/* update modal */}
      <Modal
        open={openUpdateModal}
        setOpenModal={setOpenUpdateModal}
        type={"UPDATE"}
        data={data}
        setData={setData}
        createOrUpdateHandler={updateFormHandler}
      />

      <div className="flex flex-col gap-5 px-44 pt-8">
        {/* add user */}
        <div className="flex justify-end">
          <span
            onClick={() => setOpenAddModal(true)}
            className="bg-blue-600 px-4 py-[6px] rounded-sm text-white cursor-pointer"
          >
            + add user
          </span>
        </div>

        {/* user card */}
        <div className="flex flex-col gap-7">
          <div className="grid grid-flow-row grid-cols-5 gap-2">
            {getUser.error?.response.status === 404 ? (
              <h1>no any data</h1>
            ) : (
              getUser.data?.data?.data?.map((data) => {
                return (
                  <UserCard
                    key={data.id}
                    {...data}
                    setOpenModal={setOpenUpdateModal}
                    setData={setData}
                    setBookingId={setBookingId}
                    deleteFormHandler={deleteFormHandler}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
