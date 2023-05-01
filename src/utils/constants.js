export const PASSWORD_MIN_LENGTH = 8
export const PASSWORDS_DO_NOT_MATCH = 'Passwords do not match!'
export const PASSWORDS_MIN_LENGTH_TEXT = 'Passwords must be at least 8 characters long!'

// firestore collection names
export const FIREBASE_COLLECTION_USERS = 'Users'
export const FIREBASE_COLLECTION_JOB_LISTINGS = 'Job Listings'
export const FIREBASE_COLLECTION_CHAT_ROOM = 'Chats'

// firebase error codes
export const FIREBASE_ERROR_CODE_WRONG_PWD = 'auth/wrong-password'
export const FIREBASE_ERROR_CODE_USER_NOT_EXISTS = 'auth/user-not-found'
export const FIREBASE_EMAIL_ALREADY_EXISTS = 'auth/email-already-in-use'
export const FIREBASE_NETWORK_FAILED = 'auth/network-request-failed'

// firebase error responses
export const FIREBASE_USER_EXISTS = 'User already exists!'
export const PASSWORD_IS_INCORRECT = 'Password is incorrect!'
export const USER_NOT_FOUND_RESPONSE = 'User does not exist!'
export const PWDS_NOT_MATCH = 'Passwords do not match!'
export const NETWORK_RESPONSE = 'Please check your Internet connection'

// success responses
export const ACCOUNT_CREATED_PLEASE_LOGIN = 'Account created! Please login'
export const SUCCESSFULLY_LOGGED_IN = 'Successfully logged in!'

export const PLEASE_WAIT = 'Please wait...'


export function HasDeadlineOver(deadlineDate) {
    let date = deadlineDate.substring(0,deadlineDate.indexOf(" "));
    let time = deadlineDate.substring(deadlineDate.indexOf(" ")+1);
    const dateObj1 = new Date(date+"T"+time);
    const dateObj2 = new Date();

    if(dateObj1.getTime() < dateObj2.getTime()){
        return true;
    }

    return false;
    
}