export const API_URL = import.meta.env.MODE === 'development' ?
    'http://localhost:8010/proxy/api/v1' :
    'https://profiles-5q3a.onrender.com'

export const DEFAULT_AVATAR = 'https://res.cloudinary.com/dna8yz36g/image/upload/v1659397105/profiles-app/default-avatar_tubdyf.jpg'