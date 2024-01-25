// Returns the true if it matches the pattern, else false, indication that we should not update field value
// If rule is not present then all values are allowed!
export const checkIsInputAllowed = (rule, inputValue = '') => {
  
  // Failsafe
  if(!rule) {
    return true;
  }

  // Apply rule
  let pattern;
  switch (rule) {
    case 'integer': 
      pattern = /^\d*$/;
      break;
    case 'decimal': 
      pattern = /^\d*(\.\d{0,2})?$/;
      break;
    default:
      pattern = null;
  }

  return !!inputValue.match(pattern) ? true : false;
}