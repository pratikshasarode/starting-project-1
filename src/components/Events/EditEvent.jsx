import { Link, useNavigate ,useParams} from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { events } from '../../../data/events.js';
import { useEffect, useState } from 'react';

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ data, setdata] = useState()

  console.log('edit id', id)

  function handleSubmit(formData) {

  }

  function handleClose() {
    navigate('/events');
  }
  const fetchEvent =  async () => {
    const filtertedEvent = events.filter((item) => item?.id === id)
    console.log("filtertedEvent", filtertedEvent)
    setdata(filtertedEvent[0])
  }
    useEffect(() => {
      fetchEvent()
    } , [])

  return (
    <Modal onClose={handleClose}>
      <EventForm inputData={data} onSubmit={handleClose}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    </Modal>
  );
}
