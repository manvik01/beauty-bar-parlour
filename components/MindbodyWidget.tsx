'use client';
import React, { useEffect } from 'react';

interface MindbodyWidgetProps {
  widgetId: string;
}

const MindbodyWidget: React.FC<MindbodyWidgetProps> = ({ widgetId }) => {
  useEffect(() => {
    // Check if the script has already been added to avoid duplicates
    if (document.querySelector('script[src="https://brandedweb.mindbodyonline.com/embed/widget.js"]')) {
      // If script exists, just reload widgets
      if (window.MB?.reloadWidgets) {
        window.MB.reloadWidgets();
      }
      return;
    }

    // If script doesn't exist, create and append it
    const script = document.createElement('script');
    script.src = 'https://brandedweb.mindbodyonline.com/embed/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      // It's often better not to remove the script, as other widgets might need it.
      // If this component is the ONLY place it's used, you could uncomment the next line.
      // document.body.removeChild(script);
    };
  }, [widgetId]); // Re-run if the widgetId changes

  return (
    <div
      className="mindbody-widget"
      data-widget-type="Appointments"
      data-widget-id={widgetId}
    />
  );
};

export default MindbodyWidget; 