type UserProfileCardProps = {
  readonly userIdText: string;
  readonly displayNameText: string;
  readonly emailAddressText: string;
  readonly loggedInAtText: string;
  readonly onLogout: () => void;
};

export function UserProfileCard(props: UserProfileCardProps) {
  return (
    <section>
      <h1>My Page</h1>
      <dl>
        <dt>User ID</dt>
        <dd>{props.userIdText}</dd>
        <dt>Name</dt>
        <dd>{props.displayNameText}</dd>
        <dt>Email</dt>
        <dd>{props.emailAddressText}</dd>
        <dt>Logged In At</dt>
        <dd>{props.loggedInAtText}</dd>
      </dl>
      <button type="button" onClick={props.onLogout}>
        Logout
      </button>
    </section>
  );
}
