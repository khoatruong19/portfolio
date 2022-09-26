import { useForm } from 'react-hook-form';

type FormData = {
  username: string;
  password: string;
};

interface IProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminLoginForm = ({ setIsAuthenticated }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    if (!data.username || !data.password) alert('Please fill in information!');
    else if (
      !(data.username === (process.env.NEXT_PUBLIC_ADMIN_USERNAME as string))
    )
      alert('Wrong username');
    else if (
      !(data.password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string))
    )
      alert('Wrong password');
    else setIsAuthenticated(true);
  });
  return (
    <div className=" w-[500px] p-5 border border-yellowColor/30 rounded-lg">
      <h3 className="text-4xl font-bold text-yellowColor text-center mb-5">
        Admin Login
      </h3>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col space-y-3 ">
          <label htmlFor="" className="fieldLabel">
            Username:
          </label>
          <input {...register('username')} type="text" className="fieldInput" />
        </div>
        <div className="flex flex-col space-y-3 ">
          <label htmlFor="" className="fieldLabel">
            Password:
          </label>
          <input
            {...register('password')}
            type="password"
            className="fieldInput"
          />
        </div>

        <button type="submit" className="submitButton w-full mt-5 ">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
