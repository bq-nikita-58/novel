"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";

interface EditorEntry {
  id: string;
  title: string;
}

export default function Sidebar({
  onSelect,
}: {
  onSelect: (editorId: string) => void;
}) {
  const [savedEditors, setSavedEditors] = useState<EditorEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("saved-editors");
    if (stored) setSavedEditors(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("saved-editors", JSON.stringify(savedEditors));
  }, [savedEditors]);

  const handleSaveEditor = () => {
    console.log("saving new editor",newTitle);
    if (!newTitle.trim()) return;
    const newEditor = { id: Date.now().toString(), title: newTitle.trim() };
    setSavedEditors((prev) => [...prev, newEditor]);
    setNewTitle("");
    setShowForm(false);
    localStorage.setItem(newEditor.id,""); // Initialize editor content
    onSelect(newEditor.id); 
  };

  return (
    <>
      <div className="h-full w-64 bg-background border-r border-border fixed top-0 left-0 bottom-0 overflow-y-auto p-6 text-sm space-y-8">
        <div className="text-xl font-bold mb-4">Novel</div>
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Saved Editors
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="text-muted-foreground hover:bg-muted p-1 rounded"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            {savedEditors.map((editor) => (
              <div
                key={editor.id}
                className="block rounded px-2 py-1 bg-muted text-muted-foreground cursor-pointer"
                onClick={() => {
                  console.log("clicked Editor",editor.id);
                  onSelect(editor.id)}}
              >
                {editor.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">New Editor</h2>
              <button onClick={() => setShowForm(false)}>
                <X className="w-5 h-5 text-gray-500 hover:text-black" />
              </button>
            </div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter editor title"
              className="w-full p-2 border rounded text-sm"
            />
            <button
              onClick={handleSaveEditor}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Save Editor
            </button>
          </div>
        </div>
      )}
    </>
  );
}
