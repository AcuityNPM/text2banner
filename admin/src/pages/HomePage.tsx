import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Main } from '@strapi/design-system';
// import { useIntl } from 'react-intl';
import { getTranslation } from '../utils/getTranslation';
import * as css from './styles/style';
import InputField from './InputField';

type Values = {
    bannerName: string,
    backgroundColor: string,
    title: string,
    bannerWidth: number,
    bannerHeight: number,
    fontColor: string,
    fontSize: number
}

const HomePage: React.FC = () => {
  // const { formatMessage } = useIntl();
  let defFileName = Date.now();
  let ranNum = Math.floor(Math.random() * 10);

  const [values, setValues] = useState<Values>({
    bannerName: defFileName + '-' + ranNum,
    backgroundColor: "#ffffff",
    title: "",
    bannerWidth: 1200,
    bannerHeight: 675,
    fontColor: "#000000",
    fontSize: 60
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const [loading, setLoading] = useState<boolean>(false);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Set loading to true
      setLoading(true);

      // Post the data
      await axios.post("/text2banner/generate-banner", values);

      // Reload the page
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      // Set loading to false
      setLoading(false);
    }
  }

  return (
    <div style={css.bbMidSpace}>
      <div style={css.bbHeader}>
        <div style={css.bbBackLine}></div>
        <h1 style={css.bbHeaderH1}>Text2Banner</h1>
        <p style={css.bbHeaderP}></p>
      </div>
      <form style={css.bbForm} onSubmit={handleForm}>
        <div style={css.bbNextline}>
          <InputField 
            label="File Name" required={true} type="text" 
            name="bannerName" value={values.bannerName} 
            onChange={handleChange} 
            pattern="" placeholder="e.g. no-space-no-special-character"
            hint="" />
          <InputField 
            label="Background Color" required={true} type="text" 
            name="backgroundColor" value={values.backgroundColor} 
            onChange={handleChange} 
            pattern="#[0-9A-Fa-f]{6}" placeholder="e.g. #ffffff" 
            hint="" />
        </div>
        <div style={css.bbNextline}>
          <label style={css.bbFormLabel}>
            <span style={css.bbFormLabelSpan}>Title</span>
            <textarea style={css.bbFormLabelArea} name="title" value={values.title} onChange={handleTextareaChange} />
          </label>
        </div>
        <div style={css.bbNextline}>
          <InputField 
            label="Width" required={true} type="number" 
            name="bannerWidth" value={values.bannerWidth} 
            onChange={handleChange} 
            pattern="" placeholder="e.g. 1200" 
            hint="px" />
          <InputField 
            label="Height" required={true} type="number" 
            name="bannerHeight" value={values.bannerHeight} 
            onChange={handleChange} 
            pattern="" placeholder="e.g. 675" 
            hint="px" />
        </div>
        <div style={css.bbNextline}>
          <InputField 
            label="Font Color" required={true} type="text" 
            name="fontColor" value={values.fontColor} 
            onChange={handleChange} 
            pattern="#[0-9A-Fa-f]{6}" placeholder="e.g. #000000" 
            hint="" />
          <InputField 
            label="Font Size" required={true} type="number" 
            name="fontSize" value={values.fontSize} 
            onChange={handleChange} 
            pattern="" placeholder="e.g. 60" 
            hint="px" />
        </div>
        <input type="submit" style={css.bbSubmit} value="Submit" />
      </form>
    </div>
  );
};

export { HomePage };