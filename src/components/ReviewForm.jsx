import { View } from 'react-native';
import { Formik } from 'formik';
import FormikInput from './FormikTextInput';
import Button from './Button';

import * as yup from 'yup';

const initialValues = {
  repoOwner: '',
  repoName: '',
  repoRating: '',
  review: '',
};

const validaionSchema = yup.object().shape({
  repoOwner: yup.string().required('Repository owner name is required'),
  repoName: yup.string().required('Repository name is required'),
  repoRating: yup
    .number()
    .typeError('Rating cannot be negative')
    .required('Rating is required')
    .min(0, 'Minimum rating can be 0')
    .max(100, 'Maximum rating can be 100'),
  review: yup.string().optional(),
});

const ReviewForm = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={{ backgroundColor: 'white', padding: 20 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validaionSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <View style={{ display: 'flex', rowGap: 10 }}>
            <FormikInput name="repoOwner" placeholder="Repository owner name" />
            <FormikInput name="repoName" placeholder="Repository name" />
            <FormikInput
              name="repoRating"
              placeholder="Rating between 0 to 100"
              keyboardType="numeric"
            />
            <FormikInput name="review" placeholder="Review" multiline />
            <Button handleSubmit={handleSubmit} title="Create a review" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ReviewForm;
