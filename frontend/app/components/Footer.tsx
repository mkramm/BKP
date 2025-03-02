import React from 'react';
import Link from 'next/link';

type FooterProps = {
  navigation: {
    title: string;
    page: {
      slug: {
        current: string;
      };
    };
  }[];
};

const Footer: React.FC<FooterProps> = ({ navigation }) => {
  const currentYear = new Date().getFullYear();
  const startYear = 2025;
  const displayYear = currentYear > startYear ? `${startYear} - ${currentYear}` : `${startYear}`;

  return (
    <footer className="footer">
      <nav>
        <ul>
          {navigation.map((item) => (
            <li key={item.page.slug.current}>
              <Link href={`/${item.page.slug.current}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p>&copy; {displayYear} Blaskapelle Puch e.V.. All rights reserved.</p>
    </footer>
  );
};

export default Footer;