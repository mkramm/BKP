import React from 'react';
import { PortableText, PortableTextBlock } from '@portabletext/react';
import '../styles.css';

type TimelineEntryProps = {
  year: number;
  content: PortableTextBlock[];
  index: number; // Index für die Positionierung
};

const TimelineEntry: React.FC<TimelineEntryProps> = ({ year, content, index }) => {
  return (
    <div className={`container ${index % 2 === 0 ? 'left' : 'right'}`}>
      <div className="content">
        <h2 className={`year ${index % 2 === 0 ? 'left-year' : 'right-year'}`}>{year}</h2>
        <PortableText value={content} />
      </div>
    </div>
  );
};

export default TimelineEntry; 