/* eslint-disable react/prop-types */

const Modal = ({
  open,
  setOpenModal,
  type,
  data,
  setData,
  createOrUpdateHandler,
}) => {
  const changeInputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 bottom-0 right-0 bg-black opacity-40 ${
          !open && "hidden"
        }`}
        onClick={() => setOpenModal(false)}
      ></div>

      <div
        className={`flex justify-center transition-all ${!open && "hidden"}`}
      >
        {/* Form */}
        <form
          onSubmit={createOrUpdateHandler}
          className={`flex flex-col gap-2 mt-[5%] justify-center fixed max-h-[40vh] min-w-[300px] bg-white p-10 border shadow-2xl `}
        >
          <h1 className="text-center text-[18px] font-medium">
            {type === "CREATE" ? `Add user modal` : "Update user modal"}
          </h1>

          <input
            type="text"
            className="outline-none p-1 border border-black mt-2"
            placeholder="name"
            onChange={changeInputHandler}
            value={data.name}
            name="name"
          />
          <input
            type="text"
            placeholder="surname"
            className="outline-none p-1 border border-black"
            onChange={changeInputHandler}
            value={data.surname}
            name="surname"
          />

          <button
            className="outline-none p-1 bg-blue-600 text-white text-center rounded-sm"
            type="submit"
          >
            {type === "CREATE" ? `add user` : "update user"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Modal;
