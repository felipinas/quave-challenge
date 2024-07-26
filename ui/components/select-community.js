import React from 'react';
import { useSubscribe, useTracker } from 'meteor/react-meteor-data';
import { useSearchParams } from 'react-router-dom';

import { Communities } from '../../communities/communities';

export const SelectCommunity = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const communityId = searchParams.get('community');

  const isLoading = useSubscribe('communities');

  const { communities } = useTracker(() => ({
    communities: Communities.find().fetch(),
  }));

  const handleChangeCommunity = (event) => {
    const { value } = event.target;

    searchParams.set('community', value);

    setSearchParams(searchParams);
  };

  const selectOptions = communities?.map((community) => ({
    value: community._id,
    label: community.name,
  }));

  if (isLoading()) {
    return <h1>Loading communities...</h1>;
  }

  return (
    <select
      className="w-full cursor-pointer rounded-lg border border-border bg-transparent p-2"
      onChange={handleChangeCommunity}
      defaultValue={communityId || 'placeholder'}
    >
      <option disabled hidden value="placeholder">
        Select an event
      </option>

      {selectOptions.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="bg-background"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
