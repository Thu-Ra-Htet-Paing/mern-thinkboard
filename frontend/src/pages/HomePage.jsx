import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RateLimitUI from "../components/RateLimitUi";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect((_) => {
    const getNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("can't get notes ->", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to get notes");
        }
      } finally {
        setLoading(false);
      }
    };
    getNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />

      {isRateLimited && <RateLimitUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading...</div>
        )}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard setNotes={setNotes} note={note} key={note._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
