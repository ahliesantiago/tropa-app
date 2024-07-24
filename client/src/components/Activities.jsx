/*
 * This component is used on the homepage, cycling through the words specified below to indicate
 * varied activities that the app users might be interested in undertaking with their prospective matches.
*/

import { useEffect, useState } from 'react';

const Activities = () => {
  const activities = [
    'kape', 'movie', 'laro', 'dinner', 'inom', 'bundok', 'bball', 'foodtrip', 'gym', 'jamming'
  ];
  const [activity, setActivity] = useState(activities[0]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setActivity(activities[currentIndex]);
      currentIndex = (currentIndex + 1) % activities.length;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return activity;
}

export default Activities