import React, { FC } from 'react';
import UpdateForm from '@/app/components/UpdateForm'
import axios from 'axios';


interface EditUserProps {
  params: {
    id: string;
    email: string;
    customers: string;
    user: string;
  };
}

const UpdateUser: FC<EditUserProps> = async ({ params }) => {
  const { id , email , customers } = params;

  return <UpdateForm id={id} email={email}  />;
}

export default UpdateUser;