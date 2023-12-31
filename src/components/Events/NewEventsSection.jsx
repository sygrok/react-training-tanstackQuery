import { useEffect, useState } from 'react';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  const { data, isPending, isError, error, refetch} = useQuery({ //to get error properties fetchEvents function has to throw error
    queryKey: ['events'], //to cache and reuse //identifier
    queryFn: fetchEvents, //http request is executed here
    
    // staleTime: 5000, disables fetching for 5 second
    // gcTime: 30000 delete cached data after 30 minutes
    // onSuccess: () => { navigate('/events') } executes after data is fetched
    
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error.info?.message || 'failed'} /> //message={error.info?.message || 'failed'}  it checks if the error has info then show message or show the other value
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
