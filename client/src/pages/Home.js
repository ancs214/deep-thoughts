import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  // use useQuery hook to make query request
  //Apollo's @apollo/client library provides a loading property to indicate that the request isn't done just yet. When it's finished and we have data returned from the server, that information is stored in the destructured data property.
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  //NEW SYNTAX: optional chaining   -   negates the need to check if an obj even exists before accessing its properties
  //if data exists, store it in the thoughts constant we just created. if data is undefined, save an empty array to the thoughts component
  const thoughts = data?.thoughts || [];
  // console.log(thoughts);

  //If the query hasn't completed and loading is still defined, we display a message to indicate just that. Once the query is complete and loading is undefined, we pass the thoughts array and a custom title to the <ThoughtList> component as props.
  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
