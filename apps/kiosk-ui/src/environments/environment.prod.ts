export const environment = {
  production: true,
  // In production on Pi, API is on same host, different port
  // Or use relative URLs if served from same origin
  hubApiUrl: window.location.origin.replace(/:\d+$/, ':8000')
};

