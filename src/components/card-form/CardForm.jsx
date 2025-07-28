//A Form to create a new card
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCard } from '../../redux/cardSlice.js';

function CardForm() {
  const dispatch = useDispatch();
  const defaultCard = {
    image: 'https://picsum.photos/600/400',
    title: 'Random Title',
    content: 'Random Content',
  };
  const [formData, setFormData] = useState(defaultCard);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.image && formData.title && formData.content) {
      dispatch(addCard(formData));
      setFormData(defaultCard);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-form bg-amber-200 p-4 rounded-lg shadow-md max-w-md mx-auto flex flex-col gap-4 my-4">
      <input
        type="text"
        name="title"
        placeholder="Card Title"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="content"
        placeholder="Card Content"
        value={formData.content}
        onChange={handleChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <button type="submit">Create Card</button>
    </form>
  );
}

export default CardForm;
