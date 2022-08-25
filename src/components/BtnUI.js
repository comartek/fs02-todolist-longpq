let BtnUI = (props) => {
  let { text, action } = props;

  return (
    <button
      className="hover:bg-red-400 hover:text-white text-red-400 w-full p-3 mt-3 rounded-md border-1 border border-red-400"
      onClick={action}
    >
      {text}
    </button>
  );
};

export default BtnUI;
