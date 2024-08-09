import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../store/thunkFunctions'

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: 'onChange' })
  const dispatch = useDispatch();
  const onSubmit = ({ email, password, name }) => {
    const body = {
      email,
      password,
      name
    }
    dispatch(registerUser(body));
    reset();
  }
  const userEmail = {
    required: "This is a required field."
  }
  const userName = {
    required: "This is a required field."
  }
  const userPassword = {
    required: 'This is a required field.',
    minLength: {
      value: 6,
      message: "Minimum of 6 letters."
    }
  }

  return (
    <section className='flex flex-col justify-center mt-20 max-w-[400px] m-auto'>
      <div className='p-6 bg-white rounded-md shadow-md'>
        <h1 className='text-3xl font-semibold text-center'>
          REGISTER
        </h1>
        <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-2'>
            <label
              htmlFor='email'
              className='text-sm font-semibold text-black'
            >Email</label>
            <input
              type='email'
              id="email"
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
              {...register('email', userEmail)}
            />
            {
              errors?.email &&
              <div>
                <span className='text-red-500'>
                  {errors.email.message}
                </span>
              </div>
            }
          </div>
          <div className='mb-2'>
            <label
              htmlFor='name'
              className='text-sm font-semibold text-black'
            >Name</label>
            <input
              type='text'
              id="name"
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
              {...register('name', userName)}
            />
            {
              errors?.name &&
              <div>
                <span className='text-red-500'>
                  {errors.name.message}
                </span>
              </div>
            }
          </div>
          <div className='mb-2'>
            <label
              htmlFor='password'
              className='text-sm font-semibold text-black'
            >Password</label>
            <input
              type='password'
              id="password"
              className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
              {...register('password', userPassword)}
            />
            {
              errors?.password &&
              <div>
                <span className='text-red-500'>
                  {errors.password.message}
                </span>
              </div>
            }
          </div>
          <div className='mt-6'>
            <button 
            type='submit' 
            style={{
              borderRadius: '5px',
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              padding: '5px',
              fontSize: '18px',
              width: '100%',
             }}
            >
              Register
            </button>
          </div>
          <p className='mt-8 text-xs font-light text-center text-black'>
            Already member?{" "}
            <a
              href='/login'
              className='font-medium hover:underline'
            >
              LOGIN
            </a>
          </p>
        </form>
      </div>
    </section>
  )
}

export default RegisterPage