import React from 'react';

const PersonalInfo = () => {
    const data = JSON.parse(localStorage.getItem("teacher"));
    console.log(data);
    
  return (
    <div>
      <p><strong>Name:</strong> {data.firstname+' '+data.lastname}</p>
      <p><strong>CNIC:</strong> {data.cnic}</p>
      <p><strong>Age:</strong> {data.age}</p>
      <p><strong>Professional Experience:</strong> {data.experience}</p>
    </div>
  );
};

export default PersonalInfo;
