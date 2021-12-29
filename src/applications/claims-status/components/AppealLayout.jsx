import React from 'react';
import { Link } from 'react-router-dom';
import ClaimsBreadcrumbs from './ClaimsBreadcrumbs';

export default function AppealLayout({ children }) {
  return (
    <div>
      <div className="row">
        <ClaimsBreadcrumbs>
          <li>
            <Link to="your-claims">Track your claims and appeals</Link>
          </li>
        </ClaimsBreadcrumbs>
      </div>
      {children}
    </div>
  );
}
