import React from 'react'
import Header from '../Layout/Header';
import Banner from '../Layout/Banner';

function UserHome() {
  const userId = localStorage.getItem('UserId');
  const token=localStorage.getItem('token')
  console.log(token);
  console.log(userId);
  
  
  return (

    <div>
      {/* <Header/> */}
      UserHome
      <Banner/></div>
  )
}

export default UserHome