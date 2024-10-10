import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteEvent, fetchEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useEffect, useState, useSyncExternalStore } from "react";
import Modal from "./../UI/Modal.jsx";
import { events } from "../../../data/events.js";

export default function EventDetails() {
  const [isdeletying, setIsDeleting] = useState(false);
  const { id } = useParams();
  const [ data, setdata] = useState()
  const navigate = useNavigate();

  console.log('id', id)
  // const { data, isError, error, isPending } = useQuery({
  //   queryKey: ["event", id],
  //   queryFn: ({ signal }) => fetchEvent({ id, signal }),
  // });

  // const {
  //   mutate,
  //   isPending: isPendingDeletion,
  //   isError: isErroRDeleting,
  //   error: deleteError,
  // } = useMutation({
  //   mutationFn: deleteEvent,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["events"],
  //       refetchType: "none",
  //     });
  //     navigate("/events");
  //   },
  // });

const fetchEvent =  async () => {
  const filtertedEvent = events.filter((item) => item?.id === id)
  console.log("filtertedEvent", filtertedEvent)
  setdata(filtertedEvent[0])
}
  useEffect(() => {
    fetchEvent()
  } , [])





  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleDelete() {
    mutate({ id });
  }

  return (
    <>
      {isdeletying && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>
            Do you relly want to delete this event? This action cannot be
            undone.
          </p>
          <div className="form-actions">
            {isPendingDeletion && <p>Deleting ,please Wait...</p>}
            {!isPendingDeletion && (
              <>
                <button className="button-text" onClick={handleStopDelete}>
                  Cancel
                </button>
                <button className="button" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
          </div>
          {/* {isErroRDeleting && (
            <ErrorBlock
              title={"Failedto delete event"}
              message={
                deleteError.info?.message ||
                "failed to delete event ,try again letter"
              }
            />
          )} */}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>

      {/* {isPending && <p style={{ textAlign: "center" }}>Loading...</p>}
      {isError && (
        <ErrorBlock
          title={"Failed to fetch Event Details"}
          message={error?.info.message}
        />
      )} */}

      {data && (
        <article id="event-details">
          <header>
            <h1>{data?.title}</h1>
            <nav>
              <button onClick={handleStartDelete}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={data?.image} alt="" />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data?.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>{data?.date}</time>
              </div>
              <p id="event-details-description">{data?.description}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
