function logout() {
    // Remove the token from local storage
    localStorage.removeItem('token');
  
    // Redirect the user to the login page
    window.location.href = '/login';
  }