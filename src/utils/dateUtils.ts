// Date utility functions for consistent formatting across the application
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) return dateString;
    
    // Format as dd-mm-yy
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  } catch (error) {
    console.warn('Error formatting date:', error);
    return dateString;
  }
};

export const formatDateLong = (dateString: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) return dateString;
    
    // Format as dd-mm-yyyy for longer display
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.warn('Error formatting date:', error);
    return dateString;
  }
};