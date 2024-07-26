import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const Input: React.FC<{
  inputType: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ inputType, onChange }) => {
  return (
    <div className="w-11/12 flex my-2 justify-center">
      <div className="bg-green-600 px-1 mt-[1.5rem]">
        {inputType == 'email' ? (
          <FaUser className="text-2xl text-white mt-2" />
        ) : (
          <FaLock className="text-xl text-white mt-2" />
        )}
      </div>
      <div className="w-10/12">
        <label htmlFor={inputType} className="text-green-500 font-bold ">
          {inputType.charAt(0).toUpperCase() + inputType.slice(1)}
        </label>
        <input
          type={
            inputType == 'username'
              ? 'text'
              : inputType === 'Confirm Password'
              ? 'password'
              : inputType
          }
          name={inputType}
          id={inputType}
          placeholder={inputType}
          onChange={onChange}
          className="w-full px-2 pb-1 pt-2 text-slate-500 text-lg  bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-600 "
        />
      </div>
    </div>
  );
};

export default Input;
