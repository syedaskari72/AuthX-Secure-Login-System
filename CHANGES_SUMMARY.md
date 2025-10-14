# Unverified Account Redirect Flow - Implementation Summary

## Problem
Users with unverified accounts couldn't login and had no way to access the OTP verification page to complete their account verification.

## Solution
Implemented automatic redirect from Login page to VerifyOTP page when an unverified account attempts to login.

---

## Changes Made

### 1. Redux Slice (authSlice.js)

#### Initial State
- Added `tempUserId` restoration from `sessionStorage` on app initialization
- This ensures the userId persists across page navigations and refreshes

#### Login Rejected Handler
- Captures `userId` from error response when login fails due to unverified account
- Stores `userId` in both Redux state (`tempUserId`) and `sessionStorage`
- Added console logs for debugging

#### Signup Fulfilled Handler
- Also stores `tempUserId` in `sessionStorage` for consistency

#### VerifyOTP Fulfilled Handler
- Clears `tempUserId` from `sessionStorage` after successful verification

#### clearTempUserId Reducer
- Also removes `tempUserId` from `sessionStorage` when clearing state

### 2. Login Page (Login.jsx)

#### State Selection
- Added `tempUserId` to the Redux state selector

#### useEffect Logic
- Detects when login fails with `tempUserId` present (unverified account)
- Shows error message to user
- Waits 1.5 seconds (so user can read the message)
- Clears error state with `dispatch(reset())`
- Redirects to `/verify-otp` page
- Added comprehensive console logs for debugging

#### UI Updates
- Changed label from "Email or Phone Number" to "Email"
- Changed input type to `email` for consistency

### 3. VerifyOTP Page (VerifyOTP.jsx)

#### First useEffect (Mount Check)
- Checks for `tempUserId` in `sessionStorage` (primary source of truth)
- Waits 100ms before checking to handle race conditions
- Only redirects to signup if NO `tempUserId` found in sessionStorage
- Added detailed console logs

#### Second useEffect (Timer)
- Updated to check both Redux state and sessionStorage for `tempUserId`
- Only starts countdown timer if userId is present

#### Third useEffect (Success/Error Handling)
- Fixed unconditional `dispatch(reset())` call
- Now only calls `reset()` when there's actually an error or success

#### onSubmit Function
- Uses `tempUserId` from Redux state OR falls back to sessionStorage
- Ensures OTP verification works even if Redux state is cleared

#### handleResendOTP Function
- Uses `tempUserId` from Redux state OR falls back to sessionStorage
- Ensures resend works even if Redux state is cleared

---

## Technical Approach

### State Persistence Strategy
- **Primary Storage**: Redux state (`tempUserId`)
- **Backup Storage**: sessionStorage (`tempUserId`)
- **Why Both?**: 
  - Redux state for reactive UI updates
  - sessionStorage for persistence across navigations and potential state resets

### Race Condition Handling
- 100ms delay before checking `tempUserId` in VerifyOTP page
- Prevents premature redirects during navigation state updates

### Error State Management
- Clear error state before navigating to VerifyOTP
- Prevents error state from triggering unwanted side effects on destination page

---

## User Flow

```
1. User enters email/password on Login page
   ↓
2. Backend returns 401 error: "Please verify your account first" + userId
   ↓
3. Redux captures userId in state AND sessionStorage
   ↓
4. Login page shows error toast
   ↓
5. After 1.5 seconds, Login page clears error state and redirects
   ↓
6. VerifyOTP page loads
   ↓
7. VerifyOTP checks sessionStorage for userId (after 100ms delay)
   ↓
8. userId found → Page stays loaded
   ↓
9. User clicks "Resend OTP"
   ↓
10. New OTP sent to email
   ↓
11. User enters OTP and verifies
   ↓
12. Account verified → Logged in → Redirected to dashboard
   ↓
13. tempUserId cleared from both Redux and sessionStorage
```

---

## Debugging

### Console Logs Added

**Login Page:**
- `Login useEffect - isError: [bool], tempUserId: [id], message: [msg]`
- `Unverified account detected, redirecting to verify-otp in 1.5s`
- `Navigating to /verify-otp now`
- `Regular error, resetting state`

**Redux Slice:**
- `login.rejected - payload: {message, userId}`
- `Setting tempUserId to: [id]`

**VerifyOTP Page:**
- `VerifyOTP mounted - tempUserId from Redux: [id]`
- `VerifyOTP mounted - tempUserId from sessionStorage: [id]`
- `VerifyOTP checking after 100ms - Redux: [id], Session: [id]`
- `No tempUserId found in sessionStorage, redirecting to signup`
- `tempUserId found in sessionStorage, staying on verify page`

### Manual Checks

In browser console:
```javascript
// Check if tempUserId is stored
sessionStorage.getItem('tempUserId')

// Check Redux state
// (Use Redux DevTools extension)
```

---

## Files Modified

1. `frontend/src/redux/slices/authSlice.js`
2. `frontend/src/pages/Login.jsx`
3. `frontend/src/pages/VerifyOTP.jsx`

---

## Testing Checklist

- [ ] Login with unverified account shows error message
- [ ] After 1.5 seconds, redirects to /verify-otp
- [ ] VerifyOTP page stays loaded (doesn't redirect back)
- [ ] Timer counts down from 5:00
- [ ] "Resend OTP" button is disabled initially
- [ ] After timer expires, "Resend OTP" becomes enabled
- [ ] Clicking "Resend OTP" sends new email
- [ ] Entering correct OTP verifies account and logs in
- [ ] After verification, tempUserId is cleared from sessionStorage
- [ ] Regular signup flow still works correctly
- [ ] Regular login flow (verified account) still works correctly

---

## Potential Issues & Solutions

### Issue: VerifyOTP still redirects back
**Check:**
1. Is `tempUserId` being saved to sessionStorage? (Check console logs)
2. Is there another redirect happening? (Check all useEffect hooks)
3. Is sessionStorage being cleared somewhere? (Search for `sessionStorage.clear()`)

### Issue: OTP verification fails
**Check:**
1. Is `userId` being passed correctly to verifyOTP action?
2. Check backend logs for errors
3. Verify OTP hasn't expired

### Issue: Resend OTP doesn't work
**Check:**
1. Is `userId` being retrieved from sessionStorage correctly?
2. Check backend logs for email sending errors
3. Verify email service is configured correctly

---

## Future Improvements

1. Add visual indicator on Login page that account needs verification
2. Add "Verify Account" link on Login page as manual fallback
3. Consider adding tempUserId to localStorage for longer persistence
4. Add analytics to track how many users hit this flow
5. Add rate limiting for OTP resend to prevent abuse
6. Show user's email address on VerifyOTP page for confirmation