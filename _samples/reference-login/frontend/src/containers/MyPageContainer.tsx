import { useEffect, useState } from 'react';
import { UserProfileCard } from '../components/UserProfileCard';
import { fetchCurrentUser } from './auth-api';

type CurrentUserViewModel = {
  readonly userIdText: string;
  readonly displayNameText: string;
  readonly emailAddressText: string;
  readonly loggedInAtText: string;
};

export function MyPageContainer() {
  const [currentUser, setCurrentUser] = useState<CurrentUserViewModel | null>(null);

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');

    if (!sessionToken) {
      window.location.href = '/';
      return;
    }

    void fetchCurrentUser(sessionToken).then((response) => {
      setCurrentUser({
        userIdText: response.userId,
        displayNameText: response.name,
        emailAddressText: response.email,
        loggedInAtText: response.loggedInAt,
      });
    });
  }, []);

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <UserProfileCard
      userIdText={currentUser.userIdText}
      displayNameText={currentUser.displayNameText}
      emailAddressText={currentUser.emailAddressText}
      loggedInAtText={currentUser.loggedInAtText}
      onLogout={() => {
        localStorage.removeItem('sessionToken');
        window.location.href = '/';
      }}
    />
  );
}
