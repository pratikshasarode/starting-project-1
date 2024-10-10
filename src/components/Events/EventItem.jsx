import { Link } from "react-router-dom";
import buzzingcity from "./../../../images/buzzingcity.jpg";
import laptopondesk from "./../../../images/laptopondesk.jpg";
import meetingnetworking from "./../../../images/meetingnetworking.jpg";
import park from "./../../../images/park.jpg";
import womencoding from "./../../../images/womencoding.jpg";

export default function EventItem({ event }) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="event-item">
      <img src={event.image} alt={event.title} />
      <div className="event-item-content">
        <div>
          <h2>{event.title}</h2>
          <p className="event-item-date">{formattedDate}</p>
          <p className="event-item-location">{event.location}</p>
        </div>
        <p>
          <Link to={`/events/${event.id}`} className="button">
            View Details
          </Link>
        </p>
      </div>
    </article>
  );
}
