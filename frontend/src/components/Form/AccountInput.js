const AccountInput = (props) => {
  const { show, errorMessage, onChange, id, ...inputProps } = props;

  return (

    <div className="relative flex items-center justify-center pt-3 my-2">
      <label className="flex flex-col mr-2 text-right text-black capitalize w-28">{inputProps.name === "confirmPassword" ? "Confirm Password" : inputProps.name}</label>
      <input className='flex flex-col w-48 p-2 shadow-inner bg-gray-50/50' {...inputProps} onChange={onChange} type={show ? props.type : 'text'} title={errorMessage} />
    </div>

  );
};

export default AccountInput;