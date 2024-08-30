import React from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import logo from '../assets/avatar.jpg';
import SignupForm from '../components/SignupForm';

const Signup = () => {
  const { t } = useTranslation();
  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('errors.range'))
      .max(20, t('errors.range'))
      .required(t('errors.required')),
    password: Yup.string()
      .min(6, t('errors.min'))
      .required(t('errors.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('errors.mustMatch'))
      .required(t('errors.required')),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <img src={logo} className="rounded-circle" alt={t('signupPage.alt')} />
                <SignupForm
                  signupSchema={signupSchema}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
