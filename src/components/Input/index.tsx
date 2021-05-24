import React, { ReactElement, useState } from 'react';
import { Field, useField } from 'formik';

import './styles.css';

interface ComponentProps{
  placeholder: string;
  name: string;
  disabled?: boolean;
  onChange?: (cep:string)=>Promise<void>;
}

const Input = ({
  placeholder, name, disabled, onChange,
}: ComponentProps): ReactElement => {
  const [localDisabled, setLocalDisabled] = useState(false);
  const field = useField(name);
  const values = field[0];
  const helpers = field[2];
  return (
    <div className="input-container">
      <Field
        name={name}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        className={values?.value?.length > 0 ? 'input not-empty' : 'input'}
        id="input"
        required={!localDisabled}
        disabled={disabled || localDisabled}
        onChange={async (e:React.ChangeEvent<HTMLInputElement>) => {
          helpers.setValue(e.target.value);
          if (e.target.value.length === 8 && name === 'cep' && onChange) {
            setLocalDisabled(true);
            await onChange(e.target.value);
            setLocalDisabled(false);
          }
        }}
      />
      <label htmlFor="input" className="label">
        {placeholder}
      </label>
    </div>
  );
};

Input.defaultProps = {
  disabled: false,
  onChange: undefined,
};

export default Input;
