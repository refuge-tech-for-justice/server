var handle_error = function(error, committed, err_code) { //Returns message if error, false otherwise
  if (error) {
    console.log('Transaction failed abnormally!', err_code, error);
    return "Oops! There was an error in processing your request.";
  }
  switch (err_code) {
    case 1:
      if (!committed) {
        console.log('Not committed', err_code);
        return "Oops! There was an error in processing your request.";
      }
      return false;
    case 2:
    case 3:
      if (!committed) {
        console.log('Not committed', err_code);
        return "Doesn't look like you've been matched with that ID! Another peer supporter may have claimed it";
      }
      return false;
    case 4:
      if (!committed) {
        console.log('Not committed', err_code);
        return "Please wait. We are still trying to find you an available peer supporter.";
      }
      return false;
  }
}

module.exports = handle_error;
