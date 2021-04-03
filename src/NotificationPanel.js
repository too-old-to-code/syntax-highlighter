import "./NotificationPanel.css";

const Notification = ({ note, removeToast }) => {
  return (
    <div className={`notification is-${note.level || "warning"}`}>
      <button className="delete" onClick={() => removeToast(note)}></button>
      {note.message}
    </div>
  );
};

const NotificationPanel = ({ notifications, removeToast }) => {
  return (
    <div className="notifications">
      {notifications.map((note) => (
        <Notification note={note} key={note.date} removeToast={removeToast} />
      ))}
    </div>
  );
};

export { NotificationPanel };
