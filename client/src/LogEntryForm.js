import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from './API'

const LogEntryForm = ({ location, onClose }) => {
    const [loading, setLOading] = useState(false);
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        try {
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntry(data);
            console.log(created);
            onClose();
        } catch (error) {
            console.error(error);
            setError(error.message);
            setLOading(false);
        }
        
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className="error">{error}</h3> : null}  
      <label htmlFor="title">Title</label>
      <input name="title" required ref={register}/>

      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={3} ref={register}></textarea>

      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3} ref={register}></textarea>

      <label htmlFor="image">Image</label>
      <input name="image" ref={register}/>

      <label htmlFor="visitDate">Visit Date</label>
      <input type="date" name="visitDate" required ref={register}/>

      <button disabled={loading}>{loading ? 'LOading... ' : 'Create Entry'}</button>
    </form>
  );
};

export default LogEntryForm;
