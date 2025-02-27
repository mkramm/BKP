import React from 'react';
import { PortableText, PortableTextBlock } from '@portabletext/react';
import { AssetSourceSpec } from 'sanity';
import '../styles.css';

export type TimelineEntryProps = {
  year: number;
  title: string;
  content: PortableTextBlock[];
  index: number; // Index für die Positionierung
  image: {
    asset: AssetSourceSpec
  };
};

const TimelineEntry: React.FC<TimelineEntryProps> = ({ year, content, index, title, image }) => {
  console.log('TimelineEntry', year, title, image);
  return (
    <div className={`container ${index % 2 === 0 ? 'left' : 'right'}`}>
      <div className="content">
        <h2 className={`year ${index % 2 === 0 ? 'left-year' : 'right-year'}`}>{year}</h2>
        <h3 className="title">{title}</h3>
        {image && (
          <div className="image-container">
            <img src={image?.asset?.url} alt={title} className="timeline-image" />
          </div>
        )}
        <PortableText value={content} />
      </div>
    </div>
  );
};

export default TimelineEntry;