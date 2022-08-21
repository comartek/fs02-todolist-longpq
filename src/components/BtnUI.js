let BtnUI = (props) => {
  let { text, action } = props;

  return (
    <button className="bg-red-400 w-full p-3 mt-3 rounded-md" onClick={action}>
      <div className="text-white">{text}</div>
    </button>
  );
};

export default BtnUI;
