/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef, useMemo } from 'react'
import JoditEditor from 'jodit-react'
import { format } from 'date-fns'
import './App.css'

interface Entry {
  id: number
  date: string
  time: string
  content: string
  mood: string
  method: string
}

const SetupScreen: React.FC<{
  name: string
  setName: (n: string) => void
  onBegin: () => void
}> = ({ name, setName, onBegin }) => (
  <div className="setup-overlay">
    <div className="setup-card">
      <h1>unload.</h1>
      <p>Dump your brain, clear the noise.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (name.trim()) onBegin()
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name..."
          autoFocus
        />
        <button type="submit">Begin</button>
      </form>
    </div>
  </div>
)

const App: React.FC = () => {
  const editorRef = useRef(null)
  const [userName, setUserName] = useState<string>('')
  const [isSetup, setIsSetup] = useState<boolean>(false)
  const [entries, setEntries] = useState<Entry[]>([])
  const [content, setContent] = useState<string>('')
  const [mood, setMood] = useState<string>('Neutral 😐')
  const [selectedMethod, setSelectedMethod] = useState<string>('Classic')
  const [activePrompt, setActivePrompt] = useState<string>('')

  // Jodit Configuration: Optimized for no-scroll and tight layout
  const config = useMemo(
    () => ({
      readonly: false,
      theme: 'dark',
      placeholder: 'Start unloading...',
      toolbarAdaptive: false,
      // Combined eraser into the same group to prevent wrapping
      buttons: ['bold', 'italic', 'underline', 'ul', 'ol', 'undo', 'redo', 'eraser'],
      height: 'auto',
      minHeight: 200,
      statusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      allowResizeY: false,
      allowResizeX: false,
      style: {
        background: '#000000',
        color: '#ffffff',
        padding: '10px'
      }
    }),
    []
  )

  useEffect(() => {
    const savedName = localStorage.getItem('unload_user_name')
    const savedEntries = localStorage.getItem('unload_v8_data')
    if (savedName) {
      setUserName(savedName)
      setIsSetup(true)
    }
    if (savedEntries) setEntries(JSON.parse(savedEntries))
  }, [])

  useEffect(() => {
    if (isSetup) {
      localStorage.setItem('unload_user_name', userName)
      localStorage.setItem('unload_v8_data', JSON.stringify(entries))
    }
  }, [entries, userName, isSetup])

  const generatePrompt = (method: string) => {
    const prompts: Record<string, string[]> = {
      Classic: [
        "What's the story of your day?",
        'What moved you today?',
        'Describe a moment of clarity.'
      ],
      Bullet: [
        'Top 3 wins of the day.',
        "Quick log: what's pending?",
        '3 things you are grateful for.'
      ],
      'Morning Pages': ["Brain dump: don't filter.", "What's the very first thought this morning?"],
      'Unsent Letter': ['Write to someone you miss.', 'What do you wish you said?']
    }
    const list = prompts[method] || prompts['Classic']
    setActivePrompt(list[Math.floor(Math.random() * list.length)])
  }

  useEffect(() => {
    generatePrompt(selectedMethod)
  }, [selectedMethod])

  const handleUnload = (e: React.FormEvent) => {
    e.preventDefault()
    const plainText = content.replace(/<(.|\n)*?>/g, '').trim()
    if (!plainText) return

    const now = new Date()
    const newEntry: Entry = {
      id: Date.now(),
      date: format(now, 'dd MMM yyyy').toUpperCase(),
      time: format(now, 'HH:mm'),
      content: content,
      mood,
      method: selectedMethod
    }

    setEntries([newEntry, ...entries])
    setContent('')
    generatePrompt(selectedMethod)
  }

  if (!isSetup)
    return <SetupScreen name={userName} setName={setUserName} onBegin={() => setIsSetup(true)} />

  return (
    <div className="unload-container">
      <aside className="input-panel">
        <div className="panel-content">
          <header className="brand">
            <h1>unload</h1>
            <div className="user-greeting">
              <p>Welcome back, {userName}.</p>
              <button className="edit-name-btn" onClick={() => setIsSetup(false)}>
                ⚙️
              </button>
            </div>
          </header>

          <section className="method-selector">
            <label>Journaling Method</label>
            <div className="method-chips">
              {['Classic', 'Bullet', 'Morning Pages', 'Unsent Letter'].map((m) => (
                <button
                  key={m}
                  className={selectedMethod === m ? 'active' : ''}
                  onClick={() => setSelectedMethod(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </section>

          <div className="prompt-box">
            <p>“{activePrompt}”</p>
          </div>

          <form onSubmit={handleUnload} className="unload-form">
            <div className="editor-section">
              <JoditEditor
                ref={editorRef}
                value={content}
                config={config}
                onBlur={(newContent) => setContent(newContent)}
              />
            </div>

            <div className="form-controls">
              <select value={mood} onChange={(e) => setMood(e.target.value)}>
                <option>Neutral 😐</option>
                <option>Sad 🌊</option>
                <option>Happy ✨</option>
                <option>Anxious 🌪️</option>
                <option>Grateful 🙏</option>
              </select>
              <button type="submit">Unload</button>
            </div>
          </form>
        </div>
      </aside>

      <main className="timeline">
        {entries.slice(0, 10).map((item) => (
          <div key={item.id} className="entry-card">
            <div className="entry-header">
              {item.time} / {item.method} / {item.mood}
            </div>
            <div
              className="entry-body rich-content"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        ))}
      </main>
    </div>
  )
}

export default App
