import React from 'react'
import UserLayout from '../../hoc/user';
import ManageWoods from './ManageWoods';
import ManageBrands from './ManageBrands';

const ManageCategories = () => {
  return (
    <UserLayout>
      <ManageBrands />
      <ManageWoods />
    </UserLayout>
  )
}

export default ManageCategories;
