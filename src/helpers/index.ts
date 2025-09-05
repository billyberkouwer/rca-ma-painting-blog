/**
 * Extracts and formats a date from an ISO string
 * @param isoString - ISO date string in format "2025-09-05T09:37:16Z"
 * @param options - Formatting options
 * @returns Formatted date string or null if invalid
 */
export function extractDate(
  isoString: string,
  options: {
    format?: 'short' | 'long' | 'time' | 'datetime' | 'custom';
    customFormat?: Intl.DateTimeFormatOptions;
    locale?: string;
  } = {}
): string | null {
  try {
    const date = new Date(isoString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return null;
    }

    const {
      format = 'short',
      customFormat,
      locale = 'en-US'
    } = options;

    const formatOptions: Intl.DateTimeFormatOptions = customFormat || (() => {
      switch (format) {
        case 'short':
          return { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          };
        case 'long':
          return { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          };
        case 'time':
          return { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
          };
        case 'datetime':
          return { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
          };
        default:
          return { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          };
      }
    })();

    return date.toLocaleDateString(locale, formatOptions);
  } catch (error) {
    console.error('Error extracting date:', error);
    return null;
  }
}

/**
 * Extracts just the date part (YYYY-MM-DD) from an ISO string
 * @param isoString - ISO date string
 * @returns Date string in YYYY-MM-DD format or null if invalid
 */
export function extractDateOnly(isoString: string): string | null {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error extracting date only:', error);
    return null;
  }
}

/**
 * Extracts just the time part (HH:MM) from an ISO string
 * @param isoString - ISO date string
 * @param use24Hour - Whether to use 24-hour format
 * @returns Time string or null if invalid
 */
export function extractTimeOnly(isoString: string, use24Hour: boolean = false): string | null {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return null;
    }
    
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: !use24Hour
    };
    
    return date.toLocaleTimeString('en-US', options);
  } catch (error) {
    console.error('Error extracting time only:', error);
    return null;
  }
}
