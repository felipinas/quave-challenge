import React from 'react';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { useSearchParams } from 'react-router-dom';

import { People } from '../../people/people';
import { Actions } from './actions';

import { formatDate } from '../utils';

const formatFullname = (person) => `${person.firstName} ${person.lastName}`;

export const PeopleTable = () => {
  const [searchParams] = useSearchParams();

  const communityId = searchParams.get('community');

  const isLoading = useSubscribe('getPeopleByCommunity', { communityId });

  const { people } = useTracker(() => ({
    people: People.find().fetch(),
  }));

  if (isLoading()) {
    return <h1>Loading people...</h1>;
  }

  if (!communityId) {
    return <h3>Choose a community</h3>;
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left">Fullname</th>

          <th className="text-left">Company</th>

          <th className="text-left">Title</th>

          <th className="text-left">Checkin</th>

          <th className="text-left">Checkout</th>

          <th className="text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <tr key={person._id}>
            <td>{formatFullname(person)}</td>

            <td>{person.companyName || 'N/A'}</td>

            <td>{person.title || 'N/A'}</td>

            <td>
              {formatDate(person.checkIn) ? (
                <time dateTime={person.checkIn}>
                  {formatDate(person.checkIn)}
                </time>
              ) : (
                'N/A'
              )}
            </td>

            <td>
              {formatDate(person.checkOut) ? (
                <time dateTime={person.checkOut}>
                  {formatDate(person.checkOut)}
                </time>
              ) : (
                'N/A'
              )}
            </td>

            <td>
              <Actions person={person} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
