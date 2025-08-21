'use client';

import React from 'react';

export default function ReviewBanner() {
  return (
    <section className="clean-section bg-secondary py-16">
      <div className="container-custom text-center">
        <h2 className="clean-heading text-black mb-8">What Our Clients Say</h2>
        <div 
          data-bid="157659" 
          data-url="https://app.revu.cloud" 
          data-aid="23780"
          className="min-h-[200px] flex items-center justify-center"
        >
          {/* Reviewability widget will load here from the globally included script */}
        </div>
      </div>
    </section>
  );
}
