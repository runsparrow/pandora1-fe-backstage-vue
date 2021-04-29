let API_HOSTNAME;

if (process.env.NODE_ENV === 'development') {
  API_HOSTNAME = '/media/MIS';
} else {
  API_HOSTNAME = '/media/MIS';
}

export const UPLOADNAME = '/media'
export const APIHOSTNAME = API_HOSTNAME;

