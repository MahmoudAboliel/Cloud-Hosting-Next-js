import LoginForm from '@/components/forms/LoginForm';

const Login = async () => {

  return (
    <section className='h-[calc(100vh-150px)] container m-auto px-7 flex items-center justify-center'>
      <div className='bg-white w-full md:w-2/3 rounded-xl p-5'>
        <h1 className='text-center text-3xl font-bold border-b-2 border-gray-700 pb-3 mb-3 relative'>
          <span className='max-sm:left-0 absolute top-[18px] left-1/4 bg-gray-700 w-16 h-[2px]' />
          <span className='max-sm:right-0 absolute top-[18px] right-1/4 bg-gray-700 w-16 h-[2px]' />
          Login
        </h1>
        <LoginForm />
      </div>
    </section>
  );
}

export default Login;