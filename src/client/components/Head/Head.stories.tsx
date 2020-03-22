import React, { useEffect, useState } from 'react';
import { Head } from '.';

export default {
  component: Head,
  title: 'Head',
};

export const Base = () => {
  // const [title, updateTitle] = useState('');

  // https://github.com/WordPress/gutenberg/pull/18031
  // useEffect(() => {
  // updateTitle(document.title);
  // }, []);

  return (
    <>
      <Head title="storybook" />
      {/* <p>title: {title}</p> */}
    </>
  );
};
