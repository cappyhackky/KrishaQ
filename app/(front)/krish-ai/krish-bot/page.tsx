'use client'
import React, { useContext, useEffect, useRef, useState } from 'react';

import { AuthContext } from "@/lib/Providers/AuthProvider";

const page = () => {
  const {user} = useContext(AuthContext) as any
  const API_URL = 'http://localhost:5000/ask-query';
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState([{ type: 'llm', text: "Hello I'm KrishaQ! How can I help you." }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatContainerRef = useRef(null);

  const fetchResponse = async (query) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const handleKeyDown = (e)=>{
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  }
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!query.trim()) {
      setError('Query cannot be empty.');
      return;
    }

    setResponses((prevResponses) => [
      ...prevResponses,
      { type: 'user', text: query }
    ]);
    setQuery('')
    setLoading(true);
    setError('');

    try {
      const llmResponse = await fetchResponse(query);
      console.log("Request ", query);
      console.log("Response: ", llmResponse);

      setResponses((prevResponses) => [
        ...prevResponses,
        { type: 'llm', text: llmResponse }
      ]);

      setQuery('');
    } catch (error) {
      setError('Failed to fetch response. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [responses]);
  if (!user) {
    return <div className="container flex h-full justify-center items-center mt-32"><span className="text-lime-600 loading loading-lg loading-dots"></span></div>
  }
  return (
    <>
      <main className="flex-grow h-[calc(100vh-10rem)] lg:w-4/6 mx-auto bg-white rounded-lg m-4">
        <div id="chat-container" className="h-[calc(100vh-15rem)] pb-16 p-6 flex flex-col items-end space-y-4 overflow-y-auto" style={{scrollbarWidth: "thin"}}>
          {responses.map((msg, index) => (
            <div key={index} className={`max-w-auto ${msg.type === 'user' ? 'self-end me-8 ms-16' : 'self-start ms-8 me-16'}`}>
               <div className={`flex gap-2 ${msg.type === 'user' && "flex-row-reverse"}`}>
               <img className="w-12 h-12 rounded-full shadow-lg aspect-square object-cover" src={`${msg.type === 'user' ? user.image : '/images/others/farmer.png'}`} alt="K" /><p className={`p-3 rounded-lg ${msg.type === 'user' ? 'bg-gray-300 text-gray-800' : 'bg-lime-500 text-white'}`} style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                </div>         
            </div>
          ))}
          {error && <p className="text-red-500">{error}</p>}
          {loading && <div className="p-3 rounded-lg loading loading-bars self-start ms-8"></div>}
        </div>
        <footer className="w-full bg-transparent text-center p-3 px-16 shadow-lg bg-lime-200">
          <div className="flex items-center lg:w-5/6 mx-auto md:px-8">
            <input id="message-input" className="w-full rouned-lg border focus:border-lime-500 flex-grow border-lime-600 text-lime-500 bg-transparent text-xl px-6 py-3" type="text" placeholder="Type something..." value={query} onChange={handleQueryChange} onKeyDown={handleKeyDown} disabled={loading}/>
            <button id="send-button" className="mx-2 p-2 rounded-full" onClick={handleSubmit} disabled={loading}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" className="bi bi-send fill-lime-500" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
              </svg>
            </button>
          </div>
        </footer>
      </main>
    </>
  );
};

export default page;
