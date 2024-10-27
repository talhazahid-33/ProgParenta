import React from 'react';

const ContactInfo = ({ phone, email, address }) => {
    const data = JSON.parse(localStorage.getItem("teacher"));
    
  return (
    <div>
      <p><strong>Phone:</strong> {data.contact}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Address:</strong> {data.address}</p>
    </div>
  );
};

export default ContactInfo;
