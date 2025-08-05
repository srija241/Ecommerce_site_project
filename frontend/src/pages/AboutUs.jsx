import React from 'react';
import './AboutUs.css';


const About = () => {
  return (
    <div className="container mt-5">
      <h1>About MyStore</h1>
      <p>Welcome to <strong>MyStore</strong> — your trusted destination for quality products at unbeatable prices.</p>

      <p>
        At MyStore, we believe that shopping should be affordable, convenient, and enjoyable. 
        We’re proud to offer a wide selection of high-quality products, handpicked to suit the needs of our diverse customers.
      </p>

      <p>
        Whether you're looking for everyday essentials or something special, our goal is to deliver top-notch value 
        and customer satisfaction. We continuously strive to improve our services and provide you with a smooth, 
        user-friendly online shopping experience.
      </p>

      <p>
        With a strong focus on affordability, product quality, and prompt customer support, we ensure that you get the best of everything — 
        all in one place.
      </p>

      <h3>Why Shop with Us?</h3>
      <ul>
        <li>✅ Affordable prices without compromising quality</li>
        <li>✅ Fast and reliable delivery</li>
        <li>✅ Secure payment options</li>
        <li>✅ Dedicated customer support</li>
      </ul>

      <h3>Contact Information</h3>
      <ul>
        <li><strong>Email:</strong> support@mystore.com</li>
        <li><strong>Phone:</strong> +91 12345 67890</li>
        <li><strong>Address:</strong> 123, Market Street, Visakhapatnam, India</li>
      </ul>

      <p>Thank you for visiting MyStore — we look forward to serving you!</p>
    </div>
  );
};

export default About;
