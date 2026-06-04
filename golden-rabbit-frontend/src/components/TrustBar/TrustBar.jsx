import React from 'react';
import { Shield, Truck, BadgePercent, Headphones } from 'lucide-react';
import './TrustBar.css';

const items = [
  { icon: Shield, label: 'Safety Certified', detail: 'Lab-tested crackers' },
  { icon: Truck, label: 'Fast Delivery', detail: 'Pan-India shipping' },
  { icon: BadgePercent, label: 'Best Prices', detail: 'Festival offers daily' },
  { icon: Headphones, label: 'Expert Support', detail: 'We help you choose' },
];

const TrustBar = () => (
  <section className="trust-bar" id="offers" aria-label="Store highlights">
    <div className="trust-bar-inner">
      {items.map(({ icon: IconComponent, label, detail }) => (
        <div key={label} className="trust-item">
          <div className="trust-icon">
            <IconComponent size={22} strokeWidth={2} />
          </div>
          <div className="trust-text">
            <span className="trust-label">{label}</span>
            <span className="trust-detail">{detail}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TrustBar;
