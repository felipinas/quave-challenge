import React, { useState, useRef } from 'react';
import { Meteor } from 'meteor/meteor';
import { useAlert } from 'meteor/quave:alert-react-tailwind';

import { alreadyPassedFiveSeconds } from '../../people/utils';

export const Actions = ({ person }) => {
  const { openAlert } = useAlert();

  const [shouldShowCheckoutButton, setShouldShowCheckoutButton] =
    useState(false);

  const timeoutRef = useRef(null);

  const handleCheckInPerson = async (personId) => {
    try {
      await Meteor.callAsync('People.checkIn', { personId });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setShouldShowCheckoutButton(true);

        timeoutRef.current = null;
      }, 5000);
    } catch (error) {
      openAlert({
        message: 'Error when trying to check in',
        isError: true,
        autoCloseTimeout: 5000,
      });
    }
  };

  const handleCheckOutPerson = async (personId) => {
    try {
      await Meteor.callAsync('People.checkOut', { personId });

      setShouldShowCheckoutButton(false);
    } catch (error) {
      openAlert({
        message: 'Error when trying to check out',
        isError: true,
        autoCloseTimeout: 5000,
      });
    }
  };

  return (
    <>
      {!person.checkIn && (
        <button
          onClick={() => handleCheckInPerson(person._id)}
          className="rounded-lg bg-lime-950 p-4 transition-opacity hover:opacity-80"
        >
          Check in {person.firstName} {person.lastName}
        </button>
      )}

      {((person.checkIn && alreadyPassedFiveSeconds(person.checkIn)) ||
        shouldShowCheckoutButton) && (
        <button
          onClick={() => handleCheckOutPerson(person._id)}
          className="rounded-lg bg-red-950 p-4 transition-opacity hover:opacity-80"
        >
          Check out {person.firstName} {person.lastName}
        </button>
      )}
    </>
  );
};
