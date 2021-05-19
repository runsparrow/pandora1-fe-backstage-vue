let API_HOSTNAME;
let UPLOAD_NAME;

if (process.env.NODE_ENV === 'development') {
  API_HOSTNAME = '/media/MIS';
  UPLOAD_NAME = '/files';
} else {
  API_HOSTNAME = '/media/MIS';
  UPLOAD_NAME = '/file';
}

export const UPLOADNAME = UPLOAD_NAME;
export const APIHOSTNAME = API_HOSTNAME;

