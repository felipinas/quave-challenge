import React from 'react';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { useSearchParams } from 'react-router-dom';

import { People } from '../../people/people';

export const Metrics = () => {
  const [searchParams] = useSearchParams();

  const communityId = searchParams.get('community');

  const isLoading = useSubscribe('people');

  const metrics = useTracker(() => {
    const peopleAtEventCursor = People.find({
      communityId,
      checkIn: { $exists: true },
    });

    const peopleAtEventAmount = peopleAtEventCursor.count();

    const peopleNotCheckedIn = People.find({
      communityId,
      checkIn: { $exists: false },
    }).count();

    const peopleByCompany = Object.groupBy(
      peopleAtEventCursor.fetch(),
      ({ companyName }) => companyName
    );

    const formattedPeopleByCompany = Object.entries(peopleByCompany);

    return {
      peopleAtEventAmount,
      peopleByCompany: formattedPeopleByCompany,
      peopleNotCheckedIn,
    };
  });

  if (isLoading()) {
    return <h1>Loading people...</h1>;
  }

  return (
    <section className="mb-6 max-h-80 overflow-auto rounded-lg bg-muted p-6">
      <header className="mb-4">
        <h2 className="text-xl font-semibold">Event Summary</h2>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">
            People in the event right now
          </span>

          <strong className="text-2xl">{metrics.peopleAtEventAmount}</strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">People by company</span>

          <ul className="space-y-1">
            {metrics.peopleByCompany.map(([company, people]) => (
              <li key={company} className="flex items-center justify-between">
                <span>{company}</span>

                <strong>{people.length}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">People not checked in</span>

          <strong className="text-2xl">{metrics.peopleNotCheckedIn}</strong>
        </div>
      </div>
    </section>
  );
};
