const Notification = ({
  message,
  type,
}: {
  message: string | null;
  type: 'danger' | 'info' | 'success';
}): JSX.Element => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
};

export default Notification;
