import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { selectAuthError, selectIsAuthError } from '../store/slice/authSlice';
import { useCreateNewUserMutation } from '../api/authApi';
import filterText from '../utils/filterText';
import getRoute from '../utils/routes';

const SignupForm = (props) => {
  const { signupSchema } = props;
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [createNewUser] = useCreateNewUserMutation();
  const authError = useSelector(selectAuthError);
  const isAuthError = useSelector(selectIsAuthError);

  useEffect(() => {
    if (isAuthError && authError === 'FETCH_ERROR') {
      toast.error(t('toast.networkError'));
    }
  }, [isAuthError, authError, t]);

  const handleSignup = async (values) => {
    const { username, password } = values;
    const data = {
      username: filterText(username),
      password,
    };
    await createNewUser(data).unwrap();
    navigate(getRoute('PAGE_CHAT'));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={signupSchema}
      onSubmit={handleSignup}
    >
      { ({ errors, touched, isSubmitting }) => (
        <Form className="w-50">
          <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
          <div className="form-floating mb-3">
            <Field
              name="username"
              id="username"
              placeholder={t('errors.range')}
              autoComplete="username"
              className={`form-control ${(errors.username && touched.username) || isAuthError ? 'is-invalid' : ''}`}
              innerRef={inputRef}
            />
            <label className="form-label" htmlFor="username">{t('signupPage.username')}</label>
            {errors.username && touched.username && <div className="invalid-tooltip">{errors.username}</div>}
            {isAuthError && authError === 409 && <div className="invalid-tooltip">{t('errors.userExists')}</div>}
          </div>
          <div className="form-floating mb-3">
            <Field
              name="password"
              id="password"
              type="password"
              placeholder={t('errors.min')}
              autoComplete="new-password"
              className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
            />
            <label className="form-label" htmlFor="password">{t('signupPage.password')}</label>
            {errors.password && touched.password && <div className="invalid-tooltip">{errors.password}</div>}
          </div>
          <div className="form-floating mb-3">
            <Field
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder={t('errors.mustMatch')}
              autoComplete="new-password"
              className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
            />
            <label className="form-label" htmlFor="confirmPassword">{t('signupPage.confirmPassword')}</label>
            {errors.confirmPassword && touched.confirmPassword && <div className="invalid-tooltip">{errors.confirmPassword}</div>}
          </div>
          <Button
            type="submit"
            variant="outline-primary w-100"
            disabled={isSubmitting}
          >
            {t('signupPage.button')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
