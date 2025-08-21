'use client';

import React from 'react';

export default function TestimonialsPage() {
  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h3 className="clean-heading">Client Voices</h3>
          <h1 className="clean-subheading">What Our Clients Say</h1>
        </div>
      </section>

      {/* Testimonials Content */}
      <section className="clean-section">
        <div className="container-custom">
          <div 
            data-bid="157659" 
            data-url="https://app.revu.cloud"
            className="min-h-[500px] w-full flex items-center justify-center"
          >
            {/* Reviewability widget will load here from the globally included script */}
          </div>
        </div>
      </section>
    </main>
  );
}
