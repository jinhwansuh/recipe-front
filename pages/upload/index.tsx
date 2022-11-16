import { useMutation } from '@apollo/client';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { IngredientsInput } from '~/components';
import { CREATE_RECIPE } from '~/graphql/Mutations';
import { RecipeAttributes } from '~/types/recipe';

type Ingredient = {
  name: string;
  weigh: string;
  selected: string;
};

export interface Inputs {
  title: string;
  uploader: string;
  videoURL: string;
  order: string;
  ingredient: Ingredient[];
}

const UploadPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      ingredient: [{ name: '', weigh: '', selected: '' }],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: `ingredient`,
  });

  const [createRecipe, { error }] = useMutation(CREATE_RECIPE);
  // const handleButtonClick = () => {
  //   console.log(input);
  //   const { title, videoURL, order, ingredients, uploader, measure } = input;
  //   createRecipe({
  //     variables: { title, videoURL, order, ingredients, uploader, measure },
  //   });
  // };

  const onSubmit = (data: Inputs) => {
    console.log(data);
    console.log(123);
  };

  const handleAddButton = () => {
    append({ name: '', weigh: '', selected: '' });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <FormLabel>제목</FormLabel>
          <Input {...register('title', { required: true })} />
          <FormLabel>유튜버</FormLabel>
          <Input {...register('uploader', { required: true })} />
          <FormLabel>videoURL</FormLabel>
          <StyledInput {...register('videoURL', { required: true })} />
          <FormLabel>순서</FormLabel>
          <Textarea {...register('order', { required: true })} />
        </FormControl>

        <Button onClick={handleAddButton}>+</Button>
        <div>
          <Button type='submit'>Upload</Button>
        </div>
      </form>
    </>
  );
};

const StyledInput = styled(Input)`
  width: 80%;
`;

export default UploadPage;
