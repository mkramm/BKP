import React from 'react';
import TimelineEntry, {TimelineEntryProps} from './TimelineEntry';

export type TimelineBlockProps = {
  _type: string;
  _key: string;
  entries: TimelineEntryProps[];
};

const TimelineBlock: React.FC<TimelineBlockProps> = ({ entries }) => {
  return (
    <div className="timeline">
      {entries.map((entry, index) => (
        <TimelineEntry key={index} image={entry.image} year={entry.year} title={entry.title} content={entry.content} index={index} />
      ))}
    </div>
  );
};

export { TimelineBlock }; 