import RegisterForm from "@/components/forms/RegisterForm";

const Register = async () => {

  return (
    <section className='h-[calc(100vh-150px)] container m-auto px-7 flex items-center justify-center'>
      <div className='bg-white w-full md:w-2/3 rounded-xl p-5'>
        <h1 className='text-center text-3xl font-bold border-b-2 border-gray-700 pb-3 mb-3 relative'>
          <span className='max-sm:hidden absolute left-0 top-[18px] bg-gray-700 w-16 h-[2px]' />
          <span className='max-sm:hidden absolute right-0 top-[18px] bg-gray-700 w-16 h-[2px]' />
          Create New Account
        </h1>
        <RegisterForm />
      </div>
    </section>
  );
}

export default Register;