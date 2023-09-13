/* eslint-disable react/prop-types */

const UserCard = ({
  setOpenModal,
  setData,
  setBookingId,
  deleteFormHandler,
  ...data
}) => {
  const updateFormHandler = (data) => {
    setData({
      name: data.name,
      surname: data.surname,
    });
    setBookingId(data.id);
    setOpenModal(true);
  };

  return (
    <>
      <div className="border px-5 py-3 border-black flex flex-col gap-1">
        <h1>
          name: <b>{data.name}</b>
        </h1>
        <h1>
          surname: <b>{data.surname}</b>
        </h1>
        <div className="flex gap-2">
          <span
            onClick={() => updateFormHandler(data)}
            className="text-blue-600 font-semibold cursor-pointer"
          >
            edit
          </span>
          <span
            className="text-[crimson] font-semibold cursor-pointer"
            onClick={() => deleteFormHandler(data.id)}
          >
            delete
          </span>
        </div>
      </div>
    </>
  );
};

export default UserCard;
