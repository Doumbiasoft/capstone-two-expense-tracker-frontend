
const dateFormat = (date) => {
    try {
      if (!date) {
        // If date is not provided or is falsy, return an empty string or any default value you prefer.
        return '';
      }
  
      const d = new Date(date);
  
      if (isNaN(d)) {
        // If the Date object is invalid (e.g., the input date is not a valid date), return an error message or handle it as you see fit.
        return 'Invalid Date';
      }
  
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      const year = d.getFullYear();
  
      return [year, month, day].join('-');
    } catch (error) {
      // Handle any unexpected errors that may occur during date formatting.
      console.error('An error occurred while formatting the date:', error);
      return 'Error';
    }
  };
  
  export default dateFormat;
  
  