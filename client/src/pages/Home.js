import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';


const Home = () => {
  // use useQuery hook to make query request
  //Apollo's @apollo/client library provides a loading property to indicate that the request isn't done just yet. When it's finished and we have data returned from the server, that information is stored in the destructured data property.
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  //userData will hold all returned info from the query
  const { data: userData } = useQuery(QUERY_ME_BASIC);


  //NEW SYNTAX: optional chaining   -   negates the need to check if an obj even exists before accessing its properties
  //if data exists, store it in the thoughts constant we just created. if data is undefined, save an empty array to the thoughts component
  const thoughts = data?.thoughts || [];
  // console.log(thoughts);

  const loggedIn = Auth.loggedIn();

  //If the query hasn't completed and loading is still defined, we display a message to indicate just that. Once the query is complete and loading is undefined, we pass the thoughts array and a custom title to the <ThoughtList> component as props.
  return (
    <main>
      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
          {loggedIn && userData ? (
            <div className="col-12 col-lg-3 mb-3">
              <FriendList
                username={userData.me.username}
                friendCount={userData.me.friendCount}
                friends={userData.me.friends}
              />
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Home;
