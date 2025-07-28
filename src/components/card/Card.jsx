function Card({ image, title, children }) {

  return (
    <div className="card bg-white rounded-xl border w-full border-black overflow-hidden max-w-sm mx-auto">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        {/* Display the content passed as children */}
        <p className="text-gray-700">{children}</p>
      </div>
    </div>
  );
};


export default Card;
