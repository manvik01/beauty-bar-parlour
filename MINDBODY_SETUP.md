# Mindbody Widget Setup Guide

## Overview
This guide will help you configure Mindbody widgets properly on your website to ensure they load and function correctly.

## Prerequisites
1. Active Mindbody business account
2. Branded Web Tools subscription (if required)
3. Administrative access to your Mindbody account

## Configuration Steps

### 1. Configure Domain Allowlisting in Mindbody

**Critical Step:** Mindbody widgets will NOT work unless your domain is properly configured.

1. Log into your Mindbody business account
2. Navigate to **Settings > Branded Web Manager**
3. Go to **Website Integration Settings**
4. Under **Website Address**, add your domains:
   - Production: `beautybar.parlour`
   - Development: `localhost:3000`
   - Staging: `staging.beautybar.parlour` (if applicable)
5. Save the settings

### 2. Verify Widget IDs

Current widget IDs in use:
- Herbal Treatment: `0e33258e78e`
- Nail & Foot Spa: `0e33444e78e`
- Facial Services: `0e33532e78e`
- Waxing Services: `0e33533e78e`
- Threading Services: `0e33534e78e`
- AFT Treatment: `0e33535e78e`

**To verify these IDs:**
1. Go to **Branded Web Manager > Widgets**
2. Create or edit an "Appointments" widget
3. Copy the widget ID from the embed code
4. Update the `serviceCategories` array in `components/booking/service-selection.tsx` if needed

### 3. Test Widget Functionality

**Manual Testing Steps:**
1. Navigate to the Book Now page
2. Select each service category
3. Verify the widget loads without errors
4. Check browser console for error messages
5. Test the booking flow end-to-end

### 4. Common Issues and Solutions

#### Widgets Not Loading
- **Cause**: Domain not allowlisted in Mindbody
- **Solution**: Add your domain to Mindbody branded web settings

#### "Widget Not Found" Error
- **Cause**: Invalid widget ID or widget doesn't exist
- **Solution**: Generate new widget IDs in Mindbody dashboard

#### Script Loading Conflicts
- **Cause**: Multiple script loaders competing
- **Solution**: Use only one script loading mechanism (implemented in the new code)

#### Network/CORS Errors
- **Cause**: Mindbody servers blocking requests
- **Solution**: Verify domain configuration and contact Mindbody support

### 5. Fallback Options

The new implementation includes multiple fallback options when widgets fail:

1. **Retry Mechanism**: Up to 3 automatic retries
2. **Direct Mindbody Link**: Opens Mindbody booking page in new tab
3. **Phone Number**: Direct call to book appointments
4. **Error Handling**: User-friendly error messages

### 6. Environment Variables (Optional)

Create a `.env.local` file with these variables for easier configuration:

```env
# Mindbody Configuration
NEXT_PUBLIC_MINDBODY_STUDIO_ID=5746301
NEXT_PUBLIC_DOMAIN=beautybar.parlour

# Widget IDs
NEXT_PUBLIC_WIDGET_HERBAL_TREATMENT=0e33258e78e
NEXT_PUBLIC_WIDGET_NAIL_SPA=0e33444e78e
NEXT_PUBLIC_WIDGET_FACIAL=0e33532e78e
NEXT_PUBLIC_WIDGET_WAXING=0e33533e78e
NEXT_PUBLIC_WIDGET_THREADING=0e33534e78e
NEXT_PUBLIC_WIDGET_LASER=0e33535e78e
```

### 7. Support Contacts

If widgets still don't work after following this guide:

1. **Mindbody Support**: Contact your Mindbody account manager
2. **Technical Support**: Open a ticket with Mindbody technical support
3. **Branded Web Support**: Specific support for widget integration issues

### 8. Testing Checklist

- [ ] Domain added to Mindbody branded web settings
- [ ] Widget IDs verified and current
- [ ] All service categories load widgets
- [ ] Browser console shows no errors
- [ ] Booking flow works end-to-end
- [ ] Fallback options function correctly
- [ ] Mobile responsiveness verified

## Next Steps

1. Complete the Mindbody domain configuration
2. Test all widget functionality
3. Verify booking flow works correctly
4. Monitor for any console errors
5. Set up proper error tracking (optional)

This implementation provides a robust, error-resistant widget loading system with proper fallbacks to ensure users can always book appointments even if the widgets fail to load. 