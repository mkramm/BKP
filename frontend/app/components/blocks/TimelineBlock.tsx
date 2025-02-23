import React from 'react';
import TimelineEntry from './TimelineEntry';
import { PortableTextBlock } from '@portabletext/react';

export type TimelineBlockProps = {
  _type: string;
  _key: string;
  entries: { year: number; content: PortableTextBlock[] }[];
};

const TimelineBlock: React.FC<TimelineBlockProps> = ({ entries }) => {
  return (
    <div className="timeline">
      {entries.map((entry, index) => (
        <TimelineEntry key={index} year={entry.year} content={entry.content} index={index} />
      ))}
    </div>
  );
};

export { TimelineBlock }; 