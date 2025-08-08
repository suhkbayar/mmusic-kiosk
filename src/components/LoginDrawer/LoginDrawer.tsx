import { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { BiLock } from 'react-icons/bi';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'flowbite-react';
import Settings from '../Settings';
import useSettings from '../../hooks/useSettings';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(1, 'Password must be at least 1 characters').required('Password is required'),
});

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
}
export default function LoginDrawer(props: Props) {
  const { show, setShow } = props;
  const { error, settings, handleSubmit, loading, data } = useSettings();

  return (
    <div
      className=" inset-0 bg-gray-800 bg-opacity-50  w-full h-screen  absolute top-0 right-1/3  z-50 transition-opacity duration-300 opacity-100 backdrop-blur-sm flex items-center justify-center"
      onClick={() => setShow(!show)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-lg  w-full max-w-xl h-max bg-[#fcfcfc] shadow-lg z-50 transform translate-x-0 transition-transform duration-300 p-4 mx-8`}
      >
        {settings ? (
          <Settings setShow={setShow} data={data} />
        ) : (
          <div className="px-16 pb-8 w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-5 text-black">QMENU</h2>
            <Formik initialValues={{ email: '', password: '' }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="md:w-8/12">
                  <div className="mb-4 w-full">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <div className="px-3 py-2  text-gray-600">
                        <BiUser className="w-5 h-5" />
                      </div>
                      <Field
                        placeholder="Email"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        className="w-full py-2 border-none text-black "
                      />
                    </div>
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-4 w-full">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <div className="px-3 py-2  text-gray-600">
                        <BiLock className="w-5 h-5" />
                      </div>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                        className="w-full  py-2 border-none text-black "
                      />
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="my-6 w-full  flex justify-between">
                    <div className="flex flex-row items-center justify-center gap-2">
                      <Field
                        type="checkbox"
                        name="rememberMe"
                        className="form-checkbox h-4 w-4 rounded-sm text-[#718fe2] outline-none  border-gray1 focus:ring-0"
                      />
                      <p className="text-black">Сануулах</p>
                    </div>
                    <a
                      href="https://master.qrms.mn/password-recovery"
                      target="_blank"
                      className="flex flex-row items-center justify-center gap-2 cursor-pointer"
                    >
                      <p className="text-[#1890ff]">Нууц үг сэргээх</p>
                    </a>
                  </div>
                  <button
                    type="submit"
                    className={`w-full gap-2  text-white py-2 rounded-lg ${loading ? 'bg-gray1' : 'bg-[#718fe2]'}`}
                    disabled={loading}
                  >
                    {loading && <Spinner className="mr-4 h-4 w-4 text-[#718fe2]" />}
                    Нэвтрэх
                  </button>
                  {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}
