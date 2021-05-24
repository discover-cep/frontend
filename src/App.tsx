import React, { ReactElement } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

import getCep from './services/cep';
import Header from './components/Header';
import Input from './components/Input';
import './App.css';

const initialValues = {
  cep: '',
  logradouro: '',
  bairro: '',
  localidade: '',
  uf: '',
};

const Schema = yup.object().shape({
  cep: yup.string().length(8, 'Um Cep deve ter exatamente 8 digitos'),
  logradouro: yup.string(),
  bairro: yup.string(),
  localidade: yup.string(),
  uf: yup.string(),
});

const getAddr = async (
  cep: string,
  setFieldError: (field: string, error: string) => void,
  setFieldValue: (field: string, value: string) => void,
) => {
  try {
    const addr = await getCep(cep);
    if (addr) {
      setFieldValue('logradouro', addr.logradouro ? addr.logradouro : '');
      setFieldValue('bairro', addr.bairro ? addr.bairro : '');
      setFieldValue('complemento', addr.complemento ? addr.complemento : '');
      setFieldValue('localidade', addr.localidade ? addr.localidade : '');
      setFieldValue('uf', addr.uf ? addr.uf : '');
    } else setFieldError('cep', 'Cep inválido');
  } catch (error) {
    setFieldError('cep', error);
  }
};

function App():ReactElement {
  return (
    <div className="App">
      <Header />
      <Formik
        initialValues={initialValues}
        // eslint-disable-next-line no-console
        onSubmit={(values) => console.log(values)}
        validationSchema={Schema}
      >
        {({ setFieldError, setFieldValue }) => (
          <>
            <Input placeholder="Cep" name="cep" onChange={(thisCep:string) => getAddr(thisCep, setFieldError, setFieldValue)} />
            <ErrorMessage name="cep" component="div" className="input-error" />
            <Input disabled placeholder="Logradouro" name="logradouro" />
            <Input disabled placeholder="Complemento" name="complemento" />
            <Input disabled placeholder="Bairro" name="bairro" />
            <Input disabled placeholder="Localidade" name="localidade" />
            <Input disabled placeholder="UF" name="uf" />
          </>
        )}
      </Formik>
    </div>
  );
}

export default App;
