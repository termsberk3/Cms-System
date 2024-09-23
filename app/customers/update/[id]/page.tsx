"use client"
import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import UpdateForm from '@/app/components/UpdateForm'

interface ProductDetailsProps {
  id: string;
  email: string;
  user?: string | undefined;
}


const CustomerUpdate: FC<ProductDetailsProps> = ({ id, email, user}) => {
  /* const [product, setProduct] = useState<any>(null); */
  return <UpdateForm id={id} email={email} user={user}/>;
}


export default CustomerUpdate;