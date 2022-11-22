const FormInput = (props) => {
  const { show, errorMessage, onChange, id, ...inputProps } = props;

  return (
    <div className="relative flex w-full mb-5 home md:w-72">
      <input {...inputProps} onChange={onChange} type={show ? props.type : 'text'} className='inputs' title={errorMessage} />
    </div>
  );
};

export default FormInput;