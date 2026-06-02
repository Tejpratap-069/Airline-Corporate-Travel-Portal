const Modal = ({
  isOpen,
  onClose,
  children,
}) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

      <div className="bg-white rounded-lg p-6 w-[500px]">

        {children}

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>

      </div>

    </div>
  );
};

export default Modal;